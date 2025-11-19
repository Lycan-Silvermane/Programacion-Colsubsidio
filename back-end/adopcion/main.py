from models.mascota import Mascota
from models.persona import Adoptante
from models.refugio import Refugio

def main():

    refugio = Refugio()

    refugio.registrar_mascota(Mascota("Lucifer", "Gato", 5))
    refugio.registrar_mascota(Mascota("Canela", "Perro", 14))
    refugio.registrar_mascota(Mascota("Cassiel", "Gato", 4))
    refugio.registrar_mascota(Mascota("Cereza", "Gato", 1))

    adoptante = Adoptante("Stefany", 25)

    while True:
        print("\n---- Menú de adopciones ----")
        print("1. Lista de mascotas disponibles")
        print("2. Adoptar una mascota")
        print("3. Ver las mascotas adoptadas")
        print("4. Salir")
        print("-----------------------------\n")

        opcion = input("Seleccione una opción: ")

        if opcion == "1":
            disponibles = refugio.listar_disponibles()
            if not disponibles:
                print("\nNo hay mascotas disponibles\n")
            else:
                print("\nMascotas disponibles: \n")
                for mas in disponibles:
                    print("*",mas)

        elif opcion == "2":
            nombre = input("\nIngrese el nombre de la mascota que desea adoptar: \n")
            refugio.asignar_adopcion(nombre, adoptante)

        elif opcion == "3":
            if not adoptante.mascotas_adoptadas:
                print("\nAún no has adoptado mascotas\n")
            else:
                print("\nMascotas adoptadas: \n")
                for mascota in adoptante.mascotas_adoptadas:
                    print("*\n", mascota)
        
        elif opcion == "4":
            print("\nSaliendo del menu. Gracias por visitarnos\n")
            break

        else: 
            print("\nOpcion no valida. Por favor intente de nuevo\n")

main()
