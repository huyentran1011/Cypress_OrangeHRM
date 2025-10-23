import { loginUI } from "../pageUIs/loginUI";

export class LoginPage{

    navigate(url: string){
        cy.visit(url)
    }
    enterUsername(username: string){
        cy.get(loginUI.usernameTextbox).type(username)
    }   
    enterPassword(password: string){
        cy.get(loginUI.passwordTextbox).type(password)
    }
    clickLoginButton(){
        cy.get(loginUI.loginButton).click()
    }

    login(username: string, password: string){
        this.enterUsername(username)
        this.enterPassword(password)
        this.clickLoginButton()
    }
    
    verifyLoginPage(){
        cy.url().should('include', '/login')
    }
    verifyInvalidCredentialsMessage(){
        cy.get(loginUI.errorMessage).should('have.text', 'Invalid credentials')
        .and('have.css', 'color', 'rgb(235, 9, 16)')
        .and('have.css', 'font-size', '14px')
    }

    verifyCompanyLogo(){
          cy.get(loginUI.logoImage).should('be.visible')
            .and('have.css', 'width', '384px')
            .and('have.css', 'max-width', '520px')
            .and('have.css', 'background-color', 'rgb(255, 255, 255)')  
            .and('have.css', 'text-align', 'center')
    }

    verifyLoginTextHeader(textHeader: string){
            cy.get(loginUI.loginTextHeader).should('have.text', textHeader)
                .and('have.css', 'text-align', 'center')
                .and('have.css', 'font-weight', '800')
    }

    verifyUsernameLabel(textLabel: string){
            cy.get(loginUI.usernameLabel)
                .should('have.text', textLabel)
                .and('have.css', 'font-weight', '600')
                .and('have.css', 'font-size', '12px')
                .and('have.css', 'color', 'rgb(100, 114, 140)')
    }

    verifyUsernameTextbox(isInputError: boolean){
        if(isInputError){
            cy.get(loginUI.usernameTextbox).should('be.visible')
                .and('have.attr', 'placeholder', 'Username')
                .and('have.css', 'border-color', 'rgb(235, 9, 16)')
        } else{
            cy.get(loginUI.usernameTextbox).should('be.visible')
                .and('have.attr', 'placeholder', 'Username')
                .and('have.css', 'border-color', 'rgb(232, 234, 239)')
        }
    }


    verifyInputErrorMessageOfUsername(message: string, isDisplayed: boolean){
        if(isDisplayed){
        cy.get(loginUI.username_InputError_Message).should('have.text', message)
        .and('have.css', 'color', 'rgb(235, 9, 16)')
        .and ('have.css', 'font-size', '12px')
        } else{
            cy.get(loginUI.username_InputError_Message, {timeout: 6000}).should('not.exist')
        }
    }

    verifyPasswordLabel(textLabel: string){
            cy.get(loginUI.passwordLabel)
                .should('have.text', textLabel)
                .and('have.css', 'font-weight', '600')
                .and('have.css', 'font-size', '12px')
                .and('have.css', 'color', 'rgb(100, 114, 140)')
    }


    verifyPasswordTextbox(isInputError: boolean){
        if(isInputError){
            cy.get(loginUI.passwordTextbox).should('be.visible')
                .and('have.attr', 'placeholder', 'Password')
                .and('have.css', 'border-color', 'rgb(235, 9, 16)')
        } else{
            cy.get(loginUI.passwordTextbox).should('be.visible')
                .and('have.attr', 'placeholder', 'Password')
                .and('have.css', 'border-color', 'rgb(232, 234, 239)')
        }
    }

    verifyInputErrorMessageOfPassword(message: string, isDisplayed: boolean){
        if(isDisplayed){
            cy.get(loginUI.password_InputError_Message).should('have.text', message)
            .and('have.css', 'color', 'rgb(235, 9, 16)')
            .and ('have.css', 'font-size', '12px')
        } else{
            cy.get(loginUI.password_InputError_Message, {timeout: 6000}).should('not.exist')
        }
    }

    verifyLoginButton(textButton: string){
        cy.get(loginUI.loginButton).should('be.enabled')
        .and('contain', textButton)
        .and('have.css', 'color', 'rgb(255, 255, 255)')
        .and('have.css', 'background-color', 'rgb(255, 123, 29)')
    }
}