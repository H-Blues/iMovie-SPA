let movies;
let tv_shows;
let people;
let movie_credit_people;
let tv_credit_people;
let credit_work;

Cypress.config('defaultCommandTimeout', 8000);

describe("Navigation", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/movie/popular?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&include_adult=false&include_video=false&page=1`
    ).its("body").then((response) => {
      movies = response.results;
    });
    cy.request(
      `https://api.themoviedb.org/3/tv/popular?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&include_adult=false&include_video=false&page=1`
    ).its("body").then((response) => {
      tv_shows = response.results;
    });
    cy.request(
      `https://api.themoviedb.org/3/person/popular?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&include_adult=false&include_video=false&page=1`
    ).its("body").then((response) => {
      people = response.results;
    });
  });

  beforeEach(() => {
    cy.visit("/");
  });

  describe("The site header", () => {
    describe("when the viewport is desktop scale", () => {
      it("navigate to movie page via the dropdown menu", () => {
        cy.clickMainMenuOnPC('Movies');
        cy.checkUrl('/movie');
        cy.clickLogoOnPC();
        cy.checkUrl('/');
      });
      it("navigate to TV page via the dropdown menu", () => {
        cy.clickMainMenuOnPC('TV_Shows');
        cy.checkUrl('/tv');
      });
      it("navigate to people page via the dropdown menu", () => {
        cy.clickMainMenuOnPC('People');
        cy.checkUrl('/people');
      });
      it("navigate to favorite page via the dropdown menu", () => {
        cy.clickMyFavorite();
        cy.checkUrl('/favourite');
      });
    });
    describe(
      "when the viewport is a iPad or a mobile scale",
      {
        viewportHeight: 1024,
        viewportWidth: 768,
      },
      () => {
        it("navigate to movie page via the menu link", () => {
          cy.clickMainMenuOnMobile('Movies');
          cy.checkUrl('/movie');
          cy.clickLogoOnMobile();
          cy.checkUrl('/');
        });
        it("navigate to TV page via the menu link", () => {
          cy.clickMainMenuOnMobile('TV_Shows');
          cy.checkUrl('/tv');
        });
        it("navigate to people page via the menu link", () => {
          cy.clickMainMenuOnMobile('People');
          cy.checkUrl('/people');
        });
        it("navigate to favorite page via the menu link", () => {
          cy.clickMyFavorite();
          cy.checkUrl('/account/favourite');
        });
      }
    );
  });

  describe("The touch slider in home page", () => {
    describe("navigates to list page via button", () => {
      it("to popular movie page", () => {
        cy.clickMore('/movie');
        cy.checkUrl('/movie');
      });
      it("to top rated movie page", () => {
        cy.clickMore('/movie/top-rated');
        cy.checkUrl('/movie/top-rated');
      });
      it("to upcoming movie page", () => {
        cy.clickMore('/movie/upcoming');
        cy.checkUrl('/movie/upcoming');
      });
      it("to popular tv page", () => {
        cy.clickMore('/tv');
        cy.checkUrl('/tv');
      });
    });
    describe("navigates to detail page via name or title", () => {
      it("to movie detail page", () => {
        cy.get("div[class='movie-card']").eq(0).find("a").click();
        cy.checkUrl(`/movie/${movies[0].id}`);
      });
      it("to tv detail page", () => {
        cy.get("div[class='movie-card']").eq(120).find("a").click();
        cy.checkUrl(`/tv/${tv_shows[0].id}`);
      });
    });
  });

  describe("From list page to a detail page", () => {
    it("popular movie page to a movie detail", () => {
      cy.visit('/movie');
      cy.get("div[class='movie-card']").eq(0).find("a").click();
      cy.checkUrl(`/movie/${movies[0].id}`);
    });
    it("popular tv page to a tv detail", () => {
      cy.visit('/tv');
      cy.get("div[class='movie-card']").eq(0).find("a").click();
      cy.checkUrl(`/tv/${tv_shows[0].id}`);
    });
    it("popular people page to a person detail", () => {
      cy.visit('/people');
      cy.get("div[class='movie-card']").eq(0).find("a").click();
      cy.checkUrl(`/people/${people[0].id}`);
    });
  });

  describe("From the favourite page to a movie's details", () => {
    beforeEach(() => {
      cy.get("div[class='movie-card']").eq(0).find("a").click();
      cy.get("button[aria-label='add to favorites']").click();
      cy.clickMyFavorite();
    });
    it("navigates to the movie details page from favourites page", () => {
      cy.checkUrl(`/account/favourite`);
      cy.get("div[class='movie-card']").eq(4).find("a").click();
      cy.checkUrl(`/movie/${movies[0].id}`);
    });
  });

  describe("From a detail page to another detail page", () => {
    before(() => {
      cy.request(
        `https://api.themoviedb.org/3/movie/${movies[0].id}/credits?api_key=${Cypress.env("TMDB_KEY")}&language=en-US`
      ).its("body").then((response) => {
        movie_credit_people = response.cast;
      });
      cy.request(
        `https://api.themoviedb.org/3/tv/${tv_shows[0].id}/credits?api_key=${Cypress.env("TMDB_KEY")}&language=en-US`
      ).its("body").then((response) => {
        tv_credit_people = response.cast;
      });
      cy.request(
        `https://api.themoviedb.org/3/person/${people[7].id}/combined_credits?api_key=${Cypress.env("TMDB_KEY")}&language=en-US`
      ).its("body").then((response) => {
        credit_work = response.cast;
      });
    });
    it("navigates to a person detail page from a movie detail page", () => {
      cy.visit('/movie');
      cy.get("div[class='movie-card']").eq(0).find("a").click();
      cy.get("div[class='castCard']").eq(0).find("a").click();
      cy.url().should("include", `/people/${movie_credit_people[0].id}`);
      cy.url().should("not.include", `/movie/${movies[0].id}`);
    });
    it("navigates to a person detail page from a tv detail page", () => {
      cy.visit('/tv');
      cy.get("div[class='movie-card']").eq(0).find("a").click();
      cy.get("div[class='castCard']").eq(0).find("a").click();
      cy.url().should("include", `/people/${tv_credit_people[0].id}`);
      cy.url().should("not.include", `/tv/${tv_shows[0].id}`);
    });
    it("navigates to a movie/tv detail page from a person detail page", () => {
      cy.visit('/people');
      cy.get("div[class='movie-card']").eq(7).find("a").click();
      cy.get("div[class='castCard']").eq(0).find("a").click();
      cy.url().should("include", `/movie/${credit_work[0].id}` || `/tv/${credit_work[0].id}`);
      cy.url().should("not.include", `/people/${people[7].id}`);
    });
  });
});