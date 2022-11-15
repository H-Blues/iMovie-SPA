let movies;
let tv_shows;
let people;

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
      console.log(movies);
    });
    cy.request(
      `https://api.themoviedb.org/3/person/popular?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&include_adult=false&include_video=false&page=1`
    ).its("body").then((response) => {
      people = response.results;
      console.log(movies);
    });
  });

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
        it("navigate to movie page via the menu link", () => {
          cy.get("header").find("button").find("svg").click();
          cy.get("li").contains('Movies').click();
          cy.url().should("include", `/movie`);
          cy.get("a[class='MuiTypography-root MuiTypography-h5 MuiTypography-noWrap css-1lfs2tq-MuiTypography-root']").contains("iMovies").click();
          cy.url().should("include", `/`);
        });
        it("navigate to TV page via the menu link", () => {
          cy.get("header").find("button").find("svg").click();
          cy.get("li").contains('TV_Shows').click();
          cy.url().should("include", `/tv`);
        });
        it("navigate to people page via the menu link", () => {
          cy.get("header").find("button").find("svg").click();
          cy.get("li").contains('People').click();
          cy.url().should("include", `/people`);
        });
        it("navigate to favorite page via the menu link", () => {
          cy.get("button[aria-label='Account settings']").click();
          cy.get("a").contains("My Favorite").click();
          cy.url().should("include", `/account/favourite`);
        });
      }
    );
  });

  describe("The touch slider in home page", () => {
    describe("navigates to list page via button", () => {
      it("to popular movie page", () => {
        cy.get("div[class='sectionHeader']").find("a[href='/movie']").contains("MORE").click();
        cy.url().should("include", '/movie');
      });
      it("to top rated movie page", () => {
        cy.get("div[class='sectionHeader']").find("a[href='/movie/top-rated']").contains("MORE").click();
        cy.url().should("include", '/top-rated');
      });
      it("to upcoming movie page", () => {
        cy.get("div[class='sectionHeader']").find("a[href='/movie/upcoming']").contains("MORE").click();
        cy.url().should("include", '/upcoming');
      });
      it("to popular tv page", () => {
        cy.get("div[class='sectionHeader']").find("a[href='/tv']").contains("MORE").click();
        cy.url().should("include", '/tv');
      });
    });
    describe("navigates to detail page via name or title", () => {
      it("to movie detail page", () => {
        cy.get("div[class='movie-card']").eq(0).find("a").click();
        cy.url().should("include", `/movie/${movies[0].id}`);
      });
      it("to tv detail page", () => {
        cy.get("div[class='movie-card']").eq(120).find("a").click();
        cy.url().should("include", `/tv/${tv_shows[0].id}`);
      });
    });
  });

  describe("From list page to a detail page", () => {
    it("popular movie page to a movie detail", () => {
      cy.visit('/movie');
      cy.get("div[class='movie-card']").eq(0).find("a").click();
      cy.url().should("include", `/movie/${movies[0].id}`);
    });
    it("popular tv page to a tv detail", () => {
      cy.visit('/tv');
      cy.get("div[class='movie-card']").eq(0).find("a").click();
      cy.url().should("include", `/tv/${tv_shows[0].id}`);
    });
    it("popular people page to a person detail", () => {
      cy.visit('/people');
      cy.get("div[class='movie-card']").eq(0).find("a").click();
      cy.url().should("include", `/people/${people[0].id}`);
    });
  });

  describe("From the favourite page to a movie's details", () => {
    beforeEach(() => {
      cy.get("div[class='movie-card']").eq(0).find("a").click();
      cy.get("button[aria-label='add to favorites']").click();
      cy.get("button[aria-label='Account settings']").click();
      cy.get("a").contains("My Favorite").click();
    });
    it("navigates to the movie details page from favourites page and change browser URL", () => {
      cy.url().should("include", `/account/favourite`);
      cy.get("div[class='movie-card']").eq(4).find("a").click();
      cy.url().should("include", `/movie/${movies[0].id}`);
      cy.url().should("not.include", `/account/favorites`);
    });
  });
});