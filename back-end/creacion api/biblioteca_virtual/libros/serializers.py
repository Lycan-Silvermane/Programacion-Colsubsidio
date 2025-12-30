from rest_framework import serializers
from .models import Libro

class LibroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Libro
        fields = ['id', 'titulo', 'autor', 'anio_publicacio']

    def validate_anio_publicacion(self, value):
        if value > 2024:
            raise serializers.ValidationError(
                "El año de publicación no puede ser futuro"
            )
        return value
    
    def validate(self, data):
        if len(data['titulo']) < 3:
            raise serializers.ValidationError(
                "El título debe tener al menos 3 caracteres"
            )
        return data