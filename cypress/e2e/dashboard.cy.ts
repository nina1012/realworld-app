import { testData } from '../../src/testing/test-data';

describe('dashboard', () => {
  const user = testData.testUserData.user;
  const baseURL = 'http://localhost:3000';
  it('should authenticate into the dashboard', () => {
    cy.clearLocalStorage('user');
    cy.visit(`${baseURL}/auth/me`);
    cy.wait(500);
    cy.url().should(
      'equal',
      `${baseURL}/auth/login?redirect=/auth/me`
    );

    cy.get('#email').type(user.email);
    cy.get('#password').type(user.password);
    cy.get('button').contains('Sign in').click();
    cy.wait(500);
    cy.visit(`${baseURL}`, {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          'user',
          JSON.stringify(user)
        );
      },
    });
    cy.getAllLocalStorage().then((result) => {
      expect(result).to.deep.equal({
        'http://localhost:3000': {
          user: JSON.stringify(user),
        },
      });
    });
  });
});
