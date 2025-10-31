import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FormGroup,
  FormControl,
  Alert,
} from "react-bootstrap";

function FormularioUsuario({ agregarUsuario, usuarios, actualizarUsuario }) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [errorCorreo, setErrorCorreo] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (id && usuarios) {
      const usuario = usuarios.find((u) => u.id === id);
      if (usuario) {
        setNombre(usuario.nombre);
        setCorreo(usuario.correo);
      }
    }
  }, [id, usuarios]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
      setAlertMessage("Todos los campos son obligatorios");
      setShowAlert(true);
      return;
    }

    if (!validateEmail(correo)) {
      setErrorCorreo("Correo inválido");
      return;
    }

    if (id) {
      actualizarUsuario({
        id: id,
        nombre,
        correo,
      });
    } else {
      agregarUsuario({
        id: correo,
        nombre,
        correo,
      });
    }

    navigate("/");
  };

  return (
    <Container className="shadow bg-dark mt-3">
      <Form onSubmit={handleSubmit}>
        <div>
          <h2 className="text-white text-center mt-3">
            {id ? "Editar Usuario" : "Crear Usuario"}
          </h2>
          <Col className="text-end">
            <Link to="/">
              <Button variant="outline-light">{"< Volver"}</Button>
            </Link>
          </Col>
        </div>
        {showAlert && (
          <Alert
            variant="warning"
            onClose={() => setShowAlert(false)}
            dismissible
            className="mt-2"
          >
            {alertMessage}
          </Alert>
        )}
        <Form.Group className="mb-1">
          <div>
            <Form.Label className="mb-1 mt-3 text-white">Nombre:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
        </Form.Group>
        <Form.Group className="mb-2" controlId="formBasicEmail">
          <div>
            <Form.Label className="mb-1 mt-3 text-white">Correo:</Form.Label>
            <Form.Control
              className={`formulario input ${errorCorreo ? "error" : ""}`}
              type="email"
              placeholder="Email"
              value={correo}
              onChange={handleCorreoChange}
            />
            {errorCorreo && <Alert variant="danger">{errorCorreo}</Alert>}
          </div>
          <Button
            className="mt-3 mb-3"
            type="submit"
            variant="primary"
            disabled={!!errorCorreo}
          >
            {id ? "Guardar Cambios" : "Agregar Usuario"}
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default FormularioUsuario;
