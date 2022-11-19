let movies_p1, movies_p2;
let tv_shows_p1, tv_shows_p2;

describe("Pagination", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/movie/popular?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&page=1`
    ).its("body").then((response) => {
      movies_p1 = response.results;
    });
    cy.request(
      `https://api.themoviedb.org/3/tv/popular?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&page=1`
    ).its("body").then((response) => {
      tv_shows_p1 = response.results;
    });
    cy.request(
      `https://api.themoviedb.org/3/movie/popular?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&page=2`
    ).its("body").then((response) => {
      movies_p2 = response.results;
    });
    cy.request(
      `https://api.themoviedb.org/3/tv/popular?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&page=2`
    ).its("body").then((response) => {
      tv_shows_p2 = response.results;
    });
  });

  describe("In movie pages", () => {
    beforeEach(() => {
      cy.visit("/movie");
    });
    it("displays different pages after clicking page number button", () => {
      cy.checkCardTitle(movies_p1);
      cy.get(".MuiPagination-ul").find("li").eq(2).click();
      cy.checkCardTitle(movies_p2);
    });
    it("displays the next page contents after clicking right arrow", () => {
      cy.checkCardTitle(movies_p1);
      cy.get(".MuiPagination-ul").find("li").eq(8).click();
      cy.checkCardTitle(movies_p2);
    });
    it("displays the previous page contents after clicking left arrow", () => {
      cy.get(".MuiPagination-ul").find("li").eq(2).click();
      cy.checkCardTitle(movies_p2);
      cy.get(".MuiPagination-ul").find("li").eq(0).click();
      cy.checkCardTitle(movies_p1);
    });
  });

  describe("In TV pages", () => {
    beforeEach(() => {
      cy.visit("/tv");
    });
    it("displays different pages after clicking page number button", () => {
      cy.checkCardTitle(tv_shows_p1);
      cy.get(".MuiPagination-ul").find("li").eq(2).click();
      cy.checkCardTitle(tv_shows_p2);
    });
    it("displays the next page contents after clicking right arrow", () => {
      cy.checkCardTitle(tv_shows_p1);
      cy.get(".MuiPagination-ul").find("li").eq(8).click();
      cy.checkCardTitle(tv_shows_p2);
    });
    it("displays the previous page contents after clicking left arrow", () => {
      cy.get(".MuiPagination-ul").find("li").eq(2).click();
      cy.checkCardTitle(tv_shows_p2);
      cy.get(".MuiPagination-ul").find("li").eq(0).click();
      cy.checkCardTitle(tv_shows_p1);
    });
  });
});