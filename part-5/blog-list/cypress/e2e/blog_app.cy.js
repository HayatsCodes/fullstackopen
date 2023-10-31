describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Login to Application')
    cy.get('.login-form')
    cy.get('.blogs').should('not.exist')
  })

  describe.only('Login', function () {

    it('succeeds with correct credentials', function() {
      cy.contains('Username')
      .next().type('mluukkai')

      cy.contains('Password')
      .next().type('salainen')

      cy.get('#login-btn').click()
      cy.get('.blogs')
    })

    
    it('fails with wrong credentials', function() {
      cy.contains('Username')
      .next().type('fake')

      cy.contains('Password')
      .next().type('none')

      cy.get('#login-btn').click()
      cy.get('.error')
      cy.contains('wrong username or password')
    })
  })
})