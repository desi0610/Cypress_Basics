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
    })
    

})