import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, ListGroup } from 'react-bootstrap';
import { productos } from '../data/productos';
import { useCart } from '../context/CartContext';

export const DetalleProducto = () => {
  const { id } = useParams();
  const { addToCart, cart } = useCart();

  // Buscamos el producto por su id (el parámetro de la URL llega como texto)
  const producto = productos.find((p) => p.id === Number(id));

  if (!producto) {
    return (
      <Container className="py-5 text-center">
        <h1 className="h3 text-muted mb-4">Producto no encontrado</h1>
        <Button as={Link} to="/productos" variant="dark">
          ← Volver al catálogo
        </Button>
      </Container>
    );
  }

  const { nombre, imagen, categoria, precio, descripcion, descripcionLarga, stock, caracteristicas } =
    producto;

  const sinStock = stock === 0;
  const enCarrito = cart.find((item) => item.id === producto.id)?.cantidad ?? 0;
  const llegoAlStock = !sinStock && enCarrito >= stock;

  return (
    <Container className="py-5">
      <Button as={Link} to="/productos" variant="outline-secondary" className="mb-4">
        ← Volver al catálogo
      </Button>

      <Row className="g-4 align-items-center">
        {/* Imagen ampliada */}
        <Col md={6}>
          <Card className="border-0 shadow-sm p-4 text-center bg-white">
            <Card.Img src={imagen} alt={nombre} style={{ maxHeight: '420px', objectFit: 'contain' }} />
          </Card>
        </Col>

        {/* Información del producto */}
        <Col md={6}>
          <Badge bg="dark" className="mb-2 px-3 py-2 fs-6">{categoria}</Badge>
          <h1 className="display-6 fw-bold mb-3">{nombre}</h1>
          <p className="fs-2 fw-bold mb-3">${precio.toLocaleString('es-AR')}</p>
          <p className="text-muted fs-5 mb-4">{descripcionLarga ?? descripcion}</p>

          <div className="mb-4">
            <span className="fw-semibold">Disponibilidad: </span>
            {sinStock ? (
              <Badge bg="danger" className="ms-2">Sin stock</Badge>
            ) : (
              <Badge bg="success" className="ms-2">
                {stock} {stock === 1 ? 'unidad' : 'unidades'}
              </Badge>
            )}
            {enCarrito > 0 && (
              <small className="d-block text-muted mt-2">Ya tenés {enCarrito} en el carrito.</small>
            )}
          </div>

          <Card className="mb-4 bg-light border-0">
            <Card.Header as="h2" className="fs-6 fw-bold bg-transparent border-0 pt-3">
              Características principales
            </Card.Header>
            <ListGroup variant="flush">
              {caracteristicas.map((item) => (
                <ListGroup.Item key={item} className="bg-transparent border-0 py-1 small text-muted">
                  • {item}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>

          <div className="d-grid gap-2 d-md-flex">
            <Button
              variant={sinStock ? 'secondary' : 'primary'}
              size="lg"
              disabled={sinStock || llegoAlStock}
              onClick={() => addToCart(producto)}
              className="fw-semibold px-4"
            >
              {sinStock ? 'Sin stock' : llegoAlStock ? 'Ya tenés todo el stock' : 'Agregar al carrito 🛒'}
            </Button>
            <Button as={Link} to="/carrito" variant="outline-dark" size="lg" className="px-4">
              Ir al carrito
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DetalleProducto;
