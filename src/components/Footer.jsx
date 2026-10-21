import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaXTwitter } from 'react-icons/fa6';

export const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container>
        <Row className="g-3 align-items-center text-center text-md-start">
          {/* Información del sitio */}
          <Col md={4}>
            <p className="mb-1 fw-bold">Awayi Remeras</p>
            <p className="mb-0 small text-white-50">
              Remeras con fileteado porteño de todas las provincias.
            </p>
          </Col>

          {/* Navegación interna */}
          <Col md={4}>
            <Nav className="justify-content-center">
              <Nav.Link as={Link} to="/productos" className="text-white">Productos</Nav.Link>
              <Nav.Link as={Link} to="/carrito" className="text-white">Carrito</Nav.Link>
              <Nav.Link as={Link} to="/contacto" className="text-white">Finalizar compra</Nav.Link>
            </Nav>
          </Col>

          {/* Redes Sociales - Links a UNAHUR */}
          <Col md={4} className="text-center text-md-end">
            <span className="d-block small text-white-50 mb-2">Seguinos</span>
            <div className="d-flex justify-content-center justify-content-md-end gap-3 fs-5">
              <a 
                href="https://unahur.edu.ar" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white text-decoration-none"
                title="Instagram UNAHUR"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://unahur.edu.ar" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white text-decoration-none"
                title="Facebook UNAHUR"
              >
                <FaFacebook />
              </a>
              <a 
                href="https://unahur.edu.ar" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white text-decoration-none"
                title="X UNAHUR"
              >
                <FaXTwitter />
              </a>
            </div>
          </Col>
        </Row>

        <hr className="border-secondary my-3" />

        <p className="mb-0 small text-center text-white-50">
          © {new Date().getFullYear()} Awayi Remeras · Trabajo práctico de Construcción de
          Interfaces de Usuario (UNAHUR)
        </p>
      </Container>
    </footer>
  );
};

export default Footer;