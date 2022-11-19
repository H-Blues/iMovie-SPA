let movies;

describe("The favourites feature", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/movie/popular?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&page=1`
    ).its("body").then((response) => {
      movies = response.results;
    });
  });
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Selecting favourites", () => {
    it("click outlined favourite icon makes red heart fulfilled", () => {
      cy.get("div[class='movie-card']").eq(0).find("a").click();
      cy.checkUrl(`/movie/${movies[0].id}`);
      cy.get(".contentDetail").find("svg[data-testid='FavoriteBorderOutlinedIcon']");
      cy.get("button[aria-label='add to favorites']").click();
      cy.get(".contentDetail").find("svg[data-testid='FavoriteIcon']");
    });
  });

  describe("Removing favourites", () => {
    it("click fulfilled favourite icon makes red heart outlined", () => {
      cy.visit('/movie/101');
      cy.get(".contentDetail").find("svg[data-testid='FavoriteIcon']");
      cy.get("button[aria-label='remove from favorites']").click();
      cy.get(".contentDetail").find("svg[data-testid='FavoriteBorderOutlinedIcon']");
    });
  });

  describe("The favourites page", () => {
    it("displays 4 default favorite movies at first", () => {
      cy.clickMyFavorite();
      cy.get("div[class='swiper-wrapper']").find("a").should("have.length", 4);
    });
    it("only the tagged movies are listed", () => {
      cy.clickMainMenuOnPC('Movies');
      cy.get("div[class='movie-card']").eq(0).find("a").click();
      cy.get("button[aria-label='add to favorites']").click();
      cy.clickMainMenuOnPC('Movies');
      cy.get("div[class='movie-card']").eq(1).find("a").click();
      cy.get("button[aria-label='add to favorites']").click();
      cy.clickMyFavorite();
      cy.get("div[class='swiper-wrapper']").find("a").should("have.length", 6);
      cy.get("div[class='swiper-wrapper']").find("a").eq(4).contains(movies[0].title);
      cy.get("div[class='swiper-wrapper']").find("a").eq(5).contains(movies[1].title);
    });
  });
});