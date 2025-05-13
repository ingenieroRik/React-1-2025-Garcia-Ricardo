
import React from 'react';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Carrito() {
    // productos en el carrito
    const cartItems = [
        { id: 1, name: 'Foto 1', price: 10.99, quantity: 2 },
        { id: 2, name: 'Foto 2', price: 15.49, quantity: 1 },
        { id: 3, name: 'Foto 3', price: 7.99, quantity: 3 },
    ];

    // Calcular el total
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <Container className="mt-3">
            <h2 className="text-center mb-4">Carrito de Fotos</h2>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Precio</th>                             
                               
                                <th>Acciones</th> {/* Nueva columna para el botón eliminar */}
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                                               
                                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                                    <td>
                                        <Button variant="danger" size="sm">
                                            Eliminar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col className="text-end">
                    <h4>Total: ${total.toFixed(2)}</h4>
                    <Button variant="success" className="mt-3">Proceder al Pago</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Carrito;