import React from 'react';
import { Table, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function UsuariosVentas({ usuarios }) {
    // Leer todas las compras del localStorage
    const comprasGuardadas = JSON.parse(localStorage.getItem('compras')) || [];

    // Función para contar compras por email
    const contarComprasPorEmail = (email) => {
        return comprasGuardadas.filter(compra => compra.email === email).length;
    };

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
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.email}</td>
                            <td>{contarComprasPorEmail(usuario.email)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default UsuariosVentas