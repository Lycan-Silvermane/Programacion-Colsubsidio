import math
import random as r

from clasesitas import Libro
#import clasesitas.libro as l


selogro = False
while  selogro:

    try:
        # Código que podría generar un error
        numero = int(input("Ingrese un número: "))
        resultado = 10 / numero
        print(f"El resultado es: {resultado}")
        selogro = True
    except ValueError:
        # Se ejecuta si ocurre un ValueError
        print("Error: Debe ingresar un número válido")
    except ZeroDivisionError:
        # Se ejecuta si ocurre un ZeroDivisionError
        print("Error: No se puede dividir por cero")
    else:
        print("hola")
        

class TacañoException(Exception):

    def __init__(self, mensaje="No hay dinero para la transacción"):
        super().__init__(self, mensaje)
        self.mensaje = mensaje

    def __str__(self):
        return "Alerta de amarrado: " + self.mensaje
        


def vender_guaro(edad,dinero):
    if edad < 18:
        raise ValueError("Usted no tiene edad para esto")
    if dinero < 20000:
        raise TacañoException("Usted no tiene suficiente dinero para la media")
    return "OK"

selogro = False
plata = 1000
while not selogro:
    try:
        x = vender_guaro(18,plata)
        print(x)
        selogro = True
    except TacañoException as e:
        plata+=10000
        print(e)
        print("dejeme le presto")
    except Exception as e:
        print(e)
        selogro = True


l1 = Libro("La Biblia","Dios",80,"NA")
print(l1.año_publicacion)