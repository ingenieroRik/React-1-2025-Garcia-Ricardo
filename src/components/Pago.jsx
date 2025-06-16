import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

function Pago() {
    const location = useLocation();
    const navigate = useNavigate();
    const { name, email, items, total } = location.state || {};
    const [metodo, setMetodo] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');

    const handleMetodoChange = (e) => {
        setMetodo(e.target.value);
        setInputValue('');
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!metodo) {
            setError('Selecciona un método de pago');
            return;
        }
        if (!inputValue.trim()) {
            setError('Completa el campo requerido para el método de pago');
            return;
        }
        
        navigate('/factura', {
            state: {
                nombre: name,
                email,
                items,
                total,
                metodoPago: metodo,
                datoPago: inputValue
            }
        });
    };

    
    let label = '';
    let placeholder = '';
    if (metodo === 'Transferencia bancaria') {
        label = 'Alias o CBU';
        placeholder = 'Ej: mi.alias.banco o 0000000000000000000000';
    } else if (metodo === 'Tarjeta de crédito') {
        label = 'Número de tarjeta';
        placeholder = '5279 2222 3333 4569';
    } else if (metodo === 'MercadoPago') {
        label = 'Alias de MercadoPago';
        placeholder = 'Ej: mi.alias.mp';
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={7} lg={6}>
                    <Card>
                        <Card.Body>
                            <h2 className="mb-4 text-center">Método de Pago</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Selecciona un método de pago:</Form.Label>
                                    <div className="d-flex flex-column gap-2">
                                        <Form.Check
                                            type="radio"
                                            label="Tarjeta de crédito"
                                            name="metodo"
                                            value="Tarjeta de crédito"
                                            checked={metodo === "Tarjeta de crédito"}
                                            onChange={handleMetodoChange}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="MercadoPago"
                                            name="metodo"
                                            value="MercadoPago"
                                            checked={metodo === "MercadoPago"}
                                            onChange={handleMetodoChange}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Transferencia bancaria"
                                            name="metodo"
                                            value="Transferencia bancaria"
                                            checked={metodo === "Transferencia bancaria"}
                                            onChange={handleMetodoChange}
                                        />
                                    </div>
                                </Form.Group>
                                {metodo && (
                                    <Form.Group className="mb-3">
                                        <Form.Label>{label}</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={inputValue}
                                            placeholder={placeholder}
                                            onChange={e => setInputValue(e.target.value)}
                                            autoFocus
                                        />
                                    </Form.Group>
                                )}
                                <div className="d-grid">
                                    <Button type="submit" variant="primary" size="lg">
                                        Aceptar
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Pago;