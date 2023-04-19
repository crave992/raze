// sample.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('My First Test', () => {
   it('Visits the homepage', () => {
       cy.visit('http://localhost:3000');

       cy.contains('Articles').click();
       cy.url().should('include', 'featured-articles');
   })
});