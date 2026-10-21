import { useState } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';

const formularioInicial = {
  nombre: '',
  email: '',
  telefono: '',
  direccion: '',
  entrega: 'domicilio',
  mensaje: '',
};

// Recibe por props si el carrito está vacío 
const FormularioCompra = ({ carritoVacio, onConfirmar }) => {
  const [form, setForm] = useState(formularioInicial);
  const [errores, setErrores] = useState({});

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });              
    
    if (errores[name]) {
      setErrores({ ...errores, [name]: undefined });
    }
  };

  const validar = () => {
    const nuevosErrores = {};
    if (!form.nombre.trim()) nuevosErrores.nombre = 'Ingresá tu nombre y apellido.';
    if (!form.email.trim()) {
      nuevosErrores.email = 'Ingresá tu email.';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nuevosErrores.email = 'El email no tiene un formato válido (ej: nombre@mail.com).';
    }
    if (!form.telefono.trim()) {
      nuevosErrores.telefono = 'Ingresá un teléfono.';
    } else if (!/^[0-9\s+-]{8,}$/.test(form.telefono)) {
      nuevosErrores.telefono = 'El teléfono tiene que tener al menos 8 números.';
    }
    if (!form.direccion.trim()) nuevosErrores.direccion = 'Ingresá tu dirección o localidad.';
    return nuevosErrores;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (carritoVacio) return;

    const nuevosErrores = validar();
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      onConfirmar(form);
      setForm(formularioInicial);
    }
  };

  return (
    <Form noValidate onSubmit={handleSubmit}>
      {carritoVacio && (
        <Alert variant="warning">
          Tu carrito está vacío. Agregá al menos una remera para poder confirmar la compra.
        </Alert>
      )}

      <Form.Group className="mb-3" controlId="nombre">
        <Form.Label>Nombre y apellido *</Form.Label>
        <Form.Control
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          isInvalid={!!errores.nombre}
          autoComplete="name"
        />
        <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email *</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              isInvalid={!!errores.email}
              autoComplete="email"
            />
            <Form.Control.Feedback type="invalid">{errores.email}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="telefono">
            <Form.Label>Teléfono *</Form.Label>
            <Form.Control
              type="tel"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              isInvalid={!!errores.telefono}
              autoComplete="tel"
            />
            <Form.Control.Feedback type="invalid">{errores.telefono}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3" controlId="direccion">
        <Form.Label>Dirección o localidad *</Form.Label>
        <Form.Control
          name="direccion"
          value={form.direccion}
          onChange={handleChange}
          isInvalid={!!errores.direccion}
          autoComplete="street-address"
        />
        <Form.Control.Feedback type="invalid">{errores.direccion}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="entrega">
        <Form.Label>Método de entrega *</Form.Label>
        <Form.Select name="entrega" value={form.entrega} onChange={handleChange}>
          <option value="domicilio">Envío a domicilio</option>
          <option value="retiro">Retiro en el local</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-4" controlId="mensaje">
        <Form.Label>Mensaje o aclaración (opcional)</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="mensaje"
          value={form.mensaje}
          onChange={handleChange}
          placeholder="Ej: talle, horario de entrega, timbre..."
        />
      </Form.Group>

      <Button type="submit" variant="success" size="lg" className="w-100" disabled={carritoVacio}>
        Confirmar compra
      </Button>
      <small className="text-muted d-block mt-2">* Campos obligatorios</small>
    </Form>
  );
};

export default FormularioCompra;
