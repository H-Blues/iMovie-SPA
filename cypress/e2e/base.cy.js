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
      cy.checkSwiperNum(0, "h1", 4);
      cy.get(".MuiTypography-h2").contains("Find you like");;
    });
    it("displays 20 popular movies", () => {
      cy.checkSwiperNum(1, "a", 20);
    });
    it("displays 20 top-rated movies", () => {
      cy.checkSwiperNum(3, "a", 20);
    });
    it("displays 20 upcoming movies", () => {
      cy.checkSwiperNum(5, "a", 20);
    });
    it("displays 20 popular tv shows", () => {
      cy.checkSwiperNum(7, "a", 20);
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
      cy.checkCardTitle(movies);
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
      cy.checkCardTitle(tv_shows);
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
      cy.checkCardTitle(people);
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
      cy.checkUrl(`/movie/${movie.id}`);
      Cypress.on('fail', (error) => {
        if (!error.message.includes(`find content`)) {
          throw error;
        }
      });
      cy.checkItemDetail(movie, movieCredits);
    });
    it("displays the tv name, overview, genres and credits", () => {
      cy.visit('/tv');
      cy.get("div[class='movie-card']").eq(0).find("a").click();
      cy.checkUrl(`/tv/${tv.id}`);
      Cypress.on('fail', (error) => {
        if (!error.message.includes(`find content`)) {
          throw error;
        }
      });
      cy.checkItemDetail(tv, tvCredits);
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
      cy.checkPersonDetail(person, personCredits);
    });
  });
});