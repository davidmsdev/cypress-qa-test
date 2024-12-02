# Prueba QA Engineer

# Instrucciones para ejecutar cada uno de los test
A continuación se detallan los pasos completos para configurar el entorno, descargar el repositorio, instalar las dependencias y ejecutar cada uno de los test de la prueba.

## 1. Instalación de Node.js y npm
### 1.1 Instalar Node.js (y npm)
Node.js incluye npm (Node Package Manager) de forma predeterminada, por lo que solo necesitarás instalar Node.js para tener npm disponible.
### En Windows
Ve a la página oficial de Node.js https://nodejs.org/ y descarga el instalador para Windows.
Ejecuta el instalador y sigue las instrucciones. Esto instalará tanto Node.js como npm.
### En macOS:
Si tienes **Homebrew** instalado, puedes usar el siguiente comando:
```bash
brew install node
```
### En Linux (Ubuntu/Debian):
Para instalar Node.js y npm, ejecuta los siguientes comandos:
```bash
sudo apt update
sudo apt install nodejs
sudo apt install npm
```
### Verificar la instalación
Para confirmar que Node.js y npm se instalaron correctamente, puedes usar los siguientes comandos:
```bash
node -v
npm -v
```
Estos comandos deben devolver la versión que tiene instalada, por ejemplo:
```bash
v20.9.0
```
## 2. Clonar el repositorio
Primero, debes clonar el repositorio en tu máquina local. Abre tu terminal y ejecuta el siguiente comando:

```bash
git clone https://github.com/davidmsdev/cypress-qa-test.git
```
## 3. Navegar al directorio del proyecto
```bash
cd cypress-qa-test
```
## 4. Instalar las dependencias
Una vez dentro del proyecto, instala las dependencias necesarias para ejecutar Cypress y otros paquetes.
Para instalar las dependencias con npm, ejecuta:
```bash
npm install
```
Este paso descargará todas las dependencias necesarias, incluidas las de Cypress.

### 5. Verificar que Cypress está instalado
Asegúrate de que Cypress esté correctamente instalado ejecutando el siguiente comando:
```bash
npx cypress verify
```
Con esto ya tenemos el entorno preparado para poder ejecutar cada uno de los test. En cada caso de prueba se especifica como lanzar ese test en concreto.

# Casos de prueba

### Origen de la Página Web

La página web que se visita en cada test se obtiene desde el entorno de configuración de Cypress:

```javascript
env: {
  ENV_name: 'Test', 
  Test: {
    url: 'https://demoblaze.com/index.html',
  },
}
```

## Case de prueba 2.1: Errores de JavaScript

### Objetivo

El objetivo de este ejercicio es asegurarnos de que no haya errores de JavaScript en la consola cuando se visita la página web especificada. Para ello, he creado un test que intercepta los errores de consola y verifica que no haya mensajes de error, como `Uncaught` o `Error`.

### ¿Qué pasa si no hay errores?

En el caso de que la página visitada no presente errores (como es el caso en la página usada), el test pasará correctamente, ya que no detectará ningún mensaje de error en la consola.

### ¿Cómo verificar que el test falla cuando hay errores?

Si deseas comprobar que el test realmente captura los errores, puedes **forzar** un error en la página para que el test falle y puedas verificar que la lógica funciona correctamente.

#### Forzar un error

Una forma de hacer esto es añadir un código que cause un error explícito en la página.

Puedes agregar el siguiente código en el **Given** del archivo **cypress/support/step_definitions/no-javascript-errors.js** para forzar un error:

   ```javascript
   cy.visit(url).then(() => {
    cy.window().then((window) => {
      // Lanzamos un error de forma explícita
      window.console.error('Este es un error forzado');
      throw new Error('Este es un error forzado');
    });
  });
  ```
De esta forma el test fallará, por lo que comprobamos que funciona correctamente.

### Como ejecutar el test
#### Ejecutar en un navegador específico
- **Chrome:**
  ```bash
  npm run test:no-errors:chrome
  ```
- **Firefox:**
  ```bash
  npm run test:no-errors:firefox
  ```
- **Edge:**
  ```bash
  npm run test:no-errors:edge
  ```
- **Electron:**
  ```bash
  npm run test:no-errors:electron
  ```
- **Todos los navegadores**
  ```bash
  npm run test:no-errors:all
  ```
    Este comando ejecutará las pruebas en el siguiente orden:

    Chrome,
    Firefox,
    Edge,
    Electron

## Case de prueba 2.2: Estados de las páginas
Debido a casuísticas de la web a probar, este caso de prueba se divide en 3 partes:
  1. Se prueban los enlaces de tipo "href" del menú de navegación.
  2. Se prueban los enlaces tipo "modal" del menú de navegación.
  3. Se prueban los enlaces del menú de categorías de la página de inicio.

En cada uno de ellos se validará (si se puede) que recibimos como respuesta códigos de estado 200 o 30x y que no se reciben códigos de estado 40x.

### 2.2.1: Enlaces href
El caso de prueba verifica los códigos de estado HTTP de los enlaces en la página de navegación, asegurándose de que sean válidos (200 o 30x) y no contengan errores 40x.
### Como ejecutar el test
#### Ejecutar en un navegador específico
- **Chrome:**
  ```bash
  npm run test:status-page-links:chrome
  ```
- **Firefox:**
  ```bash
  npm run test:status-page-links:firefox
  ```
- **Edge:**
  ```bash
  npm run test:status-page-links:edge
  ```
- **Electron:**
  ```bash
  npm run test:status-page-links:electron
  ```
- **Todos los navegadores**
  ```bash
  npm run test:status-page-links:all
  ```
    Este comando ejecutará las pruebas en el siguiente orden:

    Chrome,
    Firefox,
    Edge,
    Electron
### 2.2.2: Enlaces de tipo Modal
Este caso de prueba se centra en verificar el comportamiento de los enlaces del menú de navegación que abren modales en la web. El objetivo es asegurarse de que al hacer clic en un enlace de tipo "modal", se abre el modal esperado y se cierra ya que no hay peticiones para poder validar el código de estado.
### Como ejecutar el test
#### Ejecutar en un navegador específico
- **Chrome:**
  ```bash
  npm run test:status-modals-links:chrome
  ```
- **Firefox:**
  ```bash
  npm run test:status-modals-links:firefox
  ```
- **Edge:**
  ```bash
  npm run test:status-modals-links:edge
  ```
- **Electron:**
  ```bash
  npm run test:status-modals-links:electron
  ```
- **Todos los navegadores**
  ```bash
  npm run test:status-modals-links:all
  ```
    Este comando ejecutará las pruebas en el siguiente orden:

    Chrome,
    Firefox,
    Edge,
    Electron

### 2.2.3: Enlaces del menú de categorías
Este caso de prueba valida las llamadas a la API al interactuar con los enlaces de las categorías en la página de inicio. Comprueba que las respuestas tienen un código de estado válido (200 o 30x) y que el primer ítem de la lista devuelta coincide con la categoría seleccionada.

### Como ejecutar el test
#### Ejecutar en un navegador específico
- **Chrome:**
  ```bash
  npm run test:status-categories-links:chrome
  ```
- **Firefox:**
  ```bash
  npm run test:status-categories-links:firefox
  ```
- **Edge:**
  ```bash
  npm run test:status-categories-links:edge
  ```
- **Electron:**
  ```bash
  npm run test:status-categories-links:electron
  ```
- **Todos los navegadores**
  ```bash
  npm run test:status-categories-links:all
  ```
    Este comando ejecutará las pruebas en el siguiente orden:

    Chrome,
    Firefox,
    Edge,
    Electron