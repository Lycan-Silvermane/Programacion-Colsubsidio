class Libro:
    def __init__(self, titulo, autor, año_publicacion):
        self.titulo = titulo
        self.autor = autor
        self.año_publicacion = año_publicacion
        self.disponible = True # Por defecto, el libro está disponible al ser creado

    def prestar(self):
        if self.disponible:
            self.disponible = False
            print(f"\n'{self.titulo}' ha sido prestado.")
        else:
            print(f"\n'{self.titulo}' no está disponible para préstamo.")
    
    def devolver(self):
        if not self.disponible:
            self.disponible = True
            print(f"\n'{self.titulo}' ha sido devuelto.")
        else:
            print(f"\n'{self.titulo}' ya está disponible.")

    def mostrar_info(self):
        estado = "Disponible" if self.disponible else "No disponible"
        print(f"\nTítulo: {self.titulo}")
        print(f"Autor: {self.autor}")
        print(f"Año de publicación: {self.año_publicacion}")
        print(f"Estado: {estado}")

    def __str__(self):
        return f"'{self.titulo}' por {self.autor} ({self.año_publicacion})"
    
# Crear instancias de la clase Libro
libro1 = Libro("Cien años de soledad", "Gabriel García Márquez", 1967)
libro2 = Libro("1984", "George Orwell", 1949)
libro3 = Libro("Don Quijote de la Mancha", "Miguel de Cervantes", 1605)

print("--- Información inicial de los libros ---")

libro1.mostrar_info()
libro2.mostrar_info()

print("\n--- Prestando libros ---")

libro1.prestar()
libro2.prestar()
libro2.prestar() # Intentar prestar un libro no disponible

print("\n--- Información de los libros después de prestar ---")

libro1.mostrar_info()
libro2.mostrar_info()

print("\n--- Devolviendo libros ---")

libro1.devolver()
libro3.devolver() # Intentar devolver un libro ya disponible

print("\n--- Información final de los libros ---")

libro1.mostrar_info()
libro3.mostrar_info()