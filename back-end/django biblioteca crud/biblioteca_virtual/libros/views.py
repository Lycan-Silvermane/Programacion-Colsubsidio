from django.shortcuts import render, redirect, get_object_or_404
from .forms import LibroForm
from .models import Libro
# Create your views here.
def listar_libros(request):
    libros = Libro.objects.all()
    return render(request, 'libros/listar.html',{'libros':libros})

def crear_libro(request):
    form = LibroForm(request.POST or None)
    if form.is_valid():
        form.save()
        return redirect('listar_libros')
    return render(request, 'libros/form.html', {'form': form})

def editar_libro(request, id):
    libro = get_object_or_404(Libro, id=id)
    form = LibroForm(request.POST or None, instance=libro)
    if form.is_valid():
        form.save()
        return redirect('listar_libros')
    return render(request, 'libros/form.html', {'form': form})

def eliminar_libro(request, id):
    libro = get_object_or_404(Libro, id=id)
    libro.delete()
    return redirect('listar_libros')

