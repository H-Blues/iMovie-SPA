import { sortByName, sortByTime } from "../support/e2e";

let movies;
let tv_shows;

describe("Sorting", () => {
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
      cy.clickSortByName();
      cy.get(".movie-card").each(($card, index) => {
        cy.wrap($card).find("a").contains(moviesByName[index].title);
      });
    });
    it("Sort by time", () => {
      const moviesByTime = sortByTime(movies);
      cy.clickSortByTime();
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
      const tvByName = sortByName(tv_shows);
      cy.clickSortByName();
      cy.get(".movie-card").each(($card, index) => {
        cy.wrap($card).find("a").contains(tvByName[index].name);
      });
    });
    it("Sort by time", () => {
      const tvByTime = sortByTime(tv_shows);
      cy.clickSortByTime();
      cy.get(".movie-card").each(($card, index) => {
        cy.wrap($card).find("a").contains(tvByTime[index].name);
      });
    });
  });
});