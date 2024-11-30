Feature: Verificar errores de JavaScript en la web

  Scenario: No hay errores de JavaScript al cargar la página
    Given el usuario visita la página de inicio
    Then no debería haber errores de JavaScript
