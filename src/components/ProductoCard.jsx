import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from './ProductoCard.module.css';

const colorEtiqueta = { Nuevo: 'success', Oferta: 'danger', 'Más vendido': 'warning' };

export const ProductoCard = ({ producto }) => {
  const { addToCart, cart } = useCart();
  const { id, nombre, imagen, categoria, descripcion, precio, stock, etiqueta } = producto;

  const sinStock = stock === 0;
  const enCarrito = cart.find((item) => item.id === id)?.cantidad ?? 0;
  const llegoAlStock = !sinStock && enCarrito >= stock;

  return (
    <Card className={`h-100 shadow-sm border-0 ${styles.card} ${sinStock ? styles.sinStock : ''}`}>
      {/* Etiquetas sobre la imagen */}
      <div className="position-absolute top-0 start-0 m-3 d-flex gap-1">
        <Badge bg="dark">{categoria}</Badge>
        {etiqueta && (
          <Badge bg={colorEtiqueta[etiqueta]} text={etiqueta === 'Más vendido' ? 'dark' : undefined}>
            {etiqueta}
          </Badge>
        )}
      </div>

      <Link to={`/producto/${id}`} className="bg-light text-center p-3 rounded-top">
        <Card.Img
          variant="top"
          src={imagen}
          alt={nombre}
          loading="lazy"
          className={styles.imagen}
        />
      </Link>

      <Card.Body className="d-flex flex-column">
        <Card.Title as="h3" className="fs-5 fw-bold mb-2">
          <Link to={`/producto/${id}`} className="text-decoration-none text-dark">
            {nombre}
          </Link>
        </Card.Title>

        <Card.Text className="text-muted small flex-grow-1">{descripcion}</Card.Text>

        <div className="d-flex justify-content-between align-items-center border-top pt-2 mb-3">
          <span className="fs-5 fw-bold">${precio.toLocaleString('es-AR')}</span>
          {sinStock ? (
            <Badge bg="danger">Sin stock</Badge>
          ) : (
            <small className={stock <= 3 ? 'text-danger fw-semibold' : 'text-muted'}>
              Stock: {stock} u.
            </small>
          )}
        </div>

        <div className="d-grid gap-2">
          <Button
            variant={sinStock ? 'secondary' : 'primary'}
            disabled={sinStock || llegoAlStock}
            onClick={() => addToCart(producto)}
            className="fw-semibold"
          >
            {sinStock ? 'Sin stock' : llegoAlStock ? 'Ya tenés todo el stock' : 'Agregar al carrito 🛒'}
          </Button>
          <Button as={Link} to={`/producto/${id}`} variant="outline-dark">
            Ver detalle
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductoCard;
