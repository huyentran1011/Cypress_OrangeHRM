import { use } from 'chai';
import { LoginPage } from '../pageObjects/login_page';
const loginPage = new LoginPage();

describe('Login test cases', () => {
  beforeEach(() => {
    loginPage.navigate('http://localhost:86/orangehrm5/web/index.php/auth/login');
  })

  it('Verify Login page', () => {

    // Verify Logo
    loginPage.verifyCompanyLogo();

    // Verify Login Text header
    loginPage.verifyLoginTextHeader('Login');

    // Verify Username label
    loginPage.verifyUsernameLabel('Username');

    // Verify Username textbox
    loginPage.verifyUsernameTextbox(false);

    // Verify Password label
    loginPage.verifyPasswordLabel('Password');

    // Verify Password textbox
    loginPage.verifyPasswordTextbox(false);

    // Verify Login button
    loginPage.verifyLoginButton("Login");

  })

  it('Login Fail with Username and Password are null', () => {

    loginPage.clickLoginButton()
    loginPage.verifyLoginPage()

    // Verify Username textbox
    loginPage.verifyUsernameTextbox(true)
    loginPage.verifyInputErrorMessageOfUsername('Required', true)

    // Verify Password textbox
    loginPage.verifyPasswordTextbox(true)
    loginPage.verifyInputErrorMessageOfPassword('Required', true)
  })

  it('Login Fail with Password are null', () => {
    cy.fixture('users').then((users) => {
      loginPage.enterUsername(users.admin.username)
    })
    loginPage.clickLoginButton()
    loginPage.verifyLoginPage()

    // Verify Username textbox
    loginPage.verifyUsernameTextbox(false)
    // cy.get(':nth-child(2) > .oxd-input-group > .oxd-text').should('not.exist')
    loginPage.verifyInputErrorMessageOfUsername('Required', false)

    // Veirify Password textbox
    loginPage.verifyPasswordTextbox(true)
    loginPage.verifyInputErrorMessageOfPassword('Required', true)
  })

  it('Login Fail with Username are null', () => {
    cy.fixture('users').then((users) => {
      loginPage.enterPassword(users.admin.password)
    })
    loginPage.clickLoginButton()
    loginPage.verifyLoginPage()

    // Verify Username textbox
    loginPage.verifyUsernameTextbox(true)
    loginPage.verifyInputErrorMessageOfUsername('Required', true)

    // Veirify Password textbox
    loginPage.verifyPasswordTextbox(false)
    // cy.get(':nth-child(3) > .oxd-input-group > .oxd-text').should('not.exist')
    loginPage.verifyInputErrorMessageOfPassword('Required', false)
  })


  it('Login Fail with Username and Password are invalid ', () => {
    loginPage.enterUsername('abc')
    loginPage.enterPassword('abc123')
    loginPage.clickLoginButton()
    loginPage.verifyLoginPage()

    // Verify error message
    loginPage.verifyInvalidCredentialsMessage()
  })


  it('Login Success', () => {
    cy.fixture('users').then((users) => {
      loginPage.enterUsername(users.admin.username)
      loginPage.enterPassword(users.admin.password)
    })
    loginPage.clickLoginButton()
    cy.url().should('include', '/dashboard')
  })
})