from .helpers import buscar_mascota

class Refugio:
    
    def __init__(self):
        self.__mascotas = []

    def registrar_mascota(self, mascota):
        self.__mascotas.append(mascota)

    def listar_disponibles(self):
        return [mas for mas in self.__mascotas if not mas.adoptado]
    
    def asignar_adopcion(self, nombre_mascota, adoptante):
        mascota = buscar_mascota(nombre_mascota, self.__mascotas)

        if mascota is None:
            print("No se encontro dicha mascota en el refugio")
            return

        if mascota.adoptado:
            print("Lo sentimos, esa mascota ya fue adoptada")
            return
        
        mascota.adoptado = True
        adoptante.adoptar(mascota)
        print(f"{mascota.nombre} ha sido adoptado por {adoptante.nombre}")