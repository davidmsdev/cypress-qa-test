Feature: Verificar que los popups funcionan correctamente

  Scenario: Validar que al hacer clic en todos los enlaces de tipo modal, el popup se abre y cierra correctamente
    Given que visito la página de inicio
    When obtengo todos los enlaces de tipo modal
    Then verifico que cada popup se abre y se cierra correctamente

