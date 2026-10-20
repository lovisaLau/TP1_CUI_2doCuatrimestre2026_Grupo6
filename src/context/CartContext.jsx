import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

// Lee el carrito guardado. Si el dato está roto, arranca con el carrito vacío.
const leerCarritoGuardado = () => {
  try {
    const savedCart = localStorage.getItem('carrito_awayi');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(leerCarritoGuardado);

  // Aviso que muestra AvisoCarrito.jsx: { tipo: 'agregado' | 'sin-stock', producto, id }
  const [aviso, setAviso] = useState(null);

  useEffect(() => {
    localStorage.setItem('carrito_awayi', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const enCarrito = cart.find((item) => item.id === product.id);
    const cantidadActual = enCarrito ? enCarrito.cantidad : 0;

    // No deja superar el stock
    if (cantidadActual >= product.stock) {
      setAviso((anterior) => ({ tipo: 'sin-stock', producto: product, id: (anterior?.id ?? 0) + 1 }));
      return;
    }

    setCart((prevCart) => {
      const existe = prevCart.find((item) => item.id === product.id);
      if (existe) {
        // Crea un objeto nuevo en vez de modificar el anterior
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prevCart, { ...product, cantidad: 1 }];
    });

    setAviso((anterior) => ({ tipo: 'agregado', producto: product, id: (anterior?.id ?? 0) + 1 }));
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.cantidad < item.stock
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, cantidad: Math.max(1, item.cantidad - 1) } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalCantidad = cart.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPrecio = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        totalCantidad,
        totalPrecio,
        aviso,
        setAviso,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart tiene que usarse dentro de <CartProvider>');
  }
  return context;
};
