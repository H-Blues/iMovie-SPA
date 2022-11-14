let movies;
let movieId;

describe("Navigation", () => {
  // before(() => {
  //   cy.request(
  //     `https://api.themoviedb.org/3/movie/popular?api_key=${Cypress.env(
  //       "TMDB_KEY"
  //     )}&language=en-US&include_adult=false&include_video=false&page=1`
  //   )
  //     .its("body")
  //     .then((response) => {
  //       movies = response.results;
  //     });
  // });
  beforeEach(() => {
    cy.visit("/");
  });
  describe("The site header", () => {
    describe("when the viewport is desktop scale", () => {
      it("navigate to movie page via the dropdown menu", () => {
        cy.get("button").contains("Movies").click();
        cy.get("li").contains("Popular").click();
        cy.url().should("include", `/movie`);
        cy.get("a").contains("iMovies").click();
        cy.url().should("include", `/`);
      });
      it("navigate to TV page via the dropdown menu", () => {
        cy.get("button").contains("TV_Shows").click();
        cy.get("li").contains("Popular").click();
        cy.url().should("include", `/tv`);
      });
      it("navigate to people page via the dropdown menu", () => {
        cy.get("button").contains("People").click();
        cy.get("li").contains("Popular").click();
        cy.url().should("include", `/people`);
      });
      it("navigate to favorite page via the dropdown menu", () => {
        cy.get("button[aria-label='Account settings']").click();
        cy.get("a").contains("My Favorite").click();
        cy.url().should("include", `/favourite`);
      });
    });
    describe(
      "when the viewport is a iPad or a mobile scale",
      {
        viewportHeight: 1024,
        viewportWidth: 768,
      },
      () => {
        it("navigate to movie page via the link", () => {
          cy.get("header").find("button").find("svg").click();
          cy.get("li").contains('Movies').click();
          cy.url().should("include", `/movie`);
          cy.get("a[class='MuiTypography-root MuiTypography-h5 MuiTypography-noWrap css-1lfs2tq-MuiTypography-root']").contains("iMovies").click();
          cy.url().should("include", `/`);
        });
        it("navigate to TV page via the link", () => {
          cy.get("header").find("button").find("svg").click();
          cy.get("li").contains('TV_Shows').click();
          cy.url().should("include", `/tv`);
        });
        it("navigate to people page via the link", () => {
          cy.get("header").find("button").find("svg").click();
          cy.get("li").contains('People').click();
          cy.url().should("include", `/people`);
        });
        it("navigate to favorite page via the link", () => {
          cy.get("button[aria-label='Account settings']").click();
          cy.get("a").contains("My Favorite").click();
          cy.url().should("include", `/favourite`);
        });
      }
    );
  });
  // describe("From the favourites page to a movie's details", () => {
  //   // TODO
  // });
  // describe("The forward/backward links", () => {
  //   beforeEach(() => {
  //     cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
  //   });
  //   it("navigates between the movies detail page and the Home page.", () => {
  //     cy.get("svg[data-testid='ArrowBackIcon'").click();
  //     cy.url().should("not.include", `/movies/${movies[0].id}`);
  //     cy.get("svg[data-testid='ArrowForwardIcon'").click();
  //     cy.url().should("include", `/movies/${movies[0].id}`);
  //   });
  // });
});