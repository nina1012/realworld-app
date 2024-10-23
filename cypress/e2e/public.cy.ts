describe('Public flow', () => {
  const baseURL = 'http://localhost:3000';
  it('should display Home page', () => {
    cy.visit(`${baseURL}`);
    cy.get('h1').contains('conduit');
    cy.get('p').contains(
      'A place to share your knowledge.'
    );
  });

  it('should navigate to log in, sign in routes', () => {
    cy.visit(`${baseURL}`);
    // go to log in/sign in route
    const signInLink = cy
      .get('nav')
      .find('a > span')
      .contains('Sign in');
    signInLink.click();
    cy.url().should('equal', `${baseURL}/auth/login`);
    // go to register/sign up route
    const signUpLink = cy
      .get('nav')
      .find('a > span')
      .contains('Sign up');
    signUpLink.click();
    cy.url().should('equal', `${baseURL}/auth/register`);
    // go to the home route
    const homeLink = cy
      .get('nav')
      .find('a')
      .contains('conduit');
    homeLink.click();
    cy.url().should('equal', 'http://localhost:3000/');
  });
});
