import { Container, Row, Col, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductoCard from '../components/ProductoCard';
import { productos } from '../data/productos';
import logo from '../images/logo.png';
import banner1 from '../images/banner-1.png';
import banner2 from '../images/banner-2.png';


// Swiper: carrusel de varios productos a la vez
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const banners = [
  { imagen: banner1, titulo: 'Colección Provincias Argentinas', texto: 'El arte del fileteado porteño con el orgullo de cada provincia.' },
  { imagen: banner2, titulo: 'Remeras 100% algodón', texto: 'Diseños únicos, estampados en serigrafía de alta duración.' },
];


const Inicio = () => {
  const productosDestacados = productos.filter((p) => p.destacado);


  return (
    <>
      {/* --- BANNER SLIDER (React Bootstrap, Clase 6) --- */}
      <Carousel fade interval={5000} className="banner">
        {banners.map((banner) => (
          <Carousel.Item key={banner.titulo}>
            <img className="d-block w-100 banner-imagen" src={banner.imagen} alt="" />
            <Carousel.Caption className="banner-texto">
              <h2 className="fw-bold">{banner.titulo}</h2>
              <p className="d-none d-sm-block">{banner.texto}</p>
              <Button as={Link} to="/productos" variant="light" size="lg">
                Ver colección
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>


      {/* --- PRESENTACIÓN DE LA MARCA --- */}
      <section className="py-5 bg-white">
        <Container>
          <Row className="align-items-center justify-content-center g-4 text-center text-md-start">
            <Col xs={12} md="auto" className="text-center">
              <img src={logo} alt="Logo de Awayi Remeras" width={140} height={140} />
            </Col>
            <Col md={7}>
              <h1 className="fw-bold">Awayi Remeras</h1>
              <p className="lead text-muted mb-0">
                Somos un emprendimiento argentino que lleva el fileteado porteño, Patrimonio
                Cultural de la Humanidad, a remeras de algodón con el nombre de cada provincia.
              </p>
            </Col>
          </Row>
        </Container>
      </section>


      {/* --- BENEFICIOS --- */}
      <section className="py-4 border-top border-bottom">
        <Container>
          <Row className="text-center g-3">
            <Col md={4}>
              <div className="fs-2 mb-2" aria-hidden="true">🚚</div>
              <h2 className="h5 fw-bold">Envíos a todo el país</h2>
              <p className="text-muted small m-0">Recibí tu remera en cualquier punto de Argentina.</p>
            </Col>
            <Col md={4}>
              <div className="fs-2 mb-2" aria-hidden="true">💳</div>
              <h2 className="h5 fw-bold">Pagos flexibles</h2>
              <p className="text-muted small m-0">Tarjetas de crédito, débito y transferencias.</p>
            </Col>
            <Col md={4}>
              <div className="fs-2 mb-2" aria-hidden="true">✨</div>
              <h2 className="h5 fw-bold">Calidad garantizada</h2>
              <p className="text-muted small m-0">Algodón peinado y estampas de alta resistencia.</p>
            </Col>
          </Row>
        </Container>
      </section>


      {/* --- DESTACADOS (Swiper) --- */}
      <Container className="py-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold">Productos destacados</h2>
          <p className="text-muted">Elegí la provincia que más te identifique</p>
        </div>


        <Swiper
          modules={[Navigation, Pagination, A11y]}
          navigation
          pagination={{ clickable: true }}
          a11y={{
            prevSlideMessage: 'Producto anterior',
            nextSlideMessage: 'Producto siguiente',
            paginationBulletMessage: 'Ir al producto {{index}}',
          }}
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1 },
            576: { slidesPerView: 2 },
            992: { slidesPerView: 4 },
          }}
          className="carrusel-destacados"
        >
          {productosDestacados.map((prod) => (
            <SwiperSlide key={prod.id} className="h-auto pb-2">
              <ProductoCard producto={prod} />
            </SwiperSlide>
          ))}
        </Swiper>


        <div className="text-center mt-4">
          <Button as={Link} to="/productos" variant="primary" size="lg">
            Ver todo el catálogo
          </Button>
        </div>
      </Container>
    </>
  );
};


export default Inicio;
