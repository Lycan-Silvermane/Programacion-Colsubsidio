import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListaUsuarios from "./components/listaUsuariosB";
import FormularioUsuario from "./components/formularioUsuarioB";
import imgJotaro from "./assets/jotaro2.jpg";
import imgJolyne from "./assets/jolyne2.jpg";
import imgJonathan from "./assets/jonathan2.jpg";
import imgJohnny from "./assets/johnny2.jpg";

function App() {
  const [usuarios, setUsuarios] = useState([
    {
      id: "delfinlover@email.com",
      perfilimg: imgJotaro,
      nombre: "Kujo Jotaro",
      correo: "delfinlover@email.com",
    },
    {
      id: "hatemydad@email.com",
      perfilimg: imgJolyne,
      nombre: "Cujoh Jolyne",
      correo: "hatemydad@email.com",
    },
    {
      id: "ohmygod@email.com",
      perfilimg: imgJonathan,
      nombre: "Joster Jonathan",
      correo: "ohmygod@email.com",
    },
    {
      id: "gyrooo!!@email.com",
      perfilimg: imgJohnny,
      nombre: "Joster Johnny",
      correo: "gyrooo!!@email.com",
    },
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
