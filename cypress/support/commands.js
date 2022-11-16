// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('clickMainMenuOnPC', (menuItem) => {
  cy.get('button').contains(menuItem).click();
  cy.get("li").contains("Popular").click();
});

Cypress.Commands.add('clickMainMenuOnMobile', (menuItem) => {
  cy.get("header").find("button").find("svg").click();
  cy.get("li").contains(menuItem).click();
});

Cypress.Commands.add('clickLogoOnPC', () => {
  cy.get("a").contains("iMovies").click();
});

Cypress.Commands.add('clickLogoOnMobile', () => {
  cy.get("a[class='MuiTypography-root MuiTypography-h5 MuiTypography-noWrap css-1lfs2tq-MuiTypography-root']").contains("iMovies").click();
});

Cypress.Commands.add('clickMyFavorite', () => {
  cy.get("button[aria-label='Account settings']").click();
  cy.get("a").contains("My Favorite").click();
});

Cypress.Commands.add('clickMore', (href) => {
  cy.get("div[class='sectionHeader']").find(`a[href='${href}']`).contains("MORE").click();
});

Cypress.Commands.add('checkUrl', (url) => {
  cy.url().should("include", url);
});

// Error Catch
// cy.on('window:before:unload', (e) => {
//   expect(e.returnValue).to.be.undefined;
// });
// cy.on('window:unload', (e) => {
//   cy.log(e);
// });