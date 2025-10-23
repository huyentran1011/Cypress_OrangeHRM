describe('Upload file demo', () =>{
    const uploadFile1 = 'fall-photo.jpg';
    const uploadFile2 = 'spring-photo.jpeg';
    const uploadFile3 = 'winter-photo.jpg';
    it('Upload single file', () => {
        // Access website
        cy.visit('https://filebin.net/');
        // Upload file
        cy.get('#fileField').attachFile(uploadFile1);
        // Verify files are uploaded successfully
        cy.contains(uploadFile1).should('be.visible');
    })

    it('Upload multiple files', () => {
        // Access website
        cy.visit('https://filebin.net/');
        // Upload file
        cy.get('#fileField').attachFile([uploadFile2, uploadFile3]);
        // Verify files are uploaded successfully
        cy.contains(uploadFile2).should('be.visible');
        cy.contains(uploadFile3).should('be.visible');
    })
})
