from django.urls import path
from . import views

urlpatterns = [
    path('', views.listar_prestamos, name='listar_prestamos'),
    path('crear/', views.crear_prestamo, name='crear_prestamo'),
    path('editar/<int:id>/', views.editar_prestamo, name='editar_prestamo'),
    path('eliminar/<int:id>/', views.eliminar_prestamo, name='eliminar_prestamo'),
]