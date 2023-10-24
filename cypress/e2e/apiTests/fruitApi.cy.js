
describe('Fruit API tests', { baseUrl: 'https://api.predic8.de/' }, () => {
    it('Get a single spartan', () => {
        cy.request('GET', 'shop/v2/products/8').then((response) => {
            expect(response.status).to.equal(200);
        })
    })

    it('POST one fruit test', () => {
        cy.request({
            method: 'POST',
            url: 'shop/v2/products',
            body: {
                "name": "Cherries",
                "price": 2.50,
                "self_link": "/shop/v2/products/50"
            }

        }
        ).then((response) => {
            expect(response.status).to.equal(201);
            expect(response.body.name).to.equal('Cherries');
            expect(response.body.price).to.equal(2.5);
        })

    })

})