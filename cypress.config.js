const { defineConfig } = require("cypress");

module.exports = defineConfig({
  //solución problema conexión a web externa
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
