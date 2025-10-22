import { Link } from "react-router-dom";
import "./listaUsuarios.css";

function ListaUsuarios({ usuarios, eliminarUsuario }) {
  return (
    <div className="container">
      <div className="usersManag">
        <h2>Gestión de Usuarios</h2>
        <Link to="/crear">
          <button className="buttonNewUser">Crear Nuevo Usuario +</button>
        </Link>
      </div>
      <div>
        <ul className="usersList">
          {usuarios.map((usuario) => (
            <li className="buttonList" key={usuario.id}>
              <img
                src={usuario.perfilimg}
                alt={usuario.nombre}
                width="40"
                height="80"
              />
              <strong>{usuario.nombre}</strong> ({usuario.correo}){" "}
              <Link to={`/editar/${usuario.id}`}>
                <button className="buttonEdit">Editar</button>
              </Link>
              <button
                className="buttonDelete"
                onClick={() => eliminarUsuario(usuario.id)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ListaUsuarios;
