Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    
    cy.get('input[name=firstName]').type('Maria Alice')
    cy.get('input[name=lastName]').type('Guino')
    cy.get('#email').type('maria@gmail.com')        
    cy.get('#open-text-area').type('teste')            
    cy.contains('button[type=submit]', 'Enviar').click()    
})
