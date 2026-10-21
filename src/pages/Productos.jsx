import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import ProductoCard from '../components/ProductoCard';
import { productos, categorias } from '../data/productos';

// Pasa a minúsculas y saca las tildes, "Río" y "rio" coinciden
const normalizar = (texto) =>
  texto.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

const ordenamientos = {
  az: (a, b) => a.nombre.localeCompare(b.nombre),
  za: (a, b) => b.nombre.localeCompare(a.nombre),
  'precio-menor': (a, b) => a.precio - b.precio,
  'precio-mayor': (a, b) => b.precio - a.precio,
};

export const Productos = () => {
  // Los filtros viven en la URL: /productos?q=rio&categoria=Patagonia&orden=az&stock=1
  const [searchParams, setSearchParams] = useSearchParams();
  const busqueda = searchParams.get('q') ?? '';
  const categoria = searchParams.get('categoria') ?? 'todas';
  const orden = searchParams.get('orden') ?? 'defecto';
  const soloConStock = searchParams.get('stock') === '1';

  const cambiarFiltro = (clave, valor, valorPorDefecto) => {
    const nuevosParametros = new URLSearchParams(searchParams);
    if (valor === valorPorDefecto) {
      nuevosParametros.delete(clave);
    } else {
      nuevosParametros.set(clave, valor);
    }
    setSearchParams(nuevosParametros, { replace: true });
  };

  const limpiarFiltros = () => setSearchParams({}, { replace: true });

  const filtrados = productos
    .filter((p) => normalizar(p.nombre).includes(normalizar(busqueda)))
    .filter((p) => categoria === 'todas' || p.categoria === categoria)
    .filter((p) => !soloConStock || p.stock > 0);

  const productosFiltrados = ordenamientos[orden]
    ? [...filtrados].sort(ordenamientos[orden])
    : filtrados;

  const hayFiltros = searchParams.toString() !== '';

  return (
    <Container className="py-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold display-5 mb-2">Colección Provincias Argentinas</h1>
        <p className="text-muted">
          Remeras 100% algodón estampadas con diseños exclusivos de fileteado porteño.
        </p>
      </div>

      {/* Barra de filtros */}
      <div className="bg-white p-3 rounded shadow-sm border mb-3">
        <Row className="g-3 align-items-end">
          <Col xs={12} lg={4}>
            <Form.Label htmlFor="buscador" className="fw-semibold">Buscar</Form.Label>
            <InputGroup>
              <InputGroup.Text aria-hidden="true">🔍</InputGroup.Text>
              <Form.Control
                id="buscador"
                type="search"
                placeholder="Ej: Mendoza, Córdoba..."
                value={busqueda}
                onChange={(e) => cambiarFiltro('q', e.target.value, '')}
              />
            </InputGroup>
          </Col>
          <Col xs={12} sm={6} lg={3}>
            <Form.Label htmlFor="categoria" className="fw-semibold">Región</Form.Label>
            <Form.Select
              id="categoria"
              value={categoria}
              onChange={(e) => cambiarFiltro('categoria', e.target.value, 'todas')}
            >
              <option value="todas">Todas</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={12} sm={6} lg={3}>
            <Form.Label htmlFor="orden" className="fw-semibold">Ordenar por</Form.Label>
            <Form.Select
              id="orden"
              value={orden}
              onChange={(e) => cambiarFiltro('orden', e.target.value, 'defecto')}
            >
              <option value="defecto">Por defecto</option>
              <option value="az">Nombre (A - Z)</option>
              <option value="za">Nombre (Z - A)</option>
              <option value="precio-menor">Precio: menor a mayor</option>
              <option value="precio-mayor">Precio: mayor a menor</option>
            </Form.Select>
          </Col>
          <Col xs={12} lg={2}>
            <Form.Check
              type="switch"
              id="solo-stock"
              label="Solo con stock"
              checked={soloConStock}
              onChange={(e) => cambiarFiltro('stock', e.target.checked ? '1' : '', '')}
              className="mb-2"
            />
          </Col>
        </Row>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <small className="text-muted" aria-live="polite">
          Mostrando {productosFiltrados.length} de {productos.length} remeras
        </small>
        {hayFiltros && (
          <Button variant="link" size="sm" onClick={limpiarFiltros}>
            Limpiar filtros
          </Button>
        )}
      </div>

      {/* Grilla de productos: el Col va acá y no dentro de la card */}
      <Row className="g-4">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((prod) => (
            <Col key={prod.id} xs={12} sm={6} lg={4} xl={3}>
              <ProductoCard producto={prod} />
            </Col>
          ))
        ) : (
          <Col xs={12} className="text-center py-5">
            <h2 className="h4 text-muted mb-3">No encontramos remeras con esos filtros.</h2>
            <Button variant="outline-dark" onClick={limpiarFiltros}>Limpiar filtros</Button>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Productos;
