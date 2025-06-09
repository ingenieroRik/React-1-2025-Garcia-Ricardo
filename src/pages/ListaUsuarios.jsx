import { Table, Button } from 'react-bootstrap';

function ListaUsuarios({ usuarios, onEdit, onDelete }) 
{
  if (usuarios.length === 0) 
    {
    return <p>No hay productos cargados.</p>;
  }

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
        {usuarios.map(({ id, nombre, email, compras  =[]}) => (
          <tr key={id}>
            <td>{nombre}</td>  
            <td>{email}</td>
            <td>{compras.length}</td>
            <td>
              <Button
                variant="warning"
                size="sm"
                className="me-2"
                onClick={() => onEdit({ id, nombre, email , compras})}
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