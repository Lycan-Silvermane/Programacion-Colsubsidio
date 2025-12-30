from database import conectar
from models import Cliente, Producto, Venta

#listar BD

def listar_clientes():
    """Funcion para mostrar un listado de los clientes"""
    conexion = conectar()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("SELECT * FROM clientes")
    todos_clientes = cursor.fetchall()

    clientes = [Cliente(**c) for c in todos_clientes]

    for cliente in clientes:
        print(cliente)
    conexion.close()

def listar_productos():
    """Funcion para mostrar un listado de los productos"""
    conexion = conectar()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("SELECT * FROM productos")
    todos_productos = cursor.fetchall()

    productos = [Producto(**p) for p in todos_productos]

    for producto in productos:
        print(producto)
    conexion.close()

def listar_ventas():
    """Funcion para mostrar un listado de las ventas"""
    conexion = conectar()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("""
        SELECT 
            v.Id_ventas,
            c.Nombre AS cliente,
            p.Nombre AS producto,
            v.Cantidad, 
            v.Fecha_venta
        FROM ventas v
        JOIN clientes c ON v.Id_cliente = c.Id_clientes
        JOIN productos p ON v.Id_producto = p.Id_productos
    """)

    todas_ventas = cursor.fetchall()

    ventas = [
        Venta(
            Id_ventas=v['Id_ventas'],
            cliente=v['cliente'],
            producto=v['producto'],
            Cantidad=v['Cantidad'],
            Fecha_venta=v['Fecha_venta']
        )
        for v in todas_ventas 
    ]

    for venta in ventas:
        print(venta)
    conexion.close()

#Agregar elemento

def agregar_cliente(Nombre, Correo):
    """Funcion para agregar un nuevo cliente"""
    conexion = conectar()
    cursor = conexion.cursor()
    cursor.execute("INSERT INTO clientes (Nombre, Correo) VALUES (%s,%s)", (Nombre, Correo))
    conexion.commit()
    print("Cliente agregado exitosamente")
    conexion.close()

def agregar_producto(Nombre, Precio, Stock):
    """Funcion para agregar un nuevo producto"""
    conexion = conectar()
    cursor = conexion.cursor()
    cursor.execute("INSERT INTO productos (Nombre, Precio, Stock) VALUES (%s,%s,%s)", (Nombre, Precio, Stock))
    conexion.commit()
    print("Producto agregado exitosamente")
    conexion.close()

#Registrar una venta

def registrar_venta(Id_cliente, Id_producto, Cantidad, Fecha_venta):
    conexion = conectar()
    cursor = conexion.cursor()

    cursor.execute("""
        INSERT INTO ventas (Id_cliente, Id_producto, Cantidad, Fecha_venta)
        VALUES (%s,%s,%s,%s)
    """, (Id_cliente, Id_producto, Cantidad, Fecha_venta))

    cursor.execute("""
        UPDATE productos SET Stock = Stock - %s WHERE Id_productos = %s
    """, (Cantidad, Id_producto))
    conexion.commit()
    print("Venta registrada exitosamente")
    conexion.close()

#Actualizar

def actualizar_cliente(Id_clientes, Nombre, Correo):
    """Funcion para actualizar info. de un cliente"""
    conexion = conectar()
    cursor = conexion.cursor()
    cursor.execute("UPDATE clientes SET Nombre=%s, Correo=%s WHERE Id_clientes=%s",(Nombre, Correo, Id_clientes))
    conexion.commit()
    print("Cliente actualizado exitosamente")
    conexion.close()

def actualizar_producto(Id_productos, Nombre, Precio, Stock):
    """Funcion para actualizar info. de un producto"""
    conexion = conectar()
    cursor = conexion.cursor()
    cursor.execute("UPDATE productos SET Nombre=%s, Precio=%s, Stock=%s WHERE Id_productos=%s", (Nombre, Precio, Stock, Id_productos))
    conexion.commit()
    print("Producto actualizado exitosamente")
    conexion.close()

#Eliminar venta

def eliminar_venta(Id_venta):
    """Funcion para eliminar una venta"""
    conexion = conectar()
    cursor = conexion.cursor()

    cursor.execute("SELECT * FROM ventas WHERE Id_ventas = %s", (Id_venta,))
    venta = cursor.fetchone()

    if not venta:
        print("La venta no existe")
        return
    print("Venta eliminada: ", venta)
    cursor.execute("DELETE FROM ventas WHERE Id_ventas=%s", (Id_venta,))
    conexion.commit()
    print("Venta eliminada exitosamente")
    conexion.close()