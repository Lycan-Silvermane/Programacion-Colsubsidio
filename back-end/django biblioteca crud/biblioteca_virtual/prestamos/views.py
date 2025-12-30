from django.shortcuts import render, redirect, get_object_or_404
from  .forms import PrestamoForm
from .models import Prestamo
# Create your views here.

def listar_prestamos(request):
    prestamos = Prestamo.objects.all()
    return render(request, 'prestamos/listar.html', {'prestamos' : prestamos})

def crear_prestamo(request):
    form = PrestamoForm(request.POST or None)
    if form.is_valid():
        form.save()
        return redirect('listar_prestamos')
    return render(request, 'prestamos/form.html', {'form' : form})

def editar_prestamo(request):
    prestamo = get_object_or_404(Prestamo, id=id)
    form = PrestamoForm(request.POST or None, instance=prestamo)
    if form.is_valid():
        form.save()
        return redirect('listar_prestamos')
    return render(request, 'prestamos/form.html', {'form' : form})

def eliminar_prestamo(request, id):
    prestamo = get_object_or_404(Prestamo, id=id)
    prestamo.delete()
    return redirect('listar_prestamos')