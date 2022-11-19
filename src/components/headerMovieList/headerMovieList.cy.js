import Header from './index';
import { MemoryRouter } from 'react-router-dom';

describe('<Header>', () => {
  it('displays the header title', () => {
    cy.mount(<MemoryRouter><Header title='Popular Movies' /></MemoryRouter>);
    cy.get('h3').should('have.text', 'Popular Movies');
  });
  it('clicking arrow buttons calls `goBack` or `goForward` function', () => {
    const back = cy.spy().as('back');
    const forward = cy.spy().as('next');
    cy.mount(<MemoryRouter><Header title='Popular Movies' goBack={back} goForward={forward} /></MemoryRouter>);
    cy.get('button[aria-label="go back"]').click();
    cy.get('@back').should('have.been.called', 1);
    cy.get('button[aria-label="go forward"]').click();
    cy.get('@back').should('have.been.called', 1);
  });
});