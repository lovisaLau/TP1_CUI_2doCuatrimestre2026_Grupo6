import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const titulos = {
  '/': 'Inicio',
  '/productos': 'Productos',
  '/carrito': 'Carrito',
  '/contacto': 'Finalizar compra',
};

// sube y cambia el título de la pestaña
const CambioDeRuta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const titulo = pathname.startsWith('/producto/') ? 'Detalle' : titulos[pathname];
    document.title = titulo ? `${titulo} | Awayi Remeras` : 'Awayi Remeras';
  }, [pathname]);

  return null;
};

export default CambioDeRuta;
