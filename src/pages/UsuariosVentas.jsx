import React from 'react';
import { Table, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
function UsuariosVentas({ usuarios }) {
    return (
        <Container className="mt-4">
            <h2>Lista de Usuarios y Compras</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Cantidad de Compras</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario, index) => (
                        <tr key={index}>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.compras.length}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}
export default UsuariosVentas;