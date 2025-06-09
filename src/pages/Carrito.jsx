import React from 'react';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Carrito({ carrito, eliminarDelCarrito, usuarios, setUsuarios }) {
    const total = carrito.reduce((acc, item) => acc + item.price, 0);
    const navigate = useNavigate();

    const handleCompra = async () => {
        try {
            if (carrito.length === 0) {
                alert('El carrito está vacío');
                return;
            }
            const currentUserEmail = localStorage.getItem('currentUserEmail');
            if (!currentUserEmail) {
                alert('Por favor, inicia sesión para realizar la compra');
                return;
            }
            const usuarioActual = usuarios.find(u => u.email === currentUserEmail);
            if (usuarioActual) {
                const itemsComprados = [...carrito];
                // Registrar la compra en el usuario actual
                const nuevosUsuarios = usuarios.map(u => {
                    if (u.email === usuarioActual.email) {
                        return {
                            ...u,
                            compras: [...(u.compras || []), {
                                fecha: new Date().toISOString(),
                                total: total,
                                items: itemsComprados
                            }]
                        };
                    }
                    return u;
                });
                setUsuarios(nuevosUsuarios);
                eliminarDelCarrito('CLEAR_ALL');
                alert('¡Compra realizada con éxito!');
                navigate('/factura', {
                    state: {
                        name: usuarioActual.nombre || usuarioActual.name,
                        email: usuarioActual.email,
                        items: itemsComprados,
                        total: total
                    },
                });
            }
        } catch (error) {
            console.error('Error durante la compra:', error);
            alert('Hubo un error al procesar la compra');
        }
    };

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
                    <Button 
                        variant="success" 
                        className="mt-2"
                        onClick={handleCompra}
                        disabled={carrito.length === 0}
                    >
                        Comprar
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Carrito;