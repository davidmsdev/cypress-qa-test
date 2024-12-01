Feature: Validar las peticiones de categorías en la home

  Scenario: Validar que al hacer clic en todas las categorías se recibe la respuesta correcta y se comprueba el primer item
    Given visitar la página de inicio
    When obtengo todos los enlaces de las categorías
    Then verifico que la peticion devuelve un 200 y que el primer item de la lista coinicide con la categoria clicada
