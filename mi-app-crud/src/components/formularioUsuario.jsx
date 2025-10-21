import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./formularioUsuario.css";

function FormularioUsuario({ agregarUsuario, usuarios, actualizarUsuario }) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [errorCorreo, setErrorCorreo] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id && usuarios) {
      const usuario = usuarios.find((u) => u.id === Number(id));
      if (usuario) {
        setNombre(usuario.nombre);
        setCorreo(usuario.correo);
      }
    }
  }, [id, usuarios]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^s@]+$/;
    return emailRegex.test(email);
  };

  const handleCorreoChange = (e) => {
    const email = e.target.value;
    setCorreo(email);

    if (email && !validateEmail(email)) {
      setErrorCorreo("Correo inválido");
    } else {
      setErrorCorreo("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim() || !correo.trim()) {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (!validateEmail(correo)) {
      setErrorCorreo("Correo inválido");
      return;
    }

    if (id) {
      actualizarUsuario({
        id: Number(id),
        nombre,
        correo,
      });
    } else {
      agregarUsuario({
        id: Date.now(),
        nombre,
        correo,
      });
    }

    navigate("/");
  };

  return (
    <div className="formulario-container">
      <div className="formulario-title">
        <h2>{id ? "Editar Usuario" : "Crear Usuario"}</h2>
        <Link to="/">
          <button className="btn-volver">{"< Volver"}</button>
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="formularioCard">
        <div>
          <label className="formulario label">Nombre:</label>
          <input
            className="formulario input"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label className="formulario label">Correo:</label>
          <input
            className={`formulario input ${errorCorreo ? "error" : ""}`}
            type="email"
            value={correo}
            onChange={handleCorreoChange}
          />
          {errorCorreo && <span className="error-message">{errorCorreo}</span>}
        </div>
        <button
          type="submit"
          className="buttonAddUser"
          disabled={!!errorCorreo}
        >
          {id ? "Guardar Cambios" : "Agregar Usuario"}
        </button>
      </form>
    </div>
  );
}

export default FormularioUsuario;
