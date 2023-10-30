const username = `user${(Math.floor(Math.random() * 100000 + 100000).toString()).substring(1)}`
const passWord = 'Test123456!'

describe('E2E - Test API integrated UI Test', () => {
    beforeEach('create a user and generate token from API and set cookies', () => {
        // following api request for creating user and setting cookies for the test
        cy.request({

            method: 'POST',
            url:`${Cypress.env('apiUrl')}${Cypress.env('generateUser')}`,// there is something wrong here(I have a mistake my tests are not working)
            //failOnStatusCode: false,
            //url: "https://demoqa.com/Account/v1/User",
            body: {
                userName: username,
                password: passWord
            }
        }).then((response) => {
            cy.setCookie('userID', response.body.userID);
            cy.setCookie('UserName', response.body.username);
        });
        // following will generate token and set token cookies
        cy.request({
            method: 'POST',
            url: `${Cypress.env('apiUrl')}${Cypress.env('generateToken')}`,
            body: {
                userName: username,
                password: passWord
            }
        }).then((response) => {
            cy.setCookie('token', response.body.token);
            cy.setCookie('expires', response.body.expires);
        })
    })
    afterEach('Deleting USER created for testing by using API request', () => {
        // we are chaning api request to login and delete
        cy.request({
            method: 'POST',
            url: `${Cypress.env('apiUrl')}${Cypress.env('loginAPI')}`,
            body: {
                userName: username,
                password: passWord
            }
        }).then((response) => {
            cy.request({
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${response.body.token}`
                },
                url: `${Cypress.env('apiUrl')}${Cypress.env('generateUser')}/${response.body.userID}`,

            });

        });
    });
    it('Check if user is logged in from UI env', { baseURL: "https://demoqa.com" }, () => {
        cy.visit('/profile');
        cy.get('#userName-value').contains(username).should('be.visible');

    })
})