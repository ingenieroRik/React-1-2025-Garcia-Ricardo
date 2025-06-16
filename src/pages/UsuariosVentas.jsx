import React from 'react';
import { Table, Container } from 'react-bootstrap';

function UsuariosVentas({ usuarios }) {
    const comprasGuardadas = JSON.parse(localStorage.getItem('compras')) || [];

    const contarComprasPorEmail = (email) => {
        return comprasGuardadas.filter(compra => 
            (compra.email || '').trim().toLowerCase() === (email || '').trim().toLowerCase()
        ).length;
    };
console.log('Usuarios:', usuarios);



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

export default UsuariosVentas;