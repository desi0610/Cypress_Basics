
// <reference types="cypress"/>

describe('Find or get Elements by using Different Locators', () =>{
    beforeEach(() => {
        // runs before each test case, beforeMethod at TestNG
        cy.clearCookies();
        cy.visit('/login');
    })

    it('Check different locator strategies', () => {

        // By CSS locators 
        cy.get("input[name='username']").type('CydeoStudent'); //every statement creates an obj to be interacted, 
        // and next command makes operation to the obj created at previous statement

        // attribute name and value
        cy.get("[type='text']").clear(); //clear what is typed

        //tag name
        cy.get("input").each((item, index, list) => {
            // assert the lenght of the list is 2
            expect(list).to.have.length(2);
            expect(item).to.have.attr("type");

        })

        // by attribute name
        cy.get('[type]');

        // by class attr value
        cy.get('.btn.btn-primary');

        // by id attr value
        cy.get('#wooden_spoon');

        // If I want to use text: no xpath in cypress, but it is still possible with a different approach
        cy.get('button').should('contain','Login').click();

    })

    it('Check finding elements my traveling through DOM', () => {
        // travel to find the login button:  locate username box - go to parent form and -then find button
        cy.get('input[name="username"]').parents('form').find('button').should('contain','Login').click;


    })


     it.only('Check different type of Assertions', () => {

        // Cypress itself usses assertions provided by Chai and Sinon and jQuery library
        // Should assertion
        cy.get('#wooden_spoon')
        .should('contain','Login')
        .and('have.class','btn btn-primary');

        // expect assertion: explicit assertion, creates a subject of our test, then implement different actions
        cy.get('#wooden_spoon').then((buttonElement) =>{
            expect(buttonElement).to.have.text('Login');
            expect(buttonElement).to.have.class('btn btn-primary');

            
        }) 
    })

   
})
