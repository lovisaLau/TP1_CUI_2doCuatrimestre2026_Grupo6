import { useState } from 'react';
import { Navbar, Nav, Container, Badge, Button, Offcanvas } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CarritoItem from './CarritoItem';
import AvisoCarrito from './AvisoCarrito';
import logo from '../images/logo.png';

export const NavigationBar = () => {
  const navigate = useNavigate();
  const { cart, totalCantidad, totalPrecio } = useCart();

  // El panel lateral ahora es estado local: solo lo abre el botón del carrito
  const [showMiniCart, setShowMiniCart] = useState(false);

  const irA = (ruta) => {
    setShowMiniCart(false);
    navigate(ruta);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center gap-2">
            <img src={logo} alt="" width={40} height={40} />
            Awayi Remeras
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="menu-principal" />
          <Navbar.Collapse id="menu-principal">
            <Nav className="ms-auto align-items-lg-center">
              <Nav.Link as={NavLink} to="/" end>
                Inicio
              </Nav.Link>
              <Nav.Link as={NavLink} to="/productos">
                Productos
              </Nav.Link>
              <Nav.Link as={NavLink} to="/carrito">
                Carrito
              </Nav.Link>
              <Nav.Link as={NavLink} to="/contacto">
                Finalizar compra
              </Nav.Link>

              {/* Botón que abre el mini carrito */}
              <Button
                variant="outline-light"
                className="ms-lg-3 mt-2 mt-lg-0 d-inline-flex align-items-center"
                onClick={() => setShowMiniCart(true)}
                aria-label={`Abrir carrito, ${totalCantidad} productos`}
              >
                🛒
                {totalCantidad > 0 && (
                  <Badge bg="danger" pill className="ms-2">
                    {totalCantidad}
                  </Badge>
                )}
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* MINI CARRITO LATERAL */}
      <Offcanvas show={showMiniCart} onHide={() => setShowMiniCart(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="fw-bold">Tu carrito</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column">
          {cart.length === 0 ? (
            <div className="text-center my-auto py-5">
              <p className="h5 text-muted">El carrito está vacío</p>
              <p className="small text-muted mb-4">Agregá remeras desde el catálogo.</p>
              <Button variant="primary" onClick={() => irA('/productos')}>
                Ver productos
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-grow-1 overflow-auto mb-3">
                {cart.map((item) => (
                  <CarritoItem key={item.id} item={item} compacto />
                ))}
              </div>

              <div className="border-top pt-3 mt-auto">
                <div className="d-flex justify-content-between fs-5 fw-bold mb-3">
                  <span>Total:</span>
                  <span>${totalPrecio.toLocaleString('es-AR')}</span>
                </div>
                <Button variant="success" size="lg" className="w-100 fw-semibold mb-2" onClick={() => irA('/carrito')}>
                  Ver carrito completo
                </Button>
                <Button variant="outline-secondary" className="w-100" onClick={() => setShowMiniCart(false)}>
                  Seguir comprando
                </Button>
              </div>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>

      {/* Aviso flotante al agregar productos */}
      <AvisoCarrito />
    </>
  );
};

export default NavigationBar;