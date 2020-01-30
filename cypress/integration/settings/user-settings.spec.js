context('Actions', () => {

  beforeEach(() => {
    cy.login()
    cy.visit('http://localhost:4200/home')
  })

  it('change user settings', () => {
    cy.get('input[id="age"]')
      .clear()
      .type('new age')
      
    cy.get('.form-control')
      .clear()
      .type('new Name')

    cy.get('[type="submit"]').click()

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`update succesful`)
    })
  })

  it('logout user', () => {
    cy.get('[style="float: right;"]').click()

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`logout succesful`)
    }) 
  })
})