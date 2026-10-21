import { Button } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

// Una fila del carrito,  "compacto" es la versión chica del panel lateral
const CarritoItem = ({ item, compacto = false }) => {
    const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
    const subtotal = item.precio * item.cantidad;
    const tamanioImagen = compacto ? 50 : 80;

    return (
        <div className="d-flex align-items-center gap-3 py-3 border-bottom">
        <img
            src={item.imagen}
            alt={item.nombre}
            width={tamanioImagen}
            height={tamanioImagen}
            className="bg-light rounded p-1 flex-shrink-0"
            style={{ objectFit: 'contain' }}
        />

        <div className="flex-grow-1">
            <h6 className="mb-1 fw-bold">{item.nombre}</h6>
            <div className="small text-muted">
            ${item.precio.toLocaleString('es-AR')} por unidad
            </div>

            <div className="d-flex align-items-center gap-2 mt-2">
            <Button
                variant="outline-secondary"
                size="sm"
                aria-label={`Restar una unidad de ${item.nombre}`}
                disabled={item.cantidad <= 1}
                onClick={() => decreaseQuantity(item.id)}
            >
                −
            </Button>
            <span className="fw-bold px-1">{item.cantidad}</span>
            <Button
                variant="outline-secondary"
                size="sm"
                aria-label={`Sumar una unidad de ${item.nombre}`}
                disabled={item.cantidad >= item.stock}
                onClick={() => increaseQuantity(item.id)}
            >
                +
            </Button>
            <Button
                variant="link"
                size="sm"
                className="text-danger ms-auto text-decoration-none"
                aria-label={`Eliminar ${item.nombre} del carrito`}
                onClick={() => removeFromCart(item.id)}
            >
                🗑️ {!compacto && <span className="d-none d-sm-inline">Eliminar</span>}
            </Button>
            </div>

            {/* En celular el subtotal va debajo de los botones */}
            {!compacto && (
            <div className="d-sm-none small mt-2">
                Subtotal: <strong>${subtotal.toLocaleString('es-AR')}</strong>
            </div>
            )}
        </div>

        {/* En pantallas más anchas el subtotal va a la derecha */}
        {!compacto && (
            <div className="d-none d-sm-block text-end flex-shrink-0" style={{ minWidth: '90px' }}>
            <div className="small text-muted">Subtotal</div>
            <div className="fw-bold">${subtotal.toLocaleString('es-AR')}</div>
            </div>
        )}
        </div>
    );
};

export default CarritoItem;