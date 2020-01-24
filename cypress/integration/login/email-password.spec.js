/// <reference types="Cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.logout()
    cy.visit('http://localhost:4200/login')
  })

  it('Login with fake account', () => {
    cy.get('[formcontrolname="email"]')
      .type('fake@email.com')

    cy.get('[formcontrolname="password"]')
      .type('password')

    cy.get('form.ng-dirty > .waves-effect').click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`There is no user record corresponding to this identifier. The user may have been deleted.`)
    })
  })

  it('Login with real account', () => {
    cy.get('[formcontrolname="email"]')
      .type('test@email.com')

    cy.get('[formcontrolname="password"]')      
      .type('123123')

    cy.get('form.ng-dirty > .waves-effect').click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Welcome`)
    })
  })
})
