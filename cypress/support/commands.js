// utils
Cypress.Commands.add('clickMyFavorite', () => {
  cy.get("button[aria-label='Account settings']").click();
  cy.get("a").contains("My Favorite").click();
});

Cypress.Commands.add("checkUrl", (url) => {
  cy.url().should("include", url);
});

// navigation e2e test
Cypress.Commands.addAll({
  clickMainMenuOnPC (menuItem) {
    cy.get('button').contains(menuItem).click();
    cy.get("li").contains("Popular").click();
  },
  clickMainMenuOnMobile (menuItem) {
    cy.get("header").find("button").find("svg").click();
    cy.get("li").contains(menuItem).click();
  },
  clickLogoOnPC () { cy.get("a").contains("iMovies").click(); },
  clickLogoOnMobile () {
    cy.get("a[class='MuiTypography-root MuiTypography-h5 MuiTypography-noWrap css-1lfs2tq-MuiTypography-root']")
      .contains("iMovies").click();
  },
  clickMore (href) {
    cy.get("div[class='sectionHeader']").find(`a[href='${href}']`).contains("MORE").click();
  }
});

// base e2e test
Cypress.Commands.addAll({
  checkSwiperNum (index, component, length) {
    cy.get("div[class='swiper-wrapper']")
      .should('have.length', 9)
      .eq(index).find(component)
      .should("have.length", length);
  },
  checkCardTitle (items) {
    cy.get("a[class='MuiTypography-root MuiTypography-h6 MuiTypography-gutterBottom css-17lvz15-MuiTypography-root']")
      .each(($card, index) => {
        cy.wrap($card).contains(items[index].title || items[index].name);
      });
  },
  checkItemDetail (item, itemCredits) {
    cy.get("h1").contains(item.title || item.name);
    let intro = item.overview;
    cy.get("p[class='summary']").contains(intro.replace(/<\/?.+?>/g, ""));
    cy.get("div[class='contentDetail']").within(() => {
      const genreChipLabels = item.genres.map((g) => g.name);
      cy.get(".MuiChip-label").each(($card, index) => {
        cy.wrap($card).contains(genreChipLabels[index]);
      });
    });
    cy.get("div[class='castCard']").within(() => {
      const creditNames = itemCredits.map((c) => c.name);
      const creditNamesShown = creditNames.length >= 5 ? creditNames.slice(0, 5) : creditNames;
      cy.get("a").each(($person, index) => {
        cy.wrap($person).contains(creditNamesShown[index]);
      });
    });
  },
  checkPersonDetail (person, personCredits) {
    cy.get("h1").contains(person.name);
    cy.get("p[class='summary']").contains(person.biography.replace(/<\/?.+?>/g, ""));
    cy.get("div[class='contentDetail']").within(() => {
      cy.get(".MuiChip-label").contains(person.known_for_department);
    });
    cy.get("div[class='castCard']").within(() => {
      const creditNames = personCredits.map((c) => c.title);
      cy.log(creditNames);
      const creditNamesShown = creditNames.length >= 5 ? creditNames.slice(0, 5) : creditNames;
      cy.log(creditNamesShown);
      cy.get("a").each(($person, index) => {
        cy.wrap($person).contains(creditNamesShown[index]);
      });
    });
  }
});