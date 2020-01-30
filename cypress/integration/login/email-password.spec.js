/// <reference types="Cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.logout()
    cy.visit('http://localhost:4200/login')
  })

  it('Login with fake account', () => {
    cy.get('#mat-input-0')
      .type('fake@email.com')

    cy.get('#mat-input-1')
      .type('password')

    cy.get('form.ng-dirty > .mat-button > .mat-button-wrapper').click()

    cy.on('.mat-snack-bar-container', (str) => {
      expect(str).to.equal(`There is no user record corresponding to this identifier. The user may have been deleted.`)
    })
  })

  it('Login with real account', () => {
    cy.get('#mat-input-0')
      .type('test@email.com')

    cy.get('#mat-input-1')     
      .type('123123')

    cy.get('form.ng-dirty > .mat-button > .mat-button-wrapper').click()
    cy.on('.mat-snack-bar-container', (str) => {
      expect(str).to.equal(`Welcome`)
    })
  })
})
