from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Libro

class LibroListView(APIView):
    def get(self, request):
        libros = Libro.objects.all()
        libros_data = []
        for libro in libros:
            libros_data.append({
            'id': libro.id,
            'titulo': libro.titulo,
            'autor': libro.autor,
            'anio_publicacion': libro.anio_publicacion
            })
        return Response(libros_data)
    
    def post(self, request):
# Extraer datos de la petición
        titulo = request.data.get('titulo')
        autor = request.data.get('autor')
        anio_publicacion = request.data.get('anio_publicacion')
# Validación básica
        if not all([titulo, autor, anio_publicacion]):
            return Response(
            {'error': 'Todos los campos son requeridos'},
            status=status.HTTP_400_BAD_REQUEST
        )
# Crear libro
        libro = Libro.objects.create(
            titulo=titulo,
            autor=autor,
            anio_publicacion=anio_publicacion
        )
        return Response({
            'id': libro.id,
            'titulo': libro.titulo,
            'autor': libro.autor
            }, status=status.HTTP_201_CREATED)
    
from rest_framework import viewsets
from .serializers import LibroSerializer

class LibroViewSet(viewsets.ModelViewSet):
    queryset = Libro.objects.all()
    serializer_class = LibroSerializer