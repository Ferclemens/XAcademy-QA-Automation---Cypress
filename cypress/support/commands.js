// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

////////////////////////////////////////////////////////////////////////////////////////////////////

//Logueo válido con standard_user
Cypress.Commands.add("login", (username, password) => {
  cy.visit("https://www.saucedemo.com/");
  cy.get("#user-name").type(username);
  cy.get("#password").type(password);
  cy.get("#login-button").click();
});
//carga de productos al carrito
Cypress.Commands.add("agregarProductosEIrAlCarrito", () => {
  cy.url().should("eq", "https://www.saucedemo.com/inventory.html");
  cy.get(".inventory_item").each(($producto) => {
    cy.wrap($producto).contains("Add to cart").click();
  });
  cy.get("a.shopping_cart_link").click();
  cy.url().should("eq", "https://www.saucedemo.com/cart.html");
});
//checkout
Cypress.Commands.add("hacerCheckout", () => {
  cy.get("#checkout").click();
  cy.url().should("eq", "https://www.saucedemo.com/checkout-step-one.html");
  cy.get("input#first-name")
    .should("have.attr", "placeholder", "First Name")
    .type("User");
  cy.get("input#last-name")
    .should("have.attr", "placeholder", "Last Name")
    .type("Standard");
  cy.get("input#postal-code")
    .should("have.attr", "placeholder", "Zip/Postal Code")
    .type("500");
  cy.get("#continue").click();
  cy.url().should("eq", "https://www.saucedemo.com/checkout-step-two.html");
});
//confirmar checkout
Cypress.Commands.add("confirmarCompra", () => {
  cy.get("#finish").click();
  cy.url().should("eq", "https://www.saucedemo.com/checkout-complete.html");
  cy.get("#back-to-products").click();
  cy.url().should("eq", "https://www.saucedemo.com/inventory.html");
});
