import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';

function UsuarioForm({ onSubmit, usuarioAEditar, onCancel }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [errores, setErrores] = useState([]);

  useEffect(() => {
    if (usuarioAEditar) {
      setNombre(usuarioAEditar.nombre);
      setEmail(usuarioAEditar.email)
      setErrores([]);
    } else {
      setNombre('');
      setEmail('');
      setErrores([]);
    }
  }, [usuarioAEditar]);

  const validar = () => {
    const erroresValidacion = [];
    if (!nombre.trim()) {
      erroresValidacion.push('El nombre no puede estar vacío.');
    }
    if (!email.trim() || !email.includes('@')) {
      erroresValidacion.push('El email no es válido.');
    }
    setErrores(erroresValidacion);
    return erroresValidacion.length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validar()) return;

    const usuario = {
      nombre: nombre.trim(),
      email: email.trim(),
    };

    if (usuarioAEditar) {
      usuario.id = usuarioAEditar.id; 
    }

    onSubmit(usuario);

    if (!usuarioAEditar) {
      setNombre('');
      setEmail('');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {errores.length > 0 && (
        <Alert variant="danger">
          <ul>
            {errores.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </Alert>
      )}

      <Form.Group as={Row} className="mb-3" controlId="nombre">
        <Form.Label column sm={2}>Nombre</Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            placeholder="Nombre del usuario"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="precio">
        <Form.Label column sm={2}>email</Form.Label>
        <Col sm={10}>
          <Form.Control
            type="email"
            placeholder="email del usuario"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
           
          />
        </Col>
      </Form.Group>

      <Button variant="primary" type="submit" className="me-2">
        {usuarioAEditar ? 'Actualizar' : 'Agregar'}
      </Button>

      {usuarioAEditar && (
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      )}
    </Form>
  );
}

export default UsuarioForm;