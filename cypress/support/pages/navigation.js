export class NavigateTo {
  loginPage() {
    cy.visit(Cypress.env('login')); // Cypress.env: takes the parameter and it's reading(like ConfigReader)
  }
}

export const navigateTo = new NavigateTo();
