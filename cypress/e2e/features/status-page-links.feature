Feature: Verificar códigos de estado de las páginas

  Scenario: Comprobar que todas las páginas devuelven códigos válidos
    Given visito la página de inicio
    When obtengo todos los enlaces de navegación
    Then verifico que todas las peticiones de cada enlace devuelvan un código de estado 200 o 30x y ninguna 40x
