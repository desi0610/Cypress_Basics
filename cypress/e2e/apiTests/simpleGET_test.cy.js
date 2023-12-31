
describe('How to do API tests with cypress', () => {
    it('Simple GET request, check status, header and body', () => {
        cy.request({
            // this function takes a json bj as parameter, and inside define core part of HTTP request
            method: 'GET',
            url: `${Cypress.env('apiUrl')}${Cypress.env('apiBooks')}`,
            // other than method and url the rest options depend on your test case
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.equal(200);
            // verify second book has title: Learning JavaScript Design Patterns
            expect(response.body.books[1].title).to.equal('Learning JavaScript Design Patterns');
            expect(response.headers.connection).to.equal('keep-alive');
            const { books } = response.body;
            // a loop to log just to see what we have in the response
            // this is a loop for verification

            cy.fixture('bookTitles').then((expectedBookTitle) => {
                for (let i = 0; i < 8; i++) {
                    expect(response.body.books[i].title).to.equal(expectedBookTitle[i]);
                    console.log(expectedBookTitle[i]);

                }

            })

        })
    })
})