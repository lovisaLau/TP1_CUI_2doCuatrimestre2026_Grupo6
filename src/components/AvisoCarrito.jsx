import { Toast, ToastContainer } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

const AvisoCarrito = () => {
    const { aviso, setAviso } = useCart();

    if (!aviso) return null;

    const { tipo, producto } = aviso;
    const esSinStock = tipo === 'sin-stock';

    return (
        <ToastContainer position="bottom-end" className="p-3 position-fixed" style={{ zIndex: 1080 }}>
        <Toast
            key={aviso.id}
            show
            onClose={() => setAviso(null)}
            delay={3000}
            autohide
            bg={esSinStock ? 'warning' : 'dark'}
            className={esSinStock ? '' : 'text-white'}
        >
            <Toast.Header>
            <strong className="me-auto">
                {esSinStock ? 'No hay más stock' : '¡Producto agregado!'}
            </strong>
            </Toast.Header>
            <Toast.Body className="d-flex align-items-center gap-3" role="status">
            <img
                src={producto.imagen}
                alt=""
                width={40}
                height={40}
                className="bg-light rounded p-1"
                style={{ objectFit: 'contain' }}
            />
            <div>
                <div className="fw-bold">{producto.nombre}</div>
                <small>
                {esSinStock
                    ? `Ya tenés en el carrito todo el stock disponible (${producto.stock} u.).`
                    : 'Se sumó a tu pedido.'}
                </small>
            </div>
            </Toast.Body>
        </Toast>
        </ToastContainer>
    );
};

export default AvisoCarrito;
