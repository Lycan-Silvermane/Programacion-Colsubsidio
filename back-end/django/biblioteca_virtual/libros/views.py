from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

def index(request):
    return HttpResponse("Bienvenido a la biblioteca virtual")

def lista_libros(request):
    return HttpResponse("Aqui se mostraran todos los libros")