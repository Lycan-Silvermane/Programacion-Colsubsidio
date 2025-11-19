class Mascota:
    
    def __init__(self, nombre: str, especie: str, edad: int, adoptado:bool = False):
        self.nombre = nombre
        self.especie = especie
        self.edad = edad
        self.adoptado = adoptado

    def __str__(self):
        estado = "Adoptado" if self.adoptado else "Disponible"
        return f"Nombre: {self.nombre}\nEdad: {self.edad}\nEspecie: {self.especie}\nEstado: {estado}"