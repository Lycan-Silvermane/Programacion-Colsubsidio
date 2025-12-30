from django.urls import path
from .views import *

urlpatterns = [
    path('', listar_prodctos, name='listar_productos'),
    path('producto/<int:id>/', detalle_producto, name='detalle_producto'),
    path('vender/<int:id>/', vender_producto, name='vender_producto'),

    # Ingredientes
    path('ingredientes/', IngredienteListView.as_view(), name='ingrediente_listar'),
    path('ingredientes/nuevo/', IngredienteCreateView.as_view(), name='ingrediente_crear'),
    path('ingredientes/<int:pk>/editar/', IngredienteUpdateView.as_view(), name='ingrediente_editar'),
    path('ingredientes/<int:pk>/eliminar/', IngredienteDeleteView.as_view(), name='ingrediente_eliminar'),

    # Productos
    path('', ProductoListView.as_view(), name='producto_listar'),
    path('producto/<int:pk>/', ProductoDetailView.as_view(), name='producto_detalle'),
    path('producto/nuevo/', ProductoCreateView.as_view(), name='producto_crear'),
    path('producto/<int:pk>/editar/', ProductoUpdateView.as_view(), name='producto_editar'),
    path('producto/<int:pk>/eliminar/', ProductoDeleteView.as_view(), name='producto_eliminar'),

    path('registro/', registro, name='registro'),
]