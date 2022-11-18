import { sortByName, sortByTime } from "../support/e2e";

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
    it("Sort by name", () => {
      const moviesByName = sortByName(movies);
      cy.get("#sort-select").click();
      cy.get("li").contains("Sort By Name").click();
      cy.get(".movie-card").each(($card, index) => {
        cy.wrap($card).find("a").contains(moviesByName[index].title);
      });
    });
    it("Sort by time", () => {
      const moviesByTime = sortByTime(movies);
      cy.get("#sort-select").click();
      cy.get("li").contains("Sort By Time").click();
      cy.get(".movie-card").each(($card, index) => {
        cy.wrap($card).find("a").contains(moviesByTime[index].title);
      });
    });
  });

  describe("In TV pages", () => {
    beforeEach(() => {
      cy.visit("/tv");
    });
    it("Sort by name", () => {
      const tvByName = sortByName(movies);
      cy.get("#sort-select").click();
      cy.get("li").contains("Sort By Name").click();
      cy.get(".movie-card").each(($card, index) => {
        cy.wrap($card).find("a").contains(tvByName[index].title);
      });
    });
    it("Sort by time", () => {
      const tvByTime = sortByTime(movies);
      cy.get("#sort-select").click();
      cy.get("li").contains("Sort By Time").click();
      cy.get(".movie-card").each(($card, index) => {
        cy.wrap($card).find("a").contains(tvByTime[index].title);
      });
    });
  });
});