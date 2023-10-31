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

  describe('Login', function () {

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
      cy.get('.error').should('have.css', 'border-color', 'rgb(255, 0, 0)');
      cy.contains('wrong username or password')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('New Blog').click()

      cy.contains('Title')
      .next().type('E2E Testing blog')

      cy.contains('Author')
      .next().type('HayatsCodes')

      cy.contains('URL')
      .next().type('http://example.com')

      cy.get('#create-blog-btn').click()
      cy.get('.success').should('have.css', 'border-color', 'rgb(0, 128, 0)');
      cy.contains("A new blog 'E2E Testing blog' by HayatsCodes added")
    })
  })
})