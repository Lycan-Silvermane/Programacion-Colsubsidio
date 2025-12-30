from django.urls import path
from .views import LibroListView
from rest_framework.routers import DefaultRouter
from .views import LibroViewSet

"""urlpatterns = [
    path('libros/', LibroListView.as_view(), name='libro-list'),
]"""

router = DefaultRouter()
router.register(r'libros', LibroViewSet)

urlpatterns = router.urls