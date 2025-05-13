import React from 'react';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Carrito({ carrito, eliminarDelCarrito }) { // Recibe el carrito y la función como props
    const total = carrito.reduce((acc, item) => acc + item.price, 0);

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
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carrito.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => eliminarDelCarrito(item.name)} 
                                        >
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
                </Col>
            </Row>
        </Container>
    );
}

export default Carrito;