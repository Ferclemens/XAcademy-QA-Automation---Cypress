/////////////////////////////////////////////////////////
/////////////// PRUEBAS STANDARD_URSER //////////////////
/////////////////////////////////////////////////////////
describe("4.1 - Pruebas standard_user", () => {
  it("4.1.1 - Ingreso con credenciales Válidas", () => {
    //visitamos el login de la web (home)
    cy.visit("https://www.saucedemo.com/");
    //controlamos que exista el título
    cy.get(".login_logo").contains("Swag Labs");
    //vemos que existan inputs con sus placeholder y tipeamos usuario y contraseña válidos
    cy.get("input#user-name")
      .should("have.attr", "placeholder", "Username")
      .type("standard_user");
    cy.get("input#password")
      .should("have.attr", "placeholder", "Password")
      .type("secret_sauce");
    //hacemos click en boton para loguear usuario
    cy.get("#login-button").click();
    //nos aseguramos que nos dirija al catálogo de productos
    cy.url().should("eq", "https://www.saucedemo.com/inventory.html");
  });

  it("4.1.2 - Agregar productos al carrito", () => {
    //logueamos con usuario válido (standard_user)
    cy.login("standard_user", "secret_sauce");
    //controlamos que estemos en la url correcta
    cy.url().should("eq", "https://www.saucedemo.com/inventory.html");
    //agregamos cada producto del catálogo al carrito (6 productos)
    cy.get(".inventory_item").each(($producto) => {
      cy.wrap($producto).contains("Add to cart").click();
    });
    //controlamos que el boton "Add to cart" cambio a "Remove" y tiene un borde rojo en cada tarjeta
    cy.get(".inventory_item").each(($producto) => {
      cy.wrap($producto)
        .contains("Remove")
        .should("have.css", "border-color", "rgb(226, 35, 26)");
    });
    //controlamos que en el botón del carrito aparezca un <span> con la cantidad de productos que se agrego (6)
    cy.get("span.shopping_cart_badge").contains("6");
    //hacemos click en el botón y controlamos que nos traslade a la página del detalle del carrito
    cy.get("a.shopping_cart_link").click();
    cy.url().should("eq", "https://www.saucedemo.com/cart.html");
  });

  it("4.1.3 - Realizar checkout");
});
