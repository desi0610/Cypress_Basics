/// <reference types="cypress"/>

describe('Cypress WebTable Tests', { baseUrl: 'https://demoqa.com' }, () => {
    beforeEach(() => {
        /**
         * If you need to navigate to URL other than your base URL, you define it in describe block or
         */
        cy.visit('/webtables');
    });

    // to skip a test we just use it.skip(.....)
    // only is used to test only one statement
    it.skip('Check finding and editing a record', () => {
        // locate table body than navigate through this element to find Alden(or targeted name,
        // then update info with another person
        // 1. get me table body
        // 2. get me the row that contains 'Alden'
        // 3. store it in jQuery element
        cy.get('.rt-tbody') // get the whole body
            .contains('.rt-tr-group', 'Alden') // then row and from there the one that contains the 'Alden' data
            .then((row) => {
                // click on edit button for Alden record
                cy.wrap(row).find('[title="Edit"]').click();
                // fill in the box with new person
                cy.get('#firstName').clear().type('Harvey');
                cy.get('#lastName').clear().type('Specter');
                cy.get('#submit').click();
                // from Cypress test perspective we are stil inside row element : need to do assertion
                cy.wrap(row).find('.rt-td').eq(0).should('contain', 'Harvey');
                cy.wrap(row).find('.rt-td').eq(1).should('contain', 'Specter');
            });
    });
    it('Check search for different age records', () => {
        // cy.get('.rt-tbody')
        //   .contains('.rt-tr-group', 'Alden')
        //   .then((row) => {
        //     // click on edit button for Alden record
        //     cy.wrap(row).find('[title="Delete"]').click();
        //   });
        // // Assert that table does not have Alden record
        // cy.get('.rt-tbody').should('not.contain', 'Alden');
        // // search for Alden in the body
        // cy.get('#searchBox').type('Alden');
        // // Assert than there is no record
        // cy.get('.rt-tbody').should('not.contain', 'Alden');
        // // No data found element is visible
        // cy.get('.rt-noData').should('contain', 'No rows found').should('be.visible');

        const ageGroup = [29, 39, 45, 77];
        // for each age group perform same test scenario
        cy.wrap(ageGroup).each((age) => {
            // type age into search box
            cy.get('#searchBox').clear().type(age);
            // verify if the age exist, second number of records

            // negative scenario
            if (age === 77) {
                cy.get('.rt-tbody').find('.rt-tr-group').first().should('not.contain', age);
                cy.get('.rt-noData').should('contain', 'No rows found').should('be.visible');
            } else {
                // positive scenario
                cy.get('.rt-tbody').find('.rt-tr-group').first().should('contain', age);
                cy.get('.rt-tbody').contains('.rt-tr-group', age).should('have.length', 1);
            }

        });
    });
});
