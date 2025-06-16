import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const logos = {
    visa: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png",
    mastercard: "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png",
    amex: "https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo_%282018%29.png",
    mercadopago: "https://seeklogo.com/images/M/mercado-pago-logo-0F8A4F7C6D-seeklogo.com.png"
};

function Pago() {
    const location = useLocation();
    const navigate = useNavigate();
    const { name, email, items, total } = location.state || {};
    const [metodo, setMetodo] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');
    const [pagoExitoso, setPagoExitoso] = useState(false);

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
        // Solo validar campo si es tarjeta de crédito
        if (metodo === 'Tarjeta de crédito' && !inputValue.trim()) {
            setError('Completa el número de tarjeta');
            return;
        }
        setPagoExitoso(true);
        setTimeout(() => {
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
        }, 4500);
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={7} lg={6}>
                    <Card className="shadow-lg">
                        <Card.Body>
                            <h2 className="mb-4 text-center">Método de Pago</h2>
                            <div className="d-flex justify-content-center align-items-center mb-4 gap-3">
                                <img src={logos.visa} alt="Visa" height={36} style={{background: "#fff", borderRadius: 8, padding: 4}} />
                                <img src={logos.mastercard} alt="Mastercard" height={36} style={{background: "#fff", borderRadius: 8, padding: 4}} />
                                <img src={logos.amex} alt="American Express" height={36} style={{background: "#fff", borderRadius: 8, padding: 4}} />
                                <img src={logos.mercadopago} alt="Mercado Pago" height={36} style={{background: "#fff", borderRadius: 8, padding: 4}} />
                            </div>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {pagoExitoso && <Alert variant="success" className="text-center fw-bold">¡Pago exitoso!</Alert>}
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
                                {metodo === 'Tarjeta de crédito' && (
                                    <Form.Group className="mb-3">
                                        <Form.Label>Número de tarjeta</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={inputValue}
                                            placeholder="5279 2222 3333 4569"
                                            onChange={e => setInputValue(e.target.value)}
                                            autoFocus
                                        />
                                    </Form.Group>
                                )}
                                <div className="d-grid">
                                    <Button type="submit" variant="success" size="lg">
                                        <span role="img" aria-label="pagar">💳</span> Pagar
                                    </Button>
                                </div>
                            </Form>
                            <div className="text-center mt-4">
                                <span className="fw-bold">Total a pagar: </span>
                                <span className="fs-4 text-primary">${total?.toLocaleString() || '0'}</span>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Pago;