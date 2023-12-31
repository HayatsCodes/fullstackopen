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

  describe('When logged in', function() {
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

    describe('When a blog exist', function () {
      beforeEach(function() {
        cy.createBlog({ title: 'E2E Testing blog', author: 'HayatsCodes', url: 'http://example.com' })
      }) 

      it('Users can like a blog', function() {
        cy.contains('View').click()
        cy.contains('Likes 0')
        cy.get('.like').click()
        cy.contains('Likes 1')
      })

      it('Creator of blog can delete the blog', function () {
        cy.contains('E2E Testing blog').should('exist')
        cy.contains('View').click()
        cy.contains('Remove').click()
        cy.contains('E2E Testing blog').should('not.exist')
      })

      it('Non-creator of a blog can not see the delete button', function () {
        const newUser = {
          name: 'Matt Luka',
          username: 'maluk',
          password: 'lainense'
        }

        cy.request('POST', 'http://localhost:3003/api/users/', newUser)
        cy.login({username: newUser.username, password: newUser.password})

        cy.contains('View').click()
        cy.contains('Remove').should('not.exist')
      })

      it.only('Blogs are ordered by the most likes', function () {
        cy.createBlog({ title: 'New testing blog', author: 'Oakley', url: 'http://example.com' })

        cy.get('.blog').eq(0).should('contain', 'E2E Testing blog')
        cy.get('.blog').eq(1).should('contain', 'New testing blog')

        cy.get('.view-btn').eq(1).click()

        cy.get('.like').click()
        cy.get('.hide-btn').click()
        cy.get('.blog').eq(0).should('contain', 'New testing blog')
        cy.get('.blog').eq(1).should('contain', 'E2E Testing blog')
      })
    })
  })
})