from django.urls import path
from .views import HolaAPIView
from rest_framework.routers import DefaultRouter
from .views import LibroViewSet

urlpatterns = [
    path('hola/', HolaAPIView.as_view())
]

router = DefaultRouter()
router.register(r'libros', LibroViewSet)

urlpatterns = router.urls
