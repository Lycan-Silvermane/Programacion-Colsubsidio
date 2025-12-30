from crud import *


def menu():
    while True:
        print("\n###### Menu de la Tienda ######")
        print("1. Mostrar lista de clientes")
        print("2. Mostrar lista de productos")
        print("3. Mostrar lista de ventas")
        print("4. Agregar un cliente")
        print("5. Agregar un producto")
        print("6. Registrar una venta")
        print("7. Actualizar un cliente")
        print("8. Actualizar un producto")
        print("9. Eliminar una venta")
        print("0. Salir")

        opcion = input("Seleccione una opción: ")

        if opcion == "1":
            listar_clientes()
        elif opcion == "2":
            listar_productos()
        elif opcion == "3":
            listar_ventas()
        elif opcion == "4":
            Nombre = input("Nombre: ")
            Correo = input("Correo: ")
            agregar_cliente(Nombre, Correo)
        elif opcion == "5":
            Nombre = input("Nombre: ")
            Precio = int(input("Precio: "))
            Stock = int(input("Stock: "))
            agregar_producto(Nombre, Precio, Stock)
        elif opcion == "6":
            Cliente = int(input("ID del cliente: "))
            Producto = int(input("ID del producto: "))
            Cantidad = int(input("Cantidad: "))
            Fecha_venta = input("Fecha de la venta (AAAA-MM-DD): ")
            registrar_venta(Cliente, Producto, Cantidad, Fecha_venta)
        elif opcion == "7":
            Id_cliente = int(input("ID del cliente: "))
            Nombre = input("Nuevo nombre del cliente: ")
            Correo = input("Nuevo correo del cliente: ")
            actualizar_cliente(Id_cliente, Nombre, Correo)
        elif opcion == "8":
            Id_producto = int(input("ID del producto: "))
            Nombre = input("Nuevo nombre del producto: ")
            Precio = int(input("Nuevo precio: "))
            Stock = int(input("Nuevo Stock: "))
            actualizar_producto(Id_producto, Nombre, Precio, Stock)
        elif opcion == "9":
            Id_venta = int(input("ID de la venta: "))
            eliminar_venta(Id_venta)
        elif opcion == "0":
            print("Cerrando menu")
            break
        else:
            print("Opción no valida")

menu()