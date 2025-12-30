class Cliente:
    def __init__(self, Id_clientes, Nombre, Correo):
        self.id = Id_clientes
        self.nombre = Nombre
        self.correo = Correo

    def __repr__(self):
        return f"Cliente(ID={self.id}, Nombre='{self.nombre}', Correo='{self.correo}')"


class Producto:
    def __init__(self, Id_productos, Nombre, Precio, Stock):
        self.id = Id_productos
        self.nombre = Nombre
        self.precio = Precio
        self.stock = Stock

    def __repr__(self):
        return (f"Producto(ID={self.id}, Nombre='{self.nombre}',"
                f"Precio={self.precio}, Stock={self.stock})")


class Venta:
    def __init__(self, Id_ventas, cliente, producto, Cantidad, Fecha_venta):
        self.Id_ventas = Id_ventas
        self.cliente = cliente
        self.producto = producto
        self.Cantidad = Cantidad
        self.Fecha_venta = Fecha_venta

    def __repr__(self):
        return (f"Venta(ID={self.Id_ventas}, Cliente='{self.cliente}', "
                f"Producto='{self.producto}', Cantidad={self.Cantidad}, Fecha de la venta='{self.Fecha_venta}')")
