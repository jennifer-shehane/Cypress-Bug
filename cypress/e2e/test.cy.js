it('test', () => {
    cy.visit('http://localhost:5173')
    cy.get('button[name="lmpm-wysiwyg_btn_link"]', { timeout: 10000 }).click();
    // comment out these lines below and just click on the URL input field
    // the infinite loop with be seen when you open devTools
    cy.get('wysiwyg-editor').within(() => {
        cy.contains('Add a new link:').parent().parent().within(() => {
            cy.get('input[type="text"]')
                .click()
        })
    })
});