Feature: Funcionalidad del carrito de compras

  Scenario: Añadir y eliminar un producto del carrito de compras
    Given navego al sitio web
    When abro el modal de inicio de sesión
    When inicio sesión con credenciales válidas
    Then debería ver el mensaje de bienvenida

    # Añadir productos del JSON al carrito y comprobar el precio total
    Then añado todos los productos al carrito, el carrito debería mostrar los productos correctos, las cantidades correctas y el precio total correcto

    # Eliminar productos uno a uno y comprobar el precio actualizado
    When elimino todos los productos del carrito
    Then el carrito debería estar vacío y el total actualizado correctamente

