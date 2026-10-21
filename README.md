# Awayi Remeras - Tienda Online de Indumentaria (UNAHUR)

¡Bienvenido/a al repositorio oficial de Awayi Remeras!

 Este proyecto simula una tienda online y fue desarrollado como Trabajo Práctico para la materia Construcción de Interfaces de Usuario en la Universidad Nacional de Hurlingham (UNAHUR).

La aplicación está inspirada en la cultura e identidad argentinas, y ofrece Provincias Argentinas, la colección exclusiva de la marca Awayi: remeras 100 % algodón con diseños de fileteado porteño dedicados a cada provincia de nuestro país.

## 👥 Integrantes del Equipo

- Miria Silvina Yáñez
- Milagros Carucci
- Marilin Grisafi
- Laura Lovisa

## 🚀 Demo y Enlaces

- Repositorio en GitHub: <https://github.com/lovisaLau/TP1_CUI_2doCuatrimestre2026_Grupo6>
- Deploy en vivo (Netlify): <https://linkdelaura.netlify.app> ATENCIÓN ACÁ

## 🛠️ Tecnologías utilizadas

- **Librería principal:** React 19
- **Herramienta de desarrollo y build:** Vite 8
- **Enrutamiento:** React Router DOM v7
- **Estado global:** Context API (`createContext`, `useContext`) con `useState` y `useEffect`
- **Diseño y estilos:** React Bootstrap / Bootstrap 5 y CSS Modules
- **Componentes de interfaz:** Carousel (banner), Offcanvas (mini carrito) y Toast (avisos) de React Bootstrap
- **Carrusel de productos destacados:** Swiper
- **Persistencia del carrito:** localStorage del navegador
- **Iconos:** react-icons (redes sociales en el pie de la página)

## 📋 Funcionalidades Cumplidas (Requerimientos del TP)

### 1. 🏠 Página de inicio (/)

- **Banner slider:** imágenes de la colección con botón "Ver colección" (Carousel de React Bootstrap).
- **Presentación de la marca:** logo y descripción del emprendimiento.
- **Beneficios:** envíos, medios de pago y calidad.
- **Productos destacados:** carrusel con Swiper que muestra 1, 2 o 4 productos según el tamaño de pantalla.

### 2. 🛍️ Catálogo de productos (/productos)

- **15 remeras** cargadas desde un array de objetos, con nombre, imagen, región, precio, descripción y stock.
- **Tarjetas de producto** con stock visible, etiquetas (Nuevo, Oferta, Más vendido) y botones "Agregar al carrito" y "Ver detalle".
- **Manejo de stock:** si un producto no tiene stock, se muestra "Sin stock" y el botón queda deshabilitado.
- **Buscador por nombre** que ignora tildes (por ejemplo, "rio" encuentra "Río Negro").
- **Filtro por región** (Centro, Cuyo, NOA, NEA, Patagonia) y opción **"Solo con stock"**.
- **Ordenamiento** por nombre (A-Z, Z-A) y por precio (menor a mayor, mayor a menor).
- **Filtros guardados en la URL** con `useSearchParams` (ej: `/productos?categoria=Patagonia&stock=1`): se mantienen al recargar o compartir el link.
- Contador de resultados y botón **"Limpiar filtros"**.

### 3. 🔍 Detalle del producto (/producto/:id)

- **Ruta dinámica:** el producto se obtiene con el parámetro `:id` mediante `useParams`.
- **Información completa:** imagen ampliada, descripción completa, precio, región, stock y características principales.
- **Control de stock:** indica cuántas unidades ya están en el carrito y deshabilita el botón al llegar al stock disponible.
- Botones para volver al catálogo e ir al carrito.

### 4. 🛒 Carrito de compras (/carrito)

