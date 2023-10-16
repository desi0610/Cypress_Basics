/// <reference types="cypress"/>

describe('Context: My First Test', () => {
    beforeEach(() => {
        // run before each test case, like @BeforeMethod in TestNG
        //cy.clearCookie();
        cy.visit('/multiple_buttons');
    })

    it('Check Different Butoon Action', () => {
        // select a button with text
        cy.contains('Button 2') // find me element that contains text 'Button 2'
            .should('be.visible').click();
        cy.contains('Clicked on button two!')
            .should('be.visible');

        // find element with class attr and create a list and then select 3rd element from the list
        cy.get('.btn.btn-primary').then(($buttons) => {
            cy.wrap($buttons)// wrapping html in cypress => in List Java, list.get(index)
                .eq(2).click();
            // assert the text
            cy.contains('Clicked on button three!')
                .should('be.visible');

        })
        // you got all buttons with tagName
        cy.get('button').each((item, index, list) => {
            //assert lenght of the list, verify number of buttons
            expect(list).to.have.length(6);
            expect(item).to.have.attr('onclick');
        })

        // I will get all buttons like previous approach, get only the item then check for text of each item,
        // it is equal to Button 4, then clik on it
        cy.get('button').each((item) => {
            //assert lenght of the list, verify number of buttons
            if (item.text() == "Button 4") {
                cy.log(item.text()); // this command writes the text at the test console
                // item.click(); you can not use cypress click function on jQuery element
                cy.wrap(item).click();
                cy.contains('Clicked on button four!').should('be.visible');

            }
        })

        // npx cypress run headless -b chrome


    })

})