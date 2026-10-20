import { Container, Button, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CarritoItem from '../components/CarritoItem';

export const Carrito = () => {
  const { cart, clearCart, totalCantidad, totalPrecio } = useCart();

  // Pantalla cuando el carrito está vacío
  if (cart.length === 0) {
    return (
      <Container className="py-5 text-center">
        <Card className="p-5 border-0 shadow-sm">
          <h1 className="h3 fw-bold mb-3">Tu carrito está vacío 🛒</h1>
          <p className="text-muted mb-4">Aún no agregaste ninguna remera a tu lista.</p>
          <div>
            <Button as={Link} to="/productos" variant="primary" className="fw-semibold px-4 py-2">
              Explorar productos
            </Button>
          </div>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="fw-bold mb-4">Carrito de compras</h1>

      <Row className="g-4">
        {/* Lista de productos agregados */}
        <Col lg={8}>
          <Card className="shadow-sm border-0 px-3 mb-3">
            {cart.map((item) => (
              <CarritoItem key={item.id} item={item} />
            ))}
          </Card>

          <div className="d-flex justify-content-between flex-wrap gap-2">
            <Button as={Link} to="/productos" variant="outline-secondary" className="fw-semibold px-4">
              ← Seguir comprando
            </Button>
            <Button variant="outline-danger" onClick={clearCart}>
              Vaciar carrito
            </Button>
          </div>
        </Col>

        {/* Resumen y totales */}
        <Col lg={4}>
          <Card className="shadow-sm border-0 p-4">
            <h2 className="h4 fw-bold mb-3 border-bottom pb-2">Resumen de compra</h2>

            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Total de prendas:</span>
              <span className="fw-bold">{totalCantidad} u.</span>
            </div>

            <div className="d-flex justify-content-between mb-4 fs-4 fw-bold border-top pt-3">
              <span>Total:</span>
              <span>${totalPrecio.toLocaleString('es-AR')}</span>
            </div>

            <Button as={Link} to="/contacto" variant="success" size="lg" className="w-100 fw-semibold">
              Finalizar compra
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Carrito;