- **Estado global con Context API:** el carrito se comparte entre todas las páginas.
- **Mini carrito (Offcanvas):** panel lateral que se abre desde el botón 🛒 de la barra de navegación.
- **Aviso flotante (Toast):** confirma cada producto agregado o avisa si ya no hay más stock.
- **Página del carrito:** nombre, precio por unidad, cantidad, subtotal (precio × cantidad), botones + y – y opción para eliminar cada producto, adaptada a celular.
- **Límite de stock:** no permite agregar más unidades que las disponibles.
- **Resumen:** cantidad total de prendas y total general en pesos.
- Botones "Seguir comprando", "Vaciar carrito" y **"Finalizar compra"**, que lleva al formulario.
- **Persistencia en localStorage:** el carrito se conserva al recargar o cerrar la pestaña.

### 5. 📝 Finalizar compra (/contacto)

- Formulario controlado con useState, onChange y onSubmit.
- Campos: nombre y apellido, email, teléfono, dirección o localidad, método de entrega y mensaje opcional.
- Validaciones: campos obligatorios, formato de email, teléfono de al menos 8 números.
- No permite confirmar si el carrito está vacío.
- Al confirmar, muestra un resumen del pedido (compra simulada) y vacía el carrito.

### 6. 🧭 Navegación

- Barra de navegación responsive con React Router DOM: Inicio, Productos, Carrito y Finalizar compra.
- Página 404 para cualquier dirección que no existe.
- Al cambiar de página, la vista vuelve arriba y se actualiza el título de la pestaña.

## 📁 Estructura del proyecto

```text
src/
├── components/               # Componentes reutilizables
│   ├── AvisoCarrito.jsx          # Aviso flotante (Toast) al agregar productos
│   ├── CambioDeRuta.jsx          # Vuelve arriba y cambia el título al cambiar de página
│   ├── CarritoItem.jsx           # Producto del carrito (versión completa y compacta)
│   ├── Footer.jsx                # Pie de página con links
│   ├── FormularioCompra.jsx      # Formulario controlado con validaciones
│   ├── NavigationBar.jsx         # Barra de navegación + mini carrito (Offcanvas)
│   ├── ProductoCard.jsx          # Tarjeta de producto con stock, etiquetas y botones
│   └── ProductoCard.module.css   # Estilos encapsulados de la tarjeta (CSS Modules)
├── context/
│   └── CartContext.jsx           # Estado global del carrito, sincronizado con localStorage
├── data/
│   └── productos.js              # Array con las 15 remeras
├── images/                   # Imágenes de productos, logo y banners
├── pages/                    # Vistas asociadas a cada ruta
│   ├── Inicio.jsx                # /             Banner, marca, beneficios y destacados
│   ├── Productos.jsx             # /productos    Catálogo con buscador, filtros y orden
│   ├── DetalleProducto.jsx       # /producto/:id Vista individual según el id
│   ├── Carrito.jsx               # /carrito      Detalle del pedido y totales
│   ├── Contacto.jsx              # /contacto     Finalizar compra: formulario y confirmación
│   └── NoEncontrada.jsx          # *             Página 404
├── App.jsx                   # Rutas (Routes / Route) y CartProvider
├── index.css                 # Paleta de colores, tipografías y estilos globales
└── main.jsx                  # Punto de entrada: BrowserRouter y estilos
```

## ⚙️ Instrucciones de Instalación y Ejecución Local

Para ejecutar este proyecto en tu entorno local, sigue estos sencillos pasos:

### 1. Clonar el repositorio

```bash
git clone https://github.com/lovisaLau/TP1_CUI_2doCuatrimestre2026_Grupo6
```

### 2. Ingresar a la carpeta del proyecto

```bash
cd TP1_CUI_2doCuatrimestre2026_Grupo6
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

### 5. Abrir en el navegador

Ingresar a <http://localhost:5173/> (o a la dirección indicada en la terminal) para interactuar con la aplicación.

## 🎓 Universidad Nacional de Hurlingham (UNAHUR)

- **Carrera:** Tecnicatura Universitaria en Programación / Licenciatura en Informática
- **Año:** 2026 2° Cuatrimestre
