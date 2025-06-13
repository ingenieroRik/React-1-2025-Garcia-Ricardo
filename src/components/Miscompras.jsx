

import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
const MisCompras = () => {
    const [compras, setCompras] = useState([]);
    useEffect(() => {
        // Cargar las compras del localStorage
        const comprasGuardadas = JSON.parse(localStorage.getItem('compras')) || [];
        setCompras(comprasGuardadas);
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