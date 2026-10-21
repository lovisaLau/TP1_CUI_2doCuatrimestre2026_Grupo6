import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NoEncontrada = () => {
  return (
    <Container className="py-5 text-center">
      <p className="display-1 fw-bold mb-0">404</p>
      <h1 className="h3 mb-3">No encontramos esta página</h1>
      <p className="text-muted mb-4">Puede que el link esté mal escrito o que la página ya no exista.</p>
      <Button as={Link} to="/" variant="primary">
        Volver al inicio
      </Button>
    </Container>
  );
};

export default NoEncontrada;
