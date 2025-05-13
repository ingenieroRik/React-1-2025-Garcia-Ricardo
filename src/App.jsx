import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Carrito from './pages/Carrito';
import Login from './pages/Login';

function App() {
    const [carrito, setCarrito] = useState([]); 

    
    const agregarAlCarrito = (fotoName) => {
        setCarrito((prevCarrito) => [...prevCarrito, { name: fotoName, price: 15500 }]);
    };

    
    const eliminarDelCarrito = (fotoName) => {
        setCarrito((prevCarrito) => prevCarrito.filter((foto) => foto.name !== fotoName));
    };

    return (
        <Router>
            <Header cartCount={carrito.length} /> {/* Pasa la cantidad de fotos al Header */}
            <Routes>
                <Route path="/" element={<Gallery agregarAlCarrito={agregarAlCarrito} />} />
                <Route
                    path="/carrito"
                    element={<Carrito carrito={carrito} eliminarDelCarrito={eliminarDelCarrito} />}
                />
                <Route path="/login" element={<Login />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;