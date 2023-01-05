/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach (() => {
        cy.visit('./src/index.html')
    })        
    
    it('verifica o título da aplicação', function() {        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {   

        const text = 'Lorem Ipsum dolor sit amet, consectetur adipiscing elit'

        cy.get('input[name=firstName]').type('Maria Alice')
        cy.get('input[name=lastName]').type('Guino')
        cy.get('#email').type('maria@gmail.com')        
        cy.get('#open-text-area').type(text, {delay: 0})
            
        cy.contains('button[type=submit]', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function (){         

        cy.get('input[name=firstName]').type('Maria Alice')
        cy.get('input[name=lastName]').type('Guino')
        cy.get('#email').type('mariagmail.com')        
        cy.get('#open-text-area').type('text')
            
        cy.contains('button[type=submit]', 'Enviar').click()        
            cy.get('.error').should('be.visible')
        })

    it('campo telefone permanece vazio caso nao seja inserido um dado numerico ', function () {
        cy.get('#phone')
        .type('abcde')
        .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('input[name=firstName]').type('Maria Alice')
        cy.get('input[name=lastName]').type('Guino')
        cy.get('#email').type('maria@gmail.com')
        cy.get('#phone-checkbox').check()        
        cy.get('#open-text-area').type('Text')
        
            
        cy.contains('button[type=submit]', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('input[name=firstName]')
        .type('Maria Alice')
        .should('have.value', 'Maria Alice')
        .clear()
        .should('have.value', '')

        cy.get('input[name=lastName]')
        .type('Guino')
        .should('have.value', 'Guino')
        .clear()
        .should('have.value', '')

        cy.get('#email')
        .type('maria@gmail.com').
        should('have.value', 'maria@gmail.com')
        .clear()
        .should('have.value', '')

        cy.get('#phone')
        .type('999999999')
        .should('have.value', '999999999')
        .clear()
        .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button[type=submit]', 'Enviar').click()
        cy.get('.error').should('be.visible')

    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })
    
    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[name=atendimento-tat][value=feedback]')
        .check('feedback')
        .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[name=atendimento-tat]')
        .should('have.length', 3)  
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type=checkbox]')
        .should('have.length',2)
        .as('checkboxes')        

        cy.get('@checkboxes')
        .each(function($checkbox) {            
            cy.wrap($checkbox)
            .check().should('be.checked')
            .uncheck().should('not.be.checked')          

        })
        
    })

    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type=file]#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input) {            
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type=file]#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type=file]#file-upload')
        .selectFile('@sampleFile')
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function () {
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.contains('Talking About Testing').should('be.visible')
    })

    
    
})
  
