///  <reference types="Cypress"/>

import 'cypress-file-upload';
describe('doit tester les differentes commandes git', () =>{
    beforeEach(function() {

    // avant chaque test 
      // Aller sur le site 
        cy.visit(Cypress.env('baseUrl')); 
})
});