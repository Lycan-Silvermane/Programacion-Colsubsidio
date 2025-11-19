class Persona:
    
    def __init__(self, nombre: str, edad: int):
        self.nombre = nombre
        self.edad = edad

    def presentarse(self):
        return f"Hola mi nombre es {self.nombre} y tengo {self.edad} años"


class Adoptante(Persona):

    def __init__(self, nombre: str, edad: int):
        super().__init__(nombre, edad)
        self.mascotas_adoptadas = []
    
    def adoptar(self, mascota):
        self.mascotas_adoptadas.append(mascota)
