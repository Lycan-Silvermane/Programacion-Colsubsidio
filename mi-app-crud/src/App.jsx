import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListaUsuarios from "./components/listaUsuarios";
import FormularioUsuario from "./components/formularioUsuario";
import "./App.css";

function App() {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Kujo Jotaro", correo: "delfinlover@email.com" },
    { id: 2, nombre: "Cujo Jolyne", correo: "hatemydad@email.com" },
    { id: 3, nombre: "Joster Jhonatan", correo: "ohmygod@email.com" },
    { id: 4, nombre: "Joster Jhonny", correo: "ohmygod@email.com" },
  ]);

  const agregarUsuario = (usuario) => {
    setUsuarios([...usuarios, usuario]);
  };

  const actualizarUsuario = (usuarioActualizado) => {
    setUsuarios(
      usuarios.map((u) =>
        u.id === usuarioActualizado.id ? usuarioActualizado : u
      )
    );
  };

  const eliminarUsuario = (id) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar este usuario?");
    if (confirmar) {
      setUsuarios(usuarios.filter((u) => u.id !== id));
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ListaUsuarios
              usuarios={usuarios}
              eliminarUsuario={eliminarUsuario}
            />
          }
        />
        <Route
          path="/crear"
          element={<FormularioUsuario agregarUsuario={agregarUsuario} />}
        />
        <Route
          path="/editar/:id"
          element={
            <FormularioUsuario
              usuarios={usuarios}
              actualizarUsuario={actualizarUsuario}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
