from django.shortcuts import render
from rest_framework import viewsets
from .models import Prestamo
from .serializers import PrestamoSerializer 
# Create your views here.

class PrestamoViewSet(viewsets.ModelViewSet):
    queryset = Prestamo.objects.all()
    serializer_class = PrestamoSerializer