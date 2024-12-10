# XAcademy-QA-Automation---Cypress

QA Automation | Trabajo Final - Plan de pruebas y automatización en https://www.saucedemo.com/

### Instalación del entorno

- Clonar el repositorio https://github.com/Ferclemens/XAcademy-QA-Automation---Cypress.git
- Una vez dentro del proyecto. abrir consola e instalar cypress "npm i cypress"
- Abrimos el proyecto con el comando "npx cypress open"
- Seleccionamos E2E Testing
- Seleccionamos Chrome como navegador y hacemos click en "Start E2E Testing in Chrome"
- Seleccionamos el archivo myTestSaucedemo.cy.js
- La contraseña genérica es muy simple. Si aparece un warning de contraseña insegura solo darle aceptar.

### Recursos

- Plan de pruebas adjunto en el repositorio: "Plan de pruebas saucedemo.xlsx"
- Trello: https://trello.com/invite/b/6752e8386d301c90d599bc74/ATTI9e2ada08dc41b3fc91763f5c122635cbD3422122/xacademy-qa-automation-cypress
- Para la grabación de videos se utilizó la aplicación ScreenPal. Link a la web oficial: https://screenpal.com/

### Challenge - Trabajo Final

1. Generar un plan de pruebas para posteriormente automatizarlo
2. Tener instalado cypress
3. Crear el test “myTestSaucedemo.cy.js”
4. En el siguiente sitio: https://www.saucedemo.com, generar los tests:

4.1 Compra con user 1
4.1.1. Login con el usuario “standard_user”
4.1.2. Agregar los productos al carrito
4.1.3. Hacer el checkout
4.1.4. Validar que se haya realizado el checkout
4.1.5. Realizar el logout

4.2 Compra con user 2
4.2.1. Ingresar con el usuario “problem_user”
4.2.2. Repetir los puntos 4.1.2, 4.1.3, 4.1.4, 4.1.5

5. Utilizar la herramienta de gestión de incidencias Trello y reportar los defectos o mejoras detectadas con la plantilla de incidentes recomendada.
6. Formato de entrega: Subir el trabajo a github y adjuntar el link del repositorio a la entrega.

### Criterios de Evaluación:

##### Aplicar todo lo aprendido

    ○ Comprensión y aplicación: Se evaluará la comprensión y correcta aplicación de los conceptos aprendidos durante el curso.
    ○ Uso de buenas prácticas: El código debe demostrar buenas prácticas en automatización de pruebas.

##### Uso de Herramientas

    ○ Flexibilidad en la elección de herramientas: Los estudiantes pueden utilizar cualquier herramienta adicional que consideren útil para completar el trabajo, además de Cypress.

##### Plan de Pruebas

    ○ Presencia de un plan de pruebas: Es fundamental contar con un plan de pruebas bien denido.
    ○ Claridad y detalle: El plan de pruebas debe ser claro y detallado, con una descripción precisa de los casos de prueba.

##### Automatización de Pruebas

    ○ Cumplimiento de los requisitos: Las pruebas automatizadas deben cumplir con los requisitos especicados en el trabajo final.
    ○ Validaciones y Vericaciones: Las pruebas deben incluir validaciones y vericaciones adecuadas para asegurar que los resultados sean correctos.
