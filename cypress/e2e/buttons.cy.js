/// <reference types="cypress"/>

describe('Context: My First Test',() =>{
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
    })


})