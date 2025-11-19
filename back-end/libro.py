class Libro:

    def __init__(self, titulo, autor, año_publicacion, isbn):
        self.titulo = titulo
        self.autor = autor
        self.año_publicacion = año_publicacion
        self._disponible = True 
        self._isbn = isbn
        self._veces_prestado = 0

    @property
    def disponible(self):
        return self._disponible
    
    @property
    def isbn(self):
        return self._isbn

    def prestar(self):
        """
        Presta un libro solo si está disponible
        Si está disponible aumenta las veces prestadas y lo coloca como no disponible
        Retorna True si se pudo prestar y False de lo contrario
        """
        if self._disponible:
            self._disponible = False
            self._veces_prestado+=1
            return True
        return False
    
    def devolver(self):
        if not self._disponible:
            self._disponible = True
            return True
        return False
    
    def mostrar_info(self):
        estado = "Disponible" if self._disponible else "No disponible"
        print(f"Título: {self.titulo}")
        print(f"Autor: {self.autor}")
        print(f"Año de publicación: {self.año_publicacion}")
        print(f"Estado: {estado}")
    
    def __str__(self):
        return f"'{self.titulo}' por {self.autor} ({self.año_publicacion})"
    
    def __eq__(self,otro):
        return isinstance(otro,Libro) and self._isbn == otro.isbn

class LibroFisico(Libro):
    def __init__(self, titulo, autor, año_publicacion, isbn, ubicacion, estado_fisico="Bueno"):
        super().__init__(titulo, autor, año_publicacion, isbn)
        self.ubicacion = ubicacion  # Ej: "Estante A-3"
        self.estado_fisico = estado_fisico
    
    def mostrar_info(self):
        estado = "Disponible" if self._disponible else "Prestado"
        return f"{self} - Ubicación: {self.ubicacion}, Estado: {estado}, Condición: {self.estado_fisico}"


class LibroDigital(Libro):
    def __init__(self, titulo, autor, año_publicacion, isbn, formato, tamaño_mb):
        super().__init__(titulo, autor, año_publicacion, isbn)
        self.formato = formato  # Ej: "PDF", "EPUB"
        self.tamaño_mb = tamaño_mb
        self._descargas_simultaneas = 0
        self._max_descargas = 3
    
    def prestar(self):
        if self._descargas_simultaneas < self._max_descargas:
            self._descargas_simultaneas += 1
            self._veces_prestado += 1
            return True
        return False
    
    def devolver(self):
        if self._descargas_simultaneas > 0:
            self._descargas_simultaneas -= 1
            return True
        return False
    
    def mostrar_info(self):
        return f"{self} - Formato: {self.formato}, Tamaño: {self.tamaño_mb}MB, Descargas: {self._descargas_simultaneas}/{self._max_descargas}"

libro1 = LibroFisico("Cien años de soledad", "Gabriel García Márquez", 1967,"978-84-376-0494-7","Estante A-3")
libro2 = LibroDigital("1984", "George Orwell", 1949, "978-0-452-28423-4", "PDF", 2.5)

ll = [libro1, libro2]

for libro in ll:
    libro.mostrar_info()
    if libro.prestar():
       print(f"{libro} prestado exitosamente")
    else:
        print(f" No se pudo prestar {libro}")
 # Comparar libros usando __eq__
 
libro_fisico2 = LibroDigital("20 poemas de amor y una canción desesperada", "Pablo Neruda", 2000, "978-84-356-0494-7", "EPUB",10)
print(f"¿Son el mismo libro? {libro1 == libro_fisico2}")  # True (mismo ISBN)
   

libro1.prestar()
libro2.prestar()

libro1.devolver()
libro2.devolver()

