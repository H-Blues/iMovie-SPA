import { filterByGenre, filterByGenreAndTitle, filterByName, filterByTitle, filterByGenreAndName } from "../support/e2e";

let movies;
let tv_shows;

describe("Filtering", () => {
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
  });

  describe("In movie pages", () => {
    beforeEach(() => {
      cy.visit("/movie");
    });
    describe("By movie title", () => {
      it("only display movies with 'm' in the title", () => {
        const searchString = "m";
        const matchingMovies = filterByTitle(movies, searchString);
        cy.get("#filled-search").clear().type(searchString);
        cy.get(".movie-card").should(
          "have.length",
          matchingMovies.length
        );
        cy.get(".movie-card").each(($card, index) => {
          cy.wrap($card).find("a").contains(matchingMovies[index].title);
        });
      });
      it("handles case when there are no matches", () => {
        const searchString = "xyxxzyyzz";
        cy.get("#filled-search").clear().type(searchString);
        cy.get(".movie-card").should("have.length", 0);
      });
    });
    describe("By movie genre", () => {
      it("show movies with the selected genre", () => {
        const selectedGenreId = 35;
        const selectedGenreText = "Comedy";
        const matchingMovies = filterByGenre(movies, selectedGenreId);
        cy.get("#genre-select").click();
        cy.get("li").contains(selectedGenreText).click();
        cy.get(".movie-card").should(
          "have.length",
          matchingMovies.length
        );
        cy.get(".movie-card").each(($card, index) => {
          cy.wrap($card).find("a").contains(matchingMovies[index].title);
        });
      });
    });
    describe("Combined genre and title", () => {
      it("show movies with the selected genre and entered title", () => {
        const selectedGenreId = 35;
        const searchString = "s";
        const selectedGenreText = "Comedy";
        const matchingMovies = filterByGenreAndTitle(movies, selectedGenreId, searchString);
        cy.get("#genre-select").click();
        cy.get("li").contains(selectedGenreText).click();
        cy.get("#filled-search").clear().type(searchString);
        cy.get(".movie-card").should(
          "have.length",
          matchingMovies.length
        );
        cy.get(".movie-card").each(($card, index) => {
          cy.wrap($card).find("a").contains(matchingMovies[index].title);
        });
      });
      it("handles case when there are no matches", () => {
        const searchString = "xyxxzyyzz";
        const selectedGenreText = "Comedy";
        cy.get("#genre-select").click();
        cy.get("li").contains(selectedGenreText).click();
        cy.get("#filled-search").clear().type(searchString);
        cy.get(".movie-card").should("have.length", 0);
      });
    });
  });

  describe("In tv pages", () => {
    beforeEach(() => {
      cy.visit("/tv");
    });
    describe("By tv name", () => {
      it("only display tv shows with 'm' in the name", () => {
        const searchString = "m";
        const matchingTVs = filterByName(tv_shows, searchString);
        cy.get("#filled-search").clear().type(searchString);
        cy.get(".movie-card").should(
          "have.length",
          matchingTVs.length
        );
        cy.get(".movie-card").each(($card, index) => {
          cy.wrap($card).find("a").contains(matchingTVs[index].name);
        });
      });
      it("handles case when there are no matches", () => {
        const searchString = "xyxxzyyzz";
        cy.get("#filled-search").clear().type(searchString);
        cy.get(".movie-card").should("have.length", 0);
      });
    });

    describe("By tv genre", () => {
      it("show tv shows with the selected genre", () => {
        const selectedGenreId = 35;
        const selectedGenreText = "Comedy";
        const matchingTVs = filterByGenre(tv_shows, selectedGenreId);
        cy.get("#genre-select").click();
        cy.get("li").contains(selectedGenreText).click();
        cy.get(".movie-card").should("have.length", matchingTVs.length);
        cy.get(".movie-card").each(($card, index) => {
          cy.wrap($card).find("a").contains(matchingTVs[index].name);
        });
      });
    });

    describe("Combined genre and title", () => {
      it("show tv shows with the selected genre and entered title", () => {
        const selectedGenreId = 10759;
        const searchString = "s";
        const selectedGenreText = "Action & Adventure";
        const matchingTVs = filterByGenreAndName(tv_shows, selectedGenreId, searchString);
        cy.get("#genre-select").click();
        cy.get("li").contains(selectedGenreText).click();
        cy.get("#filled-search").clear().type(searchString);
        cy.get(".movie-card").should(
          "have.length",
          matchingTVs.length
        );
        cy.get(".movie-card").each(($card, index) => {
          cy.wrap($card).find("a").contains(matchingTVs[index].name);
        });
      });
      it("handles case when there are no matches", () => {
        const searchString = "xyxxzyyzz";
        const selectedGenreText = "Action & Adventure";
        cy.get("#genre-select").click();
        cy.get("li").contains(selectedGenreText).click();
        cy.get("#filled-search").clear().type(searchString);
        cy.get(".movie-card").should("have.length", 0);
      });
    });
  });
});