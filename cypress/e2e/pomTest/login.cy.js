import { auth } from '../../support/pages/auth';

import { NavigateTo, navigateTo } from '../../support/pages/navigation';

const LoginLocators = require('../../support/pages/auth'); // we can use this object to reach info in the auth obj

describe('Auth: Login user with differen way', () => {
  // navigation to the test page
  beforeEach('navigate to login page', () => {
    // cy.clearAllCookies();
    navigateTo.loginPage(); // this function we called it from our POM
  });

  it.skip('Happy Path scenario using POM function', () => {
    // auth.login('hardcoded variables') -> not a good practice
    cy.fixture('user').then((user) => {
      auth.login(user.user2.username, user.user2.password);
    });
    // let's call our custom command to verify the text
    cy.textExists('You logged into a secure area!');
    auth.logout();
  });

  it.skip('Happy Path scenario using POM locators', () => {
    // auth.login('hardcoded variables') -> not a good practice
    cy.fixture('user').then((user) => {
      // auth.login(user.user2.username, user.user2.password);
      // I need to import Locators objects to use it
      LoginLocators.locators.userName.type(user.user2.username);
      LoginLocators.locators.password.type(user.user2.password);
      LoginLocators.locators.submit.click();
    });
    // let's call our custom command to verify the text
    cy.textExists('You logged into a secure area!');
    auth.logout();
  });

  it('Check invalid user credentials', () => {
    auth.login('invalid234','invalid234'); 
    // verify error message
    cy.textExists('Your username is invalid!');
  });
});
