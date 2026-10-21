import { useState } from 'react';
import { Container, Row, Col, Nav, Form, Button, Modal, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaXTwitter } from 'react-icons/fa6';

const formularioInicial = {
  nombre: '',
  email: '',
  mensaje: ''
};

export const Footer = () => {
  const [showContacto, setShowContacto] = useState(false);
  const [form, setForm] = useState(formularioInicial);
  const [errores, setErrores] = useState({});
  const [enviadoExito, setEnviadoExito] = useState(false);

  const handleClose = () => {
    setShowContacto(false);
    setErrores({});
    setEnviadoExito(false);
  };
  
  const handleShow = () => setShowContacto(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (errores[name]) {
      setErrores({ ...errores, [name]: undefined });
    }
  };

  const validar = () => {
    const nuevosErrores = {};

    if (!form.nombre.trim()) {
      nuevosErrores.nombre = 'Ingresá tu nombre.';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(form.nombre)) {
      nuevosErrores.nombre = 'El nombre solo debe contener letras.';
    } else if (form.nombre.length > 25) {
      nuevosErrores.nombre = 'El nombre no puede superar los 25 caracteres.';
    }

    if (!form.email.trim()) {
      nuevosErrores.email = 'Ingresá tu email.';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nuevosErrores.email = 'El email no tiene un formato válido (ej: nombre@mail.com).';
    }

    if (!form.mensaje.trim()) {
      nuevosErrores.mensaje = 'Ingresá tu mensaje.';
    } else if (form.mensaje.length > 200) {
      nuevosErrores.mensaje = 'El mensaje no puede superar los 200 caracteres.';
    }

    return nuevosErrores;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevosErrores = validar();
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      setEnviadoExito(true);
      setForm(formularioInicial);
      setTimeout(() => {
        handleClose();
      }, 2000);
    }
  };

  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container>
        <Row className="g-3 align-items-center text-center text-md-start">
          <Col md={4}>
            <p className="mb-1 fw-bold">Awayi Remeras</p>
            <p className="mb-0 small text-white-50">
              Remeras con fileteado porteño de todas las provincias.
            </p>
          </Col>

          <Col md={4}>
            <Nav className="justify-content-center">
              <Nav.Link as={Link} to="/productos" className="text-white">Productos</Nav.Link>
              <Nav.Link as={Link} to="/carrito" className="text-white">Carrito</Nav.Link>
              <Nav.Link onClick={handleShow} className="text-white fw-semibold style-pointer">
                Contacto
              </Nav.Link>
            </Nav>
          </Col>

          <Col md={4} className="text-center text-md-end">
            <span className="d-block small text-white-50 mb-2">Seguinos</span>
            <div className="d-flex justify-content-center justify-content-md-end gap-3 fs-5">
              <a href="https://unahur.edu.ar" target="_blank" rel="noopener noreferrer" className="text-white">
                <FaInstagram />
              </a>
              <a href="https://unahur.edu.ar" target="_blank" rel="noopener noreferrer" className="text-white">
                <FaFacebook />
              </a>
              <a href="https://unahur.edu.ar" target="_blank" rel="noopener noreferrer" className="text-white">
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

      {/* --- PANEL EMERGENTE CENTRADO AL 66% (2/3) DEL ANCHO --- */}
      <Modal
        show={showContacto}
        onHide={handleClose}
        centered
        dialogClassName="modal-dos-tercios"
      >
        <div className="bg-dark text-white p-3 rounded border border-secondary shadow-lg">
          <Modal.Header closeButton closeVariant="white" className="border-0 pb-1">
            <Modal.Title className="fw-bold w-100 text-center fs-5">
              Envianos tu consulta
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="py-2">
            {enviadoExito ? (
              <Alert variant="success" className="text-center m-0 py-2 small">
                ¡Gracias por tu mensaje! Te responderemos a la brevedad.
              </Alert>
            ) : (
              <Form onSubmit={handleSubmit} noValidate>
                <Row className="g-2 mb-2">
                  <Col sm={6}>
                    <Form.Control
                      type="text"
                      name="nombre"
                      placeholder="Nombre (máx 25)"
                      size="sm"
                      value={form.nombre}
                      onChange={handleChange}
                      isInvalid={!!errores.nombre}
                    />
                    <Form.Control.Feedback type="invalid" className="small">
                      {errores.nombre}
                    </Form.Control.Feedback>
                  </Col>

                  <Col sm={6}>
                    <Form.Control
                      type="text"
                      name="email"
                      placeholder="Email"
                      size="sm"
                      value={form.email}
                      onChange={handleChange}
                      isInvalid={!!errores.email}
                    />
                    <Form.Control.Feedback type="invalid" className="small">
                      {errores.email}
                    </Form.Control.Feedback>
                  </Col>
                </Row>

                <Form.Group className="mb-2">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="mensaje"
                    placeholder="Mensaje (máx 200 caracteres)"
                    size="sm"
                    value={form.mensaje}
                    onChange={handleChange}
                    isInvalid={!!errores.mensaje}
                  />
                  <div className="d-flex justify-content-between align-items-center mt-1">
                    <Form.Control.Feedback type="invalid" className="d-block small m-0">
                      {errores.mensaje}
                    </Form.Control.Feedback>
                    <span className="extra-small text-white-50 ms-auto">
                      {form.mensaje.length}/200
                    </span>
                  </div>
                </Form.Group>

                <div className="d-flex justify-content-center gap-2 mt-3">
                  <Button variant="outline-secondary" size="sm" onClick={handleClose} className="text-white">
                    Cancelar
                  </Button>
                  <Button variant="outline-light" size="sm" type="submit">
                    Enviar Consulta
                  </Button>
                </div>
              </Form>
            )}
          </Modal.Body>
        </div>
      </Modal>

      {/* Estilo CSS inyectado para garantizar el ancho exacto de 2/3 (66.6%) */}
      <style>{`
        .modal-dos-tercios {
          width: 66.6vw !important;
          max-width: 750px !important;
          margin: auto !important;
        }
        @media (max-width: 576px) {
          .modal-dos-tercios {
            width: 90vw !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;