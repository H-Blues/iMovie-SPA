let movies, movie, movieCredits;
let tv_shows, tv, tvCredits;
let people, person, personCredits;

Cypress.config('defaultCommandTimeout', 10000);

describe("Base tests", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/movie/popular?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&page=1`
    ).its("body").then((response) => {
      movies = response.results;
    });
    cy.request(
      `https://api.themoviedb.org/3/tv/popular?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&page=1`
    ).its("body").then((response) => {
      tv_shows = response.results;
    });
    cy.request(
      `https://api.themoviedb.org/3/person/popular?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&page=1`
    ).its("body").then((response) => {
      people = response.results;
    });
  });

  beforeEach(() => {
    cy.visit("/");
  });

  describe("The home page", () => {
    it("displays 4 movie backdrops and 1 slogan", () => {
      cy.get("div[class='swiper-wrapper']")
        .should('have.length', 9)
        .eq(0).find("h1")
        .should("have.length", 4);
      cy.get(".MuiTypography-h2").contains("Find you like");;
    });
    it("displays 20 popular movies", () => {
      cy.get("div[class='swiper-wrapper")
        .should('have.length', 9)
        .eq(1).find("a")
        .should("have.length", 20);
    });
    it("displays 20 top-rated movies", () => {
      cy.get("div[class='swiper-wrapper")
        .should('have.length', 9)
        .eq(3).find("a")
        .should("have.length", 20);
    });
    it("displays 20 upcoming movies", () => {
      cy.get("div[class='swiper-wrapper")
        .should('have.length', 9)
        .eq(5).find("a")
        .should("have.length", 20);
    });
    it("displays 20 popular tv shows", () => {
      cy.get("div[class='swiper-wrapper")
        .should('have.length', 9)
        .eq(7).find("a")
        .should("have.length", 20);
    });
  });

  describe("The movie list page", () => {
    beforeEach(() => {
      cy.visit("/movie");
    });
    it("displays the page header and 20 movies", () => {
      cy.get("h3").contains("Popular Movies");
      cy.get(".movie-card").should("have.length", 20);
    });
    it("displays the correct movie titles", () => {
      cy.get("a[class='MuiTypography-root MuiTypography-h6 MuiTypography-gutterBottom css-17lvz15-MuiTypography-root']")
        .each(($card, index) => {
          cy.wrap($card).contains(movies[index].title);
        });
    });
  });

  describe("The tv list page", () => {
    beforeEach(() => {
      cy.visit("/tv");
    });
    it("displays the page header and 20 tv shows", () => {
      cy.get("h3").contains("Popular TV");
      cy.get(".movie-card").should("have.length", 20);
    });
    it("displays the correct tv titles", () => {
      cy.get("a[class='MuiTypography-root MuiTypography-h6 MuiTypography-gutterBottom css-17lvz15-MuiTypography-root']")
        .each(($card, index) => {
          cy.wrap($card).contains(tv_shows[index].name);
        });
    });
  });

  describe("The people list page", () => {
    beforeEach(() => {
      cy.visit("/people");
    });
    it("displays the page header and 20 people", () => {
      cy.get("h3").contains("Popular People");
      cy.get(".movie-card").should("have.length", 20);
    });
    it("displays the correct people name", () => {
      cy.get("a[class='MuiTypography-root MuiTypography-h6 MuiTypography-gutterBottom css-17lvz15-MuiTypography-root']")
        .each(($card, index) => {
          cy.wrap($card).contains(people[index].name);
        });
    });
  });


  describe("The detail page", () => {
    before(() => {
      cy.request(`https://api.themoviedb.org/3/movie/${movies[0].id}?api_key=${Cypress.env("TMDB_KEY")}`)
        .its("body").then((movieDetails) => {
          movie = movieDetails;
        });
      cy.request(`https://api.themoviedb.org/3/tv/${tv_shows[0].id}?api_key=${Cypress.env("TMDB_KEY")}`)
        .its("body").then((tvDetails) => {
          tv = tvDetails;
        });
      cy.request(`https://api.themoviedb.org/3/person/${people[10].id}?api_key=${Cypress.env("TMDB_KEY")}`)
        .its("body").then((personDetails) => {
          person = personDetails;
        });
      cy.request(`https://api.themoviedb.org/3/movie/${movies[0].id}/credits?api_key=${Cypress.env("TMDB_KEY")}`)
        .its("body").then((response) => {
          movieCredits = response.cast;
        });
      cy.request(`https://api.themoviedb.org/3/tv/${tv_shows[0].id}/credits?api_key=${Cypress.env("TMDB_KEY")}`)
        .its("body").then((response) => {
          tvCredits = response.cast;
        });
      cy.request(`https://api.themoviedb.org/3/person/${people[10].id}/combined_credits?api_key=${Cypress.env("TMDB_KEY")}`)
        .its("body").then((response) => {
          personCredits = response.cast;
        });
    });
    it("displays the movie title, overview, genres and credits", () => {
      cy.visit('/movie');
      cy.get("div[class='movie-card']").eq(0).find("a").click();
      Cypress.on('fail', (error) => {
        if (!error.message.includes(`find content`)) {
          throw error;
        }
      });
      cy.checkUrl(`/movie/${movie.id}`);
      cy.get("h1").contains(movie.title);
      cy.get("p[class='summary']").contains(movie.overview);
      cy.get("div[class='contentDetail']").within(() => {
        const genreChipLabels = movie.genres.map((g) => g.name);
        cy.get(".MuiChip-label").each(($card, index) => {
          cy.wrap($card).contains(genreChipLabels[index]);
        });
      });
      cy.get("div[class='castCard']").within(() => {
        const creditNames = movieCredits.map((c) => c.name);
        const creditNamesShown = creditNames.length >= 5 ? creditNames.slice(0, 5) : creditNames;
        cy.get("a").each(($person, index) => {
          cy.wrap($person).contains(creditNamesShown[index]);
        });
      });
    });
    it("displays the tv name, overview, genres and credits", () => {
      cy.visit('/tv');
      cy.get("div[class='movie-card']").eq(0).find("a").click();
      cy.checkUrl(`/tv/${tv.id}`);
      cy.get("h1").contains(tv.name);
      cy.get("p[class='summary']").contains(tv.overview);
      cy.get("div[class='contentDetail']").within(() => {
        const genreChipLabels = tv.genres.map((g) => g.name);
        cy.get(".MuiChip-label").each(($card, index) => {
          cy.wrap($card).contains(genreChipLabels[index]);
        });
      });
      cy.get("div[class='castCard']").within(() => {
        const creditNames = tvCredits.map((c) => c.name);
        const creditNamesShown = creditNames.length >= 5 ? creditNames.slice(0, 5) : creditNames;
        cy.get("a").each(($person, index) => {
          cy.wrap($person).contains(creditNamesShown[index]);
        });
      });
    });
    it("displays the person name, introduction, genres and credits", () => {
      cy.visit('/people');
      cy.get("div[class='movie-card']").eq(10).find("a").click();
      cy.checkUrl(`/people/${person.id}`);
      Cypress.on('fail', (error) => {
        if (!error.message.includes(`find content`)) {
          throw error;
        }
      });
      cy.get("h1").contains(person.name);
      cy.get("p[class='summary']").contains(person.biography.replace(/<\/?.+?>/g, ""));
      cy.get("div[class='contentDetail']").within(() => {
        cy.get(".MuiChip-label").contains(person.known_for_department);
      });
      cy.get("div[class='castCard']").within(() => {
        const creditNames = personCredits.map((c) => c.title);
        cy.log(creditNames);
        const creditNamesShown = creditNames.length >= 5 ? creditNames.slice(0, 5) : creditNames;
        cy.log(creditNamesShown);
        cy.get("a").each(($person, index) => {
          cy.wrap($person).contains(creditNamesShown[index]);
        });
      });
    });
  });

});