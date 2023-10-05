/// <reference types="cypress"/>

describe('Context: My First Test',() =>{
    before(( ) => {
        // runs once before all test cases in this describe block, like @BeforeClass in TestNG

    })
    beforeEach(() => {
        // run before each test case, like @BeforeMethod in TestNG
        //cy.clearCookie();
    })
    after(() =>{
        // similar to @AfterClass in TestNG, runs once after all test are finished
    })
    afterEach(() => {
        // similar to @AfterMethod in TestNG, runs after each test
    })

    // to skip a test we just use it.skip(.....)
    // only is used to test only one statement
    it('Opening a web application', () => {
        cy.visit('/registration_form');
       
    })

    it.skip('Test 2', () => {
        expect(false).to.equal(false);
    })

    //xit
    it('Test 3', () => {
        expect(5).to.equal(5);
    })

    it('Test 4', () => {
        expect(false).not.to.equal(true);
    })
    it('Test 5', () => {
        expect(true).to.equal('5' == 5);
    })

})