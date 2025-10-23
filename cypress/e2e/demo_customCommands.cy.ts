describe('Demo Custom Commands',() => {
    it('Access OrangeHRM Inc', () =>{
        cy.visit('http://localhost:86/orangehrm5/web/index.php/auth/login')
        cy.clickLinkByText('OrangeHRM, Inc');
    })
})