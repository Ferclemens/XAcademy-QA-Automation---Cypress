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

  it("4.1.3 - Realizar checkout", () => {
    //logueamos con usuario válido (standard_user)
    cy.login("standard_user", "secret_sauce");
    //cargamos los productos y vamos al detalle del carrito
    cy.agregarProductosEIrAlCarrito();
    //controlamos que exista el título del detalle del carro y cada uno de los productos agregados con sus datos completos.
    cy.get("span.title").contains("Your Cart");
    cy.get("div.cart_item").each(($item) => {
      cy.wrap($item).children("[data-test='item-quantity']");
      cy.wrap($item)
        .children(".cart_item_label")
        .children("a")
        .children("div.inventory_item_name");
      cy.wrap($item)
        .children(".cart_item_label")
        .children("div.inventory_item_desc");
      cy.wrap($item)
        .children(".cart_item_label")
        .children("div.item_pricebar")
        .children(".inventory_item_price");
      cy.wrap($item).children(".cart_item_label").contains("Remove");
    });
    //hacemos click en el boton "Checkout"
    cy.get("#checkout").click();
    //controlamos que vayamos a la dirección de checkout - paso 1
    cy.url().should("eq", "https://www.saucedemo.com/checkout-step-one.html");
    //controlamos que exista el título del checkout
    cy.get("span.title").contains("Checkout: Your Information");
    //buscamos los inputs correspondientes y tipeamos los datos del checkout
    cy.get("input#first-name")
      .should("have.attr", "placeholder", "First Name")
      .type("User");
    cy.get("input#last-name")
      .should("have.attr", "placeholder", "Last Name")
      .type("Standard");
    cy.get("input#postal-code")
      .should("have.attr", "placeholder", "Zip/Postal Code")
      .type("500");
    // hacemos click en continuar al detalle completo del pedido (paso 2 del checkout)
    cy.get("#continue").click();
    cy.url().should("eq", "https://www.saucedemo.com/checkout-step-two.html");
  });

  it("4.1.4 - Validar checkout", () => {
    //logueamos con usuario válido (standard_user)
    cy.login("standard_user", "secret_sauce");
    //cargamos los productos y vamos al detalle del carrito
    cy.agregarProductosEIrAlCarrito();
    //hacemos checkout
    cy.hacerCheckout();
    //controlamos el titulo de la ventana
    cy.get("span.title").contains("Checkout: Overview");
    //controlamos que se muestren las tarjetas de los productos agregados con todos sus datos
    cy.get("div.cart_item").each(($item) => {
      cy.wrap($item).children("[data-test='item-quantity']");
      cy.wrap($item)
        .children(".cart_item_label")
        .children("a")
        .children("div.inventory_item_name");
      cy.wrap($item)
        .children(".cart_item_label")
        .children("div.inventory_item_desc");
      cy.wrap($item)
        .children(".cart_item_label")
        .children("div.item_pricebar")
        .children(".inventory_item_price");
    });
    //controlamos que figure la información de forma de pago
    cy.get("[data-test='payment-info-label']").contains("Payment Information:");
    cy.get("[data-test='payment-info-value']").contains("SauceCard #31337");
    //controlamos que se muestre la información de embarque
    cy.get("[data-test='shipping-info-label']").contains(
      "Shipping Information:"
    );
    cy.get("[data-test='shipping-info-value']").contains(
      "Free Pony Express Delivery!"
    );
    //controlamos que se mueste el subtotal, impuestos y total del pedido
    cy.get("[data-test='total-info-label']").contains("Price Total");
    cy.get("[data-test='subtotal-label']").contains("Item total: $129.94");
    cy.get("[data-test='tax-label']").contains("Tax: $10.40");
    cy.get("[data-test='total-label']").contains("Total: $140.34");
    //hacemos click en finish y controlamos que nos lleve a la ventana de compra finalizada
    cy.get("#finish").click();
    cy.url().should("eq", "https://www.saucedemo.com/checkout-complete.html");
    //controlamos el titulo de la ventana
    cy.get("span.title").contains("Checkout: Complete!");
    //controlamos el mensaje de finalización de compra
    cy.get("h2.complete-header").contains("Thank you for your order!");
    cy.get("div.complete-text").contains(
      "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
    );
    //hacemos click en Back Home
    cy.get("#back-to-products").click();
    cy.url().should("eq", "https://www.saucedemo.com/inventory.html");
    //controlamos que el boton de carro este limpio (sin span)
    cy.get("a.shopping_cart_link").not("span");
  });

  it("4.1.5 - Logout", () => {
    //logueamos con usuario válido (standard_user)
    cy.login("standard_user", "secret_sauce");
    //cargamos los productos y vamos al detalle del carrito
    cy.agregarProductosEIrAlCarrito();
    //hacemos checkout
    cy.hacerCheckout();
    //confirmamos compra
    cy.confirmarCompra();
    //controlamos que exista el título del catálogo
    cy.get("span.title").contains("Products");
    //realizamos logout
    cy.get("#react-burger-menu-btn").click();
    cy.get("#logout_sidebar_link").contains("Logout").click();
    cy.url().should("eq", "https://www.saucedemo.com/");
  });
});

/////////////////////////////////////////////////////////
/////////////// PRUEBAS PROBLEM_URSER //////////////////
/////////////////////////////////////////////////////////
describe("4.2 - Pruebas problem_user", () => {});
