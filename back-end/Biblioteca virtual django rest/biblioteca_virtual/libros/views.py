from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Libro
from .serializers import LibroSerializer

# Create your views here.

class HolaAPIView(APIView):
    def get(self, request):
        return Response({"mesaje": "API funcionando"})
    
class LibroViewSet(viewsets.ModelViewSet):
    queryset = Libro.objects.all()
    serializer_class = LibroSerializer