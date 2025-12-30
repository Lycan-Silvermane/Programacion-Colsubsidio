from django.shortcuts import render, get_object_or_404, redirect
from .models import Producto, Venta, Ingrediente, Usuario
from django.contrib.auth.decorators import login_required, user_passes_test
from django.views.generic import (
    ListView, CreateView, UpdateView, DeleteView, DetailView
)
from django.urls import reverse_lazy
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin

def listar_prodctos(request):
    productos = Producto.objects.all()
    return render(request, 'productos/listar.html', {'productos': productos})

def detalle_producto(request, id):
    producto = get_object_or_404(Producto, id=id)
    return render(request, 'productos/detalle.html', {'producto': producto})

@login_required
def vender_producto(request, id):
    producto = get_object_or_404(Producto, id=id)

    for ingrediente in producto.ingredientes.all():
        if ingrediente.inventario <= 0:
            return render(request, 'error.html', {'mensaje': 'Sin inventario'})
        
    for ingrediente in producto.ingredientes.all():
        ingrediente.inventario -= 1
        ingrediente.save()

    Venta.objects.create(
        producto=producto,
        usuario=request.user,
        cantidad=1
        total=producto.precio_publico
    )

    return render(request, 'venta_exitosa.html', {'producto':producto})

def es_empleado(user):
    return user.rol in ['empleado', 'admin']

@user_passes_test(es_empleado)
def crear_ingrediente(request):
    ...

class EmpleadoRequiredMixin(UserPassesTestMixin):
    def test_func(self):
        return self.request.user.rol in ['empleado', 'admin']

class IngredienteListView(LoginRequiredMixin, EmpleadoRequiredMixin, ListView):
    model = Ingrediente
    template_name = 'ingredientes/listar.html'

class IngredienteCreateView(LoginRequiredMixin, EmpleadoRequiredMixin, CreateView):
    model = Ingrediente
    fields = '__all__'
    template_name = 'ingredientes/form.html'
    success_url = reverse_lazy('ingrediente_listar')

class IngredienteUpdateView(LoginRequiredMixin, EmpleadoRequiredMixin, UpdateView):
    model = Ingrediente
    fields = '__all__'
    template_name = 'ingredientes/form.html'
    success_url = reverse_lazy('ingrediente_listar')

class IngredienteDeleteView(LoginRequiredMixin, EmpleadoRequiredMixin, DeleteView):
    model = Ingrediente
    template_name = 'ingredientes/eliminar.html'
    success_url = reverse_lazy('ingrediente_listar')

class ProductoListView(ListView):
    model = Producto
    template_name = 'productos/listar.html'

class ProductoDetailView(DetailView):
    model = Producto
    template_name = 'productos/detalle.html'

class ProductoCreateView(LoginRequiredMixin, EmpleadoRequiredMixin, CreateView):
    model = Producto
    fields = '__all__'
    template_name = 'productos/form.html'
    success_url = reverse_lazy('producto_listar')

class ProductoUpdateView(LoginRequiredMixin, EmpleadoRequiredMixin, UpdateView):
    model = Producto
    fields = '__all__'
    template_name = 'productos/form.html'
    success_url = reverse_lazy('producto_listar')

class ProductoDeleteView(LoginRequiredMixin, EmpleadoRequiredMixin, DeleteView):
    model = Producto
    template_name = 'productos/eliminar.html'
    success_url = reverse_lazy('producto_listar')

def registro(request):
    if request.method == 'POST':
        Usuario.objects.create_user(
            username=request.POST['username'],
            password=request.POST['password'],
            rol='cliente'
        )
        return redirect('login')
    return render(request, 'registration/registro.html')
