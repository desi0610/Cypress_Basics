/// <reference types="cypress"/>

describe('Cypress WebTable Tests', { baseUrl: 'https://demoqa.com' }, () => {

    beforeEach(() => {
        /**
         * If you need to navigate to URL other than your base URL, you define it in describe block or
         */
        cy.visit('/webtables')
    });

    // to skip a test we just use it.skip(.....)
    // only is used to test only one statement
    it('Check finding and editing a record', () => {
        // locate table body than navigate through this element to find Alden(or targeted name,
        // then update info with another person
        // 1. get me table body
        // 2. get me the row that contains 'Alden'
        // 3. store it in jQuery element
        cy.get('.rt-body')// get the whole body
            .contains('rt-tr-group', 'Alden')// then row and from there the one that contains the 'Alden' data
            .then((row) => {
                // click on edit button for Alden record
                cy.wrap(row).find('[title="Edit"]').click();
                // fill in the box with new person
                cy.get('#firstName').clear().type('Harvey')
                cy.get('#lastName').clear().type('Specter')
                cy.get('#submit').click();
                // from Cypress test perspective we are stil inside row element : need to do assertion
                cy.wrap(row).find('.rt-td').eq(0).should('contain','Harvey');
                cy.wrap(row).find('.rt-td').eq(1).should('contain','Specter');

            })
    });


});
