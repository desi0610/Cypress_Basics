/// <reference types="cypress"/>

describe('Cypress WebTable Tests', () => {
   
    beforeEach(() => {
      // run before each test case, like @BeforeMethod in TestNG
      // cy.clearCookie();
      cy.visit('/webtables')
    });
  
    // to skip a test we just use it.skip(.....)
    // only is used to test only one statement
    it('Check finding and editing a record', () => {
     
    });
  
   
  });
  