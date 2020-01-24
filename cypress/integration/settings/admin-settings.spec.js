context('Actions', () => {

  beforeEach(() => {
    cy.login()
  })

  it('update user settings', () => {
    cy.visit('http://localhost:4200/adminSettings')
    
    cy.get('.admin-settings-collection').contains('jacob@jo.com')
    cy.get(':nth-child(1) > [name="EditUserSettings"]').click()

    cy.get('.form-container > .ng-untouched')
      .clear()
      .type('new name')
    
    cy.get('[type="submit"]').click()

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`update succesful`)
    })
    cy.get('.close-button').contains('Close').click()
  })

  it('impersonate user', () => {
    cy.visit('http://localhost:4200/adminSettings')    
    
    cy.get('.admin-settings-collection').contains('jacob@jo.com')
    cy.get(':nth-child(1) > [name="ImpersonateUser"]').click()

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`login succesful`)
    })

    cy.get('.admin-popup')

    cy.visit('http://localhost:4200/home')

    cy.get('.form-control')
      .invoke('val')
      .then(sometext => expect(sometext).to.equal(`new name`));
    cy.logout()
  })
})