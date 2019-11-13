/// <reference types="Cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/login')
  })

  // https://on.cypress.io/interacting-with-elements

  it('.type() - type into a DOM element', () => {
    // https://on.cypress.io/type
    cy.get('app-login-email-password > [autofocus=""]')
      .type('fake@email.com')

      // Delay each keypress by 0.1 sec
      // .type('slow.typing@email.com', { delay: 100 })
      // .should('have.value', 'slow.typing@email.com')
    cy.get('[placeholder="Password"]')
      // Ignore error checking prior to type
      // like whether the input is visible or disabled
      .type('password')

    cy.get('app-login-email-password > .waves-effect').click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`There is no user record corresponding to this identifier. The user may have been deleted.`)
    })
  })
})
