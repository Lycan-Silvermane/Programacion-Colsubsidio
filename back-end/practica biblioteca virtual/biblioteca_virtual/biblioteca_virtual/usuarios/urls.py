from django.urls import path
from . import views


app_name = 'usuarios'

urlpatterns = [
    path('james/<int:gol>/', views.inicio_usuarios, 
         name='inicio'),
    path('lista/', views.listar_usuarios,name="enrique_penalosa"),
    path('registro/', views.registrar_usuario, 
            name='registrar_usuario'),
    path('confirmacion/<int:usuario_id>/', views.confirmacion_usuario, 
            name='antanas_mockus'),
 ]

