from django.contrib.auth.models import AbstractUser
from django.db import models

class Usuario(AbstractUser):
    ROLES = (
        ('admin', 'Administrador'),
        ('empleado', 'Empleado'),
        ('cliente', 'Cliente'),
    )
    rol = models.CharField(max_length=10, choices=ROLES, default='cliente')

class Ingrediente(models.Model):
    TIPO = (
        ('base', 'Base'),
        ('complemento', 'Complemento'),
    )

    nombre = models.CharField(max_length=100)
    precio = models.DecimalField(max_digits=8, decimal_places=2)
    calorias = models.IntegerField()
    inventario = models.IntegerField()
    es_vegetariano = models.BooleanField()
    es_sano = models.BooleanField()
    tipo = models.CharField(max_length=15, choices=TIPO)
    sabor = models.CharField(max_length=50, blank=True, null=True)

    def renovar_inventario(self):
        if self.tipo == 'complemento':
            self.inventario = 0
            self.save()

    def __str__(self):
        return self.nombre
    
class Producto(models.Model):
    TIPO = (
        ('copa', 'Copa'),
        ('malteada', 'Malteada'),
    )

    nombre = models.CharField(max_length=100)
    precio_publico = models.DecimalField(max_digits=8, decimal_places=2)
    tipo = models.CharField(max_length=10, choices=TIPO)
    vaso = models.CharField(max_length=150, blank=True, null=True)
    volumen_onzas = models.IntegerField(blank=True, null=True)
    ingredientes = models.ManyToManyField(Ingrediente, through='ProductoIngrediente')

    def costo(self):
        return sum(i.precio for i in self.ingredientes.all())
    
    def calorias(self):
        return sum(i.calorias for i in self.ingredientes.all())
    
    def rentabilidad(self):
        return self.precio_publico - self.costo()
    
    def __str__(self):
        return self.nombre
    
class ProductoIngrediente(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    ingrediente = models.ForeignKey(Ingrediente, on_delete=models.CASCADE)

class Venta(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    total = models.DecimalField(max_digits=10, decimal_places=2)
    fecha = models.DateTimeField(auto_now_add=True)

