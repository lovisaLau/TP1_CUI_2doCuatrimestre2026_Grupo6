import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

export const BotonIrArriba = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Función que evalúa la posición del scroll
    const manejarScroll = () => {
      // Si bajó más de 300px desde arriba, muestra el botón
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    // Escuchamos el evento scroll de la ventana
    window.addEventListener('scroll', manejarScroll);

    // Limpiamos el evento cuando el componente se desmonta
    return () => window.removeEventListener('scroll', manejarScroll);
  }, []);

  // Función para volver arriba suavemente
  const irArriba = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Hace que el movimiento sea fluido
    });
  };

  if (!visible) return null;

  return (
    <Button
      variant="dark"
      onClick={irArriba}
      className="position-fixed border border-secondary shadow-lg d-flex align-items-center justify-content-center"
      style={{
        bottom: '60px',
        right: '25px',
        zIndex: 1000,
        width: '45px',
        height: '45px',
        borderRadius: '50%',
        fontSize: '1.2rem'
      }}
      aria-label="Volver arriba"
    >
      ↑
    </Button>
  );
};

export default BotonIrArriba;