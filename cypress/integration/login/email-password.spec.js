/// <reference types="Cypress" />

context('Actions', () => {
  const TEST_UID = Cypress.env('TEST_UID');
  const mockData = 'hello';

  beforeEach(() => {
    cy.logout()
    cy.visit('http://localhost:4200/login')
  })

  it('Login with fake account', () => {
    cy.get('app-login-email-password > [autofocus=""]')
      .type('fake@email.com')

    cy.get('[placeholder="Password"]')
      .type('password')

    cy.get('app-login-email-password > .waves-effect').click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`There is no user record corresponding to this identifier. The user may have been deleted.`)
    })
  })

  it('Login with real account', () => {
    cy.get('app-login-email-password > [autofocus=""]')
      .type('123@123.nl')

    cy.get('[placeholder="Password"]')
      .type('123123')

    cy.get('app-login-email-password > .waves-effect').click()
  })

  it('read/write test', () =>{
    cy.callFirestore('set', `users/${TEST_UID}`, {
      name: 'axa',
      age: 8,
    });
    cy.callFirestore('get', `users/${TEST_UID}`).then(r => {
      cy.wrap(r[0])
        .its('id')
        .should('equal', TEST_UID);
      cy.wrap(r[0])
        .its('data.age')
        .should('equal', mockAge);
    });
  })

})
