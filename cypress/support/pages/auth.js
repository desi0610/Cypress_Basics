class Auth {
  // difference from Java, class name does not have to be same with file name
  // you can put more than one class in a file, and none of them have super power

  login(user_name, password) {
    cy.get('[name="username"]').type(user_name);
    cy.get('[name="password"]').type(password);
    cy.get('#wooden_spoon').click();
  }

  logout() {
    cy.contains('Logout').should('be.visible').click();
  }
}

const auth = new Auth(); // object of the class we made

class Locators {
  // we can create another class here, how dow we apply findBy annotations
  //  of Selenium with Cypress
  get userName() {
    return cy.get('[name="username"]', { timeout: 10000 }); // defining custom timeout for a specific element
  }

  get password() {
    return cy.get('[name="password"]', { timeout: 10000 });
  }

  get submit() {
    return cy.get('#wooden_spoon');
  }
}

const locators = new Locators();

module.exports = {
  auth,
  locators,
};
