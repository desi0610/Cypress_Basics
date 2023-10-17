/// <reference types="cypress"/>

describe('Context: My First Test', () => {
/**
 * In order to upload the test in Cypress we need to install plugin
 * we will run following command:
 * 
 * npm install -dev cypress-file-upload
 * 
 */
    beforeEach(() => {
        // run before each test case, like @BeforeMethod in TestNG
        // cy.clearCookie();
    });

    // to skip a test we just use it.skip(.....)
    // only is used to test only one statement
    it('Opening a web application', () => {
        cy.visit('/registration_form');
    });

});
