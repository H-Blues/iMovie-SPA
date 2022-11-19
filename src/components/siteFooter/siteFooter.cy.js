import SiteFooter from './index';

describe('<SiteFooter>', () => {
  it('displays 4 icons ', () => {
    cy.mount(<SiteFooter />);
    cy.get('div[class="footer-right"]').find('a').should('have.length', 4);
  });
  it('displays slogan and copyright ', () => {
    cy.mount(<SiteFooter />);
    cy.get('.footer-left').contains('Find you like');
    cy.get('.footer-left').contains('Zihan');
  });
});