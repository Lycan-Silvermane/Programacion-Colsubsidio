def buscar_mascota(nombre, lista_mascotas):
    for mascota in lista_mascotas:
        if mascota.nombre.lower() == nombre.lower():
            return mascota
    return None