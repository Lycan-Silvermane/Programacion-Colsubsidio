import mysql.connector
from mysql.connector import Error

def conectar():
    try:
        conexion = mysql.connector.connect(
            host="localhost",
            user="root",
            password="eldelsurG13*",
            database="tienda",
        )
        return conexion
    except Error as e:
        print("Error al conectar al servidor", e)
        return None