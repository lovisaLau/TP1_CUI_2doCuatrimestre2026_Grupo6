import { useState } from 'react';
import { Container, Row, Col, Card, Button, Alert, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import FormularioCompra from '../components/FormularioCompra';

const Contacto = () => {
  const { cart, totalCantidad, totalPrecio, clearCart } = useCart();
  const [pedido, setPedido] = useState(null);

  
  const confirmarPedido = (datos) => {
    // guardar cantidad y total antes de vaciar el carrito
    setPedido({ ...datos, cantidad: totalCantidad, total: totalPrecio });
    clearCart();
  };

  // Pantalla de confirmación (compra simulada)
  if (pedido) {
    return (
      <Container className="py-5">
        <Alert variant="success" className="p-4 p-md-5 shadow-sm text-center">
          <h1 className="h2 fw-bold mb-3">¡Gracias por tu compra, {pedido.nombre}!</h1>
          <p className="fs-5 mb-2">
            Registramos tu pedido de {pedido.cantidad}{' '}
            {pedido.cantidad === 1 ? 'remera' : 'remeras'} por un total de $
            {pedido.total.toLocaleString('es-AR')}.
          </p>
          <p className="mb-2">
            {pedido.entrega === 'domicilio'
              ? `Lo enviaremos a: ${pedido.direccion}.`
              : 'Te avisaremos cuando esté listo para retirar.'}
          </p>
          <p className="text-muted small">
            Te escribiremos a {pedido.email}. (Compra simulada: no se realizó ningún pago.)
          </p>
          <Button as={Link} to="/productos" variant="dark" className="mt-3 px-4">
            Seguir comprando
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="fw-bold mb-4">Finalizar compra</h1>

      <Row className="g-4">
        <Col lg={7}>
          <Card className="shadow-sm border-0 p-3 p-md-4">
            <h2 className="h4 fw-bold mb-3">Tus datos</h2>
            <FormularioCompra carritoVacio={cart.length === 0} onConfirmar={confirmarPedido} />
          </Card>
        </Col>

        <Col lg={5}>
          <Card className="shadow-sm border-0 p-3 p-md-4">
            <h2 className="h4 fw-bold mb-3">Tu pedido</h2>
            {cart.length === 0 ? (
              <>
                <p className="text-muted">Todavía no agregaste remeras.</p>
                <Button as={Link} to="/productos" variant="primary">
                  Ver productos
                </Button>
              </>
            ) : (
              <>
                <ListGroup variant="flush" className="mb-3">
                  {cart.map((item) => (
                    <ListGroup.Item key={item.id} className="d-flex justify-content-between px-0">
                      <span>
                        {item.nombre} <span className="text-muted">× {item.cantidad}</span>
                      </span>
                      <span className="fw-semibold">
                        ${(item.precio * item.cantidad).toLocaleString('es-AR')}
                      </span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <div className="d-flex justify-content-between fs-5 fw-bold border-top pt-3">
                  <span>Total ({totalCantidad} u.)</span>
                  <span>${totalPrecio.toLocaleString('es-AR')}</span>
                </div>
                <Link to="/carrito" className="small d-inline-block mt-2">
                  Modificar el carrito
                </Link>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contacto;
