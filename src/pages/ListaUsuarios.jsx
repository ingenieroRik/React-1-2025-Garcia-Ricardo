import { Table, Button } from 'react-bootstrap';

function ListaUsuarios({ usuarios, onEdit, onDelete }) {
  if (usuarios.length === 0) {
    return <p>No hay productos cargados.</p>;
  }

  // Lee las compras del localStorage
  const comprasGuardadas = JSON.parse(localStorage.getItem('compras')) || [];

  // Cuenta compras por email
  const contarComprasPorEmail = (email) => {
    return comprasGuardadas.filter(compra => 
      (compra.email || '').trim().toLowerCase() === (email || '').trim().toLowerCase()
    ).length;
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>email</th>
          <th>cantidad de Compras</th>
          <th style={{ width: '150px' }}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map(({ id, nombre, email }) => (
          <tr key={id}>
            <td>{nombre}</td>
            <td>{email}</td>
            <td>{contarComprasPorEmail(email)}</td>
            <td>
              <Button
                variant="warning"
                size="sm"
                className="me-2"
                onClick={() => onEdit({ id, nombre, email })}
              >
                Editar
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(id)}
              >
                Borrar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ListaUsuarios;