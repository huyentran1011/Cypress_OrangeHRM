describe('Query and verify database', () => {
    it('Verify data is existed in the database', () => {
        const sqlQuery = "SELECT * FROM hs_hr_employee WHERE emp_lastname = 'Tran' AND emp_firstname = 'Huyen'";
        cy.task('queryDatabase', { query: sqlQuery }, {timeout: 20000}).then((results: any) => {
            // Print results to the Cypress log
            cy.log('Database query results:', JSON.stringify(results));

            // Assert that at least one record is returned
            expect(results).to.have.length.greaterThan(0);

            // Assert email is correct
            expect(results[0].emp_work_email).to.be.equal('annatran281288@gmail.com');
            expect(results[0].employee_id).to.be.equal('0001');
        });
    });
})