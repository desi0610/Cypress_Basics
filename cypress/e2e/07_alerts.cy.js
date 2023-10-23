/// <reference types="cypress"/>

describe('Alerts in Cypress Test Environment', { baseUrl: 'https://demoqa.com' }, () => {
  beforeEach(() => {
    // run before each test case, like @BeforeMethod in TestNG
    // cy.clearCookie();
    cy.visit('/alerts');
  });

  it('Check alert conformation', () => {
    /**
     * Browser Commands, window: alert, window:confirm, window:on,etc...
     *
     */

    const stub = cy.stub(); // created a stub function
    cy.on('window:confirm', stub);
    // when this conformation command initiated store and give control to stub function
    cy.get('#confirmButton')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Do you confirm action?');
      });

    cy.on('window:confirm', () => true);

    cy.contains('You selected Ok').should('be.visible');
  });

  it('Check alert cancellation', () => {
    /**
     * Browser Commands, window: alert, window:confirm, window:on,etc...
     *
     */

    const stub = cy.stub(); // created a stub function
    cy.on('window:confirm', stub);
    // when this conformation command initiated store and give control to stub function
    cy.get('#confirmButton')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Do you confirm action?');
      });

    cy.on('window:confirm', () => false);

    cy.contains('You selected Cancel').should('be.visible');
  });
});
