///  <reference types="Cypress"/>

import 'cypress-file-upload';
describe('doit faire un test sur le site paruvendu', () =>{
    beforeEach(function() {

        // avant chaque test 
      // Aller sur le site 
        cy.visit(Cypress.env('baseUrl'));
          // API à attendre
    cy.intercept('POST', '/communfo/utilisateurparticulierfo/ajax/acceptercookie').as('acceptercookie'); 
    cy.intercept('GET', '/web/index.php/api/v2/dashboard/employees/subunit').as('subunitEmployees'); 
    cy.intercept('GET', '/web/index.php/api/v2/dashboard/employees/locations').as('locationsEmployees'); 
    cy.intercept('GET', '/web/index.php/api/v2/admin/*').as('admin'); 
    cy.intercept('GET', '/web/index.php/api/v2/pim/*').as('Employees')
    
    cy.intercept('POST', '/web/index.php/events/push').as('eventsPush'); 
   
});
it ('doit consulter le site paruvendu et créer une annonce', () => {

    // Clic sur le btn "Accepter et fermer" pour accepeter les cookies
    cy.get('[onclick="cmp_pv.cookie.saveConsent(true);"]')
    .click()
    .wait('@acceptercookie');

    // Vérif l'onglet "Immobilier"
    cy.get('[title="Immobilier"]')
    .should('contain','Immobilier');

    // Vérif l'onglet "Auto-Moto"
    cy.get('[title="Auto Moto"]')
    .should('contain','Auto-Moto');

    // Vérif l'onglet "Emploi"
    cy.get('#emploi')
    .should('contain','Emploi'); 

    // Vérif l'onglet "Mon débarras"
    cy.get('#bonsplans')
    .should('contain','Mon débarras'); 

     // Vérif l'onglet "animaux"
     cy.get('#animaux')
     .should('contain','Animaux'); 

    // Vérif l'onglet "Services"
    cy.get('[title="Services"]')
    .should('contain','Services'); 

    // Vérif l'onglet "Vacances"
    cy.get('[title="Vacances"]')
    .should('contain','Vacances'); 

    // Vérif l'onglet "Affaires pros"
    cy.get('[ title="Affaires de pros"]')
    .should('contain','Affaires pro'); 

    // Vérif l'onglet "Edito"
     cy.get('#edito')
     .should('contain','Edito'); 
    
    // Vérif et clic sur le btn "Déposez une annonce"
    cy.get('[title="Déposez vos annonces gratuites"]')
    .should('contain','Déposer une annonce gratuite')
    .click();

    // Vérif l'url de la page 
    cy.url('match', 'depose-annonce-gratuite');


    // Vérif le titre de la page 
    cy.get('#accroche-depose')
    .contains('Déposez une annonce gratuite ... et vendez en toute sérénité'); 

    // Vérif le bandeau de la page 
    cy.get('#bandeau')     
    .should('contain','Publiez gratuitement votre annonce en 2 minutes');

    // Clic sur la liste déoulante 
    cy.get('[data-type="1"]')
    .should('contain','Choisissez une catégorie')
    .click(); 

    // Clic sur la sous liste "AUTO-MOTO-BATEAU"
    cy.get('[data-value="V"]')
    .should('contain','AUTO-MOTO-BATEAU')
    .click(); 

    // Clic sur " Voiture de location "
    cy.get('[data-value="VVO00000"]')
    .should('contain','Voiture d\'occasion')
    .click(); 

    // Vérif le champ " Catégorie"
    cy.get('.niv1 ')
    .should('contain','Catégorie');

    // Clic sur le champ "Catégorie"
    cy.get('select[title="Voiture d\'occasion"]')
    .select('Location');

    // Vérif champ "Vous êtes"
    cy.get('#formPro')
    .should('contain','Vous êtes un :');

    // Vérif le bloc"Particulier" 
    cy.get('.rad-part')
    .should('contain','Particulier');

    // Vérif  que le btn radio du particulier est check
    cy.get('#private_ad_id')
    .should('be.checked');

    
    // Vérif le bloc"Professionnel" 
    cy.get('.rad-pro')
    .should('contain','Professionnel');

    // Vérif  que le btn radio du Professionnel n'est pas check
    cy.get('#company_ad_id')
    .should('not.be.checked');

    // Vérif le bloc "Sous rubrique"
    cy.get('#bloc_criteres_specifique_part1')
    .should('contain','Sous rubrique');

    // Vérif la liste déroulante "categorie"
    cy.get('#categorie')
    .should('contain','Choisissez la catégorie')
    .select('Voiture');

   // Vérif le champ 
  cy.get('#pap_auto_descBien')
    .should('contain','Texte de votre annonce');

    // Vérif le texte par ddéfaut 
   cy.get('.pap_immoCONT')
    .should('have.value','Décrivez précisément votre bien, en indiquant son état, ses caractéristiques, ainsi que toute autre information importante pour l\'acquéreur.')
    .type('bla bla bla');

    // Vérif le champ "Prix"
    cy.get('#fldPrix')
    .should('contain','Prix');

    // Vérif que le champ prix est vide
    cy.get('#prix')
    .should('be.empty')
    .click();

    // Laisser quelques champs vides et cliquer sur le btn "Suivant"
    clickSuivant('#suivant1');

    // Vérif la popin "Erreurs detectées"
    cy.get('#popin_erreurSaisie')
    .should('contain','Erreurs détectées')
    .should('contain','Une ou plusieurs erreurs ont été détectées. Merci de vérifier votre saisie.');

    // Vérif l'existance de l'icone "Croix"
    cy.get('.fancybox-close')
      .should('be.exist');

    // Vérif la popin 
    cy.get('.popcpte_suppconfirm')
      .should('contain','Fermer')
      .click();

    // Vérif qle message d'erreur de prix
    cy.get('#prix-error')
      .should('contain','Veuillez saisir un prix de vente pour votre véhicule');

    // Message d'erreur code postale 
    cy.get('[for="codePostal"]')
      .should('contain','Merci de saisir votre code postal');

    // Message d'erreur pour la saisie du ville 
    cy.get('#error_ville')
      .should('contain','Sélectionnez votre ville');

    // Remplir le champ "Prix"
    cy.get('#prix')
      .type('30.20');

      // Vérif que la case "Prix négociable" est décoché 
      cy.get('.check')
      .should('contain','Prix négociable')
      .should('not.be.checked');

      // Cohcher la case "Prix négociable"
      cy.get('[for="flagPrixNegociable"]')
      .eq(0)
      .click();

    // Vérif le champ "Pays" 
    cy.get('#bloc_codePays')
    .should('contain','Pays'); 

    // Vérif que le champ "Pays" est prérempli 
    cy.get('#codePays')
      .should('contain','France');

    // Vérfi le champ "Code postal"
    cy.get('#bloc_codePostal')
      .contains('Code postal');

    // Renseginer le champ "Code postal"et vérifier le remplissage de la ville 

     reseignerCodePostalCheckVille('75012','Paris'); 

     // Modifier le code postalet vérifier le remplissage de la ville 
     reseignerCodePostalCheckVille('69008','Lyon'); 

   // Telecharger une image 
    /* cy.upload_file('CY1.png', 'image/png', '#imgUpload-drop');
     cy.wait(500)
    cy.contains('CY1.png');*/

 // const filePath ='CY1.png';
//cy.get('#imgUpload-drop').attachFile(filePath)

// Clic sur le btn "Suivant"
clickSuivant('#suivant1');

 // Verif  le titre de la page "Vos coordonnées de contact"
 cy.get('.detailEnrichi')
 .should('contain','Vos coordonnées de contact');

 // Clic sur le btn " Suivant" sans remplir les champs 
 clickSuivant('[onclick="validEtape(2);"]');

 // Vérif le message d'erreur "mail"

/*cy.get('#email-error')
  .should('contain','Ce champ est obligatoire');*/
  checkMsgErreur('#email-error');
  // Vérif le message d'erreur 
  /*cy.get()
  .should('contain','Ce champ est obligatoire');*/
  checkMsgErreur('#nom-error');
  // Vérif le message d'erreur 
  /*cy.get('#telephone-errorverif')
  .should('contain','Ce champ est obligatoire');*/
  checkMsgErreur('#telephone-errorverif');
});
});

/**
 *  Remplir le champ "Code Postal" et vérifier que le champ ville sera automatiquement remplis
 * @param {*} codePostal 
 * @param {*} ville 
 */

function reseignerCodePostalCheckVille(codePostal,ville){
     // Renseginer le champ "Code postal"
     cy.get('#codePostal')
     .clear()
     .type(codePostal);

   // Vérif que le champ ville est prérempli 
   cy.get('#codeINSEE')
     .should('contain',ville);
}

/**
 *  Cliquer sur le btn "Suivant"
 * @param {*} classBtn 
 */
function clickSuivant(classBtn){
  cy.get(classBtn)
  .should('contain','Suivant')
  .click();
}

/**
 * Vérifier les messages d'erreus des champs , Email, Nom et téléphone 
 * @param {*} classMsgErreur 
 */
function checkMsgErreur(classMsgErreur){
  
  cy.get(classMsgErreur)
  .should('contain','Ce champ est obligatoire');
}