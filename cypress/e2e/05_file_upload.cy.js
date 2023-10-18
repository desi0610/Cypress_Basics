/// <reference types="cypress"/>

describe('Context: My First Test', () => {
/**
 * In order to upload the test in Cypress we need to install plugin
 * we will run following command:
 * 
 * 1. npm install -dev cypress-file-upload
 * 2. we need to import necessary command to our project in our support folder,
 * we have commands.js file: this is a good place for putting our utility methods(functions)
 * 3. in support folder under commands.js add this line of code => import 'cypress-file-upload';
 * 
 * 4. the file that you want to upload should be in your fuxure folder
 * 
 */
    beforeEach('Navigate to upload page', () => {
        // run before each test case, like @BeforeMethod in TestNG
        //cy.clearCookie();
        cy.visit('/upload');
    });

    // to skip a test we just use it.skip(.....)
    // only is used to test only one statement
    it('Check Upload action', () => {
        // locator for choose file button
        cy.get('input#file-upload').attachFile('cypress_test.png');
        // click on upload button
        cy.get('#file-submit').click();
        // assert that path message is displayed
        cy.get('#uploaded-files').then(() => {
            cy.contains('cypress_test.png').should('be.visible');
        })
    });

});
