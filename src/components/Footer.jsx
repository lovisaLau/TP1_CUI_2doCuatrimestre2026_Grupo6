import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container>
        <Row className="g-3 align-items-center text-center text-md-start">
          <Col md={6}>
            <p className="mb-1 fw-bold">Awayi Remeras</p>
            <p className="mb-0 small text-white-50">
              Remeras con fileteado porteño de todas las provincias.
            </p>
          </Col>
          <Col md={6}>
            <Nav className="justify-content-center justify-content-md-end">
              <Nav.Link as={Link} to="/productos" className="text-white">Productos</Nav.Link>
              <Nav.Link as={Link} to="/carrito" className="text-white">Carrito</Nav.Link>
              <Nav.Link as={Link} to="/contacto" className="text-white">Finalizar compra</Nav.Link>
            </Nav>
          </Col>
        </Row>
        <hr className="border-secondary" />
        <p className="mb-0 small text-center text-white-50">
          © {new Date().getFullYear()} Awayi Remeras · Trabajo práctico de Construcción de
          Interfaces de Usuario (UNAHUR)
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
