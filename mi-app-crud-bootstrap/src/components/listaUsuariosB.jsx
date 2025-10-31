import { Link } from "react-router-dom";
import { Col, Card, CardBody, Button, Container, Row } from "react-bootstrap";

function ListaUsuarios({ usuarios, eliminarUsuario }) {
  return (
    <Container
      className="mt-4 p-4 rounded-4"
      style={{
        backgroundColor: "rgb(33, 37, 41, 0.75)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255, 0.1)",
      }}
    >
      <Row variant="light" className=" align-items-center mb-3">
        <Col xs={4}></Col>
        <Col xs={4} className="text-center">
          <h2 className="text-white">Gestión de Usuarios</h2>
        </Col>
        <Col xs={4} className="text-end">
          <Link to="/crear">
            <Button variant="secondary" className="buttonNewUser">
              Crear Nuevo Usuario
            </Button>
          </Link>
        </Col>
      </Row>
      <Row className="g-3 justify-content-center">
        {usuarios.map((usuario) => (
          <Col
            xs={12}
            md={6}
            key={usuario.id}
            className="d-flex justify-content-center"
          >
            <Card
              className="shadow border-4 border-secondary bg-white bg-opacity-50 backdrop-blur text-center mb-3"
              style={{ maxWidth: "350px", width: "100%" }}
            >
              <Card.Img
                variant="top"
                src={usuario.perfilimg}
                alt={usuario.nombre}
                style={{
                  height: "140px",
                  objectFit: "contain",
                  backgroundColor: "#f8f9fa",
                }}
              />
              <CardBody>
                <strong>{usuario.nombre}</strong>
                <p className="text-muted">({usuario.correo})</p>
                <div className="d-flex justify-content-center gap-2">
                  <Link to={`/editar/${usuario.id}`}>
                    <Button variant="primary">Editar</Button>
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => eliminarUsuario(usuario.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ListaUsuarios;
