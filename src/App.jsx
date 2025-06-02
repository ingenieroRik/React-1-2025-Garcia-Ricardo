

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import RegistroUsuario from './pages/RegistroUsuario';
import Header from './components/Header';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Carrito from './pages/Carrito';
import Login from './pages/Login';
import RutaProtegida from './components/RutaProtegida';
import UsuariosVentas from './pages/UsuariosVentas';

function App() {

    const eliminarDelCarrito = (fotoName) => {
    if (fotoName === 'CLEAR_ALL') {
        setCarrito([]);
    } else {
        setCarrito((prevCarrito) => prevCarrito.filter((foto) => foto.name !== fotoName));
    }
};

    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    const [usuarios, setUsuarios] = useState([]);

    const registrarUsuario = (nuevoUsuario) => {
    setUsuarios((prev) => [...prev, {...nuevoUsuario, compras: []}]);
       };
    

    const [carrito, setCarrito] = useState([]); 

    /*
    const agregarAlCarrito = (fotoName) => {
        setCarrito((prevCarrito) => [...prevCarrito, { name: fotoName, price: 15500 }]);
    };
*/
    
    const agregarAlCarrito = (fotoName) => {
    // Verificar si la foto ya está en el carrito
    const fotoExistente = carrito.find((foto) => foto.name === fotoName);
    if (fotoExistente) {
        // Si la foto ya está en el carrito, mostrar un alert
        alert("La foto ya está en el carrito");
    } else {
        // Si no está, agregarla al carrito
        setCarrito((prevCarrito) => [...prevCarrito, { name: fotoName, price: 15500 }]);
    }
};


    return (
        <Router>
            <Header cartCount={carrito.length}  isLoggedIn={isLoggedIn}  setIsLoggedIn={setIsLoggedIn}/> {/* Pasa la cantidad de fotos al Header */}
            <Routes>
                <Route path="/" element={<Gallery agregarAlCarrito={agregarAlCarrito} isLoggedIn={isLoggedIn} />} />
                <Route
                        path="/carrito"
                        element={
                    <RutaProtegida isLoggedIn={isLoggedIn}>
                        <Carrito 
                            carrito={carrito} 
                            eliminarDelCarrito={eliminarDelCarrito}
                            usuarios={usuarios}
                            setUsuarios={setUsuarios}
                        
                        />
                    </RutaProtegida>
                    }
                    />
                <Route path="/login" element={<Login usuarios={usuarios} setIsLoggedIn={setIsLoggedIn}/>} />
                <Route path="/registro" element={<RegistroUsuario registrarUsuario={registrarUsuario} usuarios={usuarios} />} />
                <Route 
                    path="/usuarios-ventas" 
                    element={
                            <RutaProtegida isLoggedIn={isLoggedIn}>
                                <UsuariosVentas usuarios={usuarios} />
                            </RutaProtegida>
        } 
    />
</Routes>



            <Footer />
        </Router>
    );
}

export default App;