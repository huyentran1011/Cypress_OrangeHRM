describe('Test Suite - Authentication', () => {
  it('Verify Login page', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    // Verify Logo
    cy.get('.orangehrm-login-branding').should('be.visible')
      .and('have.css', 'width', '384px')
      .and('have.css', 'max-width', '520px')
      .and('have.css', 'background-color', 'rgb(255, 255, 255)')
      .and('have.css', 'text-align', 'center')

    // Verify Login header
    cy.get('.oxd-text--h5').should('have.text', 'Login')
      .and('have.css', 'text-align', 'center')
      .and('have.css', 'font-weight', '800')

    // Verify Username label
    cy.get(':nth-child(2) > .oxd-input-group > .oxd-input-group__label-wrapper > .oxd-label')
      .should('have.text', 'Username')
      .and('have.css', 'font-weight', '600')
      .and('have.css', 'font-size', '12px')
      .and('have.css', 'color', 'rgb(100, 114, 140)')

    // Verify Username textbox
    cy.get('[name="username"]').should('be.visible')
      .and('have.attr', 'placeholder', 'Username')

    // Verify Password label
    cy.get(':nth-child(3) > .oxd-input-group > .oxd-input-group__label-wrapper > .oxd-label')
      .should('have.text', 'Password')
      .and('have.css', 'font-weight', '600')
      .and('have.css', 'font-size', '12px')
      .and('have.css', 'color', 'rgb(100, 114, 140)')

    // Verify Password textbox
    cy.get('[name="password"]').should('be.visible')
      .and('have.attr', 'placeholder', 'Password')

    // Verify Login button
    cy.get('.oxd-button').should('be.enabled')
      .and('contain', 'Login')
      .and('have.css', 'color', 'rgb(255, 255, 255)')
      .and('have.css', 'background-color', 'rgb(255, 123, 29)')

  })

  it('Login Fail with Username and Password are null', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/login')

    // Verify Username textbox
    cy.get('[name="username"]').should('have.css', 'border-color', 'rgb(235, 9, 16)')
    cy.get(':nth-child(2) > .oxd-input-group > .oxd-text').should('have.text', 'Required')
      .and('have.css', 'color', 'rgb(235, 9, 16)')
      .and('have.css', 'font-size', '12px')

    // Verify Password textbox
    cy.get('[name="password"]').should('have.css', 'border-color', 'rgb(235, 9, 16)')
    cy.get(':nth-child(3) > .oxd-input-group > .oxd-text').should('have.text', 'Required')
      .and('have.css', 'color', 'rgb(235, 9, 16)')
      .and('have.css', 'font-size', '12px')
  })

  it('Login Fail with Password are null', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/login')

    // Verify Username textbox
    cy.get('[name="username"]').should('have.css', 'border-color', 'rgb(232, 234, 239)')
    cy.get(':nth-child(2) > .oxd-input-group > .oxd-text').should('not.exist')

    // Veirify Password textbox
    cy.get('[name="password"]').should('have.css', 'border-color', 'rgb(235, 9, 16)')
    cy.get(':nth-child(3) > .oxd-input-group > .oxd-text').should('have.text', 'Required')
      .and('have.css', 'color', 'rgb(235, 9, 16)')
      .and('have.css', 'font-size', '12px')
  })

  it('Login Fail with Username are null', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/login')

    // Verify Username textbox
    cy.get('[name="username"]').should('have.css', 'border-color', 'rgb(235, 9, 16)')
    cy.get(':nth-child(2) > .oxd-input-group > .oxd-text').should('have.text', 'Required')
      .and('have.css', 'color', 'rgb(235, 9, 16)')
      .and('have.css', 'font-size', '12px')

    // Veirify Password textbox
    cy.get('[name="password"]').should('have.css', 'border-color', 'rgb(232, 234, 239)')
    cy.get(':nth-child(3) > .oxd-input-group > .oxd-text').should('not.exist')
  })

  it('Login Fail with Username and Password are invalid ', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('[name="username"]').type('abc')
    cy.get('[name="password"]').type('abc123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/login')

    // Verify error message
    cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials')
      .and('have.css', 'color', 'rgb(235, 9, 16)')
      .and('have.css', 'font-size', '14px')
  })


  it('Login Success', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    cy.get('[name="username"]').type('Admin')
    cy.get('[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/dashboard')

    cy.contains('PIM').click()
    cy.url().should('include', '/pim')
    cy.get(':nth-child(2) > .oxd-input').type('76803')
    cy.get('.oxd-form-actions > .oxd-button--secondary').click()
  })
})