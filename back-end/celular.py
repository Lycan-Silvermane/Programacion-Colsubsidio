
class Celular:

    operador = "Claro"

    def __init__(self, pmarca, pmodelo, pcolor, pmemoria, pso, pnum_camaras=0):
        self.marca = pmarca
        self.modelo = pmodelo
        self.color = pcolor
        self.memoria = pmemoria
        self._so = pso 
        self.num_camaras = pnum_camaras
        self.__fotos_tomadas = 0

    def tomar_foto(self):
        self.memoria -= 0.001
        self.__fotos_tomadas +=1

    def __str__(self):
        return f"Este es un {self.marca} {self.modelo}, tiene {self.memoria}, es de color {self.color} ,tiene {self.num_camaras} camaras"
    
    def __eq__(self, other):
        return self.marca == other.marca
    
    @property
    def fotos_tomadas(self):
        return self.__fotos_tomadas
    
    @fotos_tomadas.setter
    def fotos_tomadas(self, nuevas_fotos):
        if nuevas_fotos == 42:
            self.__fotos_tomadas = nuevas_fotos

class Tablet(Celular):
    
    def __init__(self, pmarca, pmodelo, pcolor, pmemoria, pso, ptamanio_pantalla):

        super().__init__(pmarca,pmodelo,pcolor,pmemoria,pso,1)

        self.tamanio_pantalla = ptamanio_pantalla

    def tomar_foto(self):
        super().tomar_foto()
        self.memoria -= 1

    def __str__(self):
        return "Una tablet no respeta a nadie y no da su información"



cel1 = Celular("Samsung","A33","Negro",127,"Android 18",4)
cel2 = Celular("Motorola","A24","Gris",64,"Android 14",3)
cel3 = Celular("Samsung","A50","Azul",64,"Android 12",2)
cel4 = Tablet("Samsung","Tab 7","Gris",256,"Android 10",5)

for i in range(0,750):
    cel2.tomar_foto()

print(cel1 == cel3)

l = [cel1,cel2,cel3,cel4]

print("bienvenido a la tienda de celulares:")
print("tenemos los siguientes celulares")
for indice in range(len(l)):
    cel = l[indice]
    print(f"{indice}. {cel.marca} {cel.modelo}")

seleccion = int(input("¿Sobre cuál quieres saber los detalles?"))

if seleccion in range(len(l)):
    cel = l[seleccion]
    print(cel)


print(cel4.memoria)
for i in range(100):
    cel4.tomar_foto()
print(f"memoria Actual: {cel4.memoria}, fotos tomadas{cel4.fotos_tomadas}")


cel4.fotos_tomadas = 42
print(cel4.fotos_tomadas)

