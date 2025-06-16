import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

const MisCompras = () => {
    const [compras, setCompras] = useState([]);
    useEffect(() => {
        const email = localStorage.getItem('currentUserEmail');
        const comprasGuardadas = JSON.parse(localStorage.getItem('compras')) || [];
        // Filtrar solo las compras del usuario logueado
        const comprasUsuario = comprasGuardadas.filter(compra => compra.email === email);
        setCompras(comprasUsuario);
    }, []);
    return (
        <div>
            <h1>Mis Compras</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre de la Foto</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {compras.map((compra, index) => (
                        <tr key={index}>
                            <td>{compra.nombre}</td>
                            <td>{compra.fecha}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default MisCompras;