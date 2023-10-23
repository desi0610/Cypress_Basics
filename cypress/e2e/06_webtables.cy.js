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
    it('Check finding and editing a record', () => {
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
    it('Check adding a new record - Bad Code Practice', () => {
        // click on add button
        cy.get('#addNewRecordButton').click();
        cy.get('#firstName').type('Harvey');
        cy.get('#lastName').type('Specter');
        cy.get('#userEmail').type('specter@example.com');
        cy.get('#age').type('40');
        cy.get('#salary').type('70000');
        cy.get('#department').type('legal');
        cy.get('#submit').click();

        // assert that new record is added
        cy.get('rt-tbody')
            .contains('rt-tr-group', 'Harvey')
            .then((row) => {
                cy.wrap(row).find('.rt-td').eq(0).should('contain', 'Harvey');
                cy.wrap(row).find('.rt-td').eq(1).should('contain', 'Specter');
                cy.wrap(row).find('.rt-td').eq(2).should('contain', '40');
                cy.wrap(row).find('.rt-td').eq(3).should('contain', 'specter@example.com');
                cy.wrap(row).find('.rt-td').eq(4).should('contain', '70000');
                cy.wrap(row).find('.rt-td').eq(5).should('contain', 'legal');

            })
    });
    it('Adding a new record - Better approach', () => {
        //click on add button
        cy.get('#addNewRecordButton').click();
        cy.fixture('user').then((user) => {
            const columnNames = Object.keys(user.user1); // goes to fixtute folder, gets user1 object keys and stores into columnNames Array
            const userData = Object.values(user.user1);
            cy.wrap(columnNames).each((columnName, index) => {
                //cy.log(columnName);
                //cy.log(userData[index]);
                cy.get(`#${columnName}`).type(`${userData[index]}`);
            })
            cy.get('#submit').click();
            // assert that new record is added
            cy.get('.rt-tbody')
                .contains('.rt-tr-group', userData[0])
                .then((row) => {
                    cy.wrap(userData).each((value, index) => {
                        cy.wrap(row).find('.rt-td').eq(index).should('contain', value);

                    });

                })
        });

    })
});
