

import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
//import Carrito from './pages/Carrito';

function Gallery({ agregarAlCarrito, isLoggedIn, carrito }) { 
    const [fotos, setFotos] = useState([]);

    useEffect(() => {
        const Fotos = async () => {
            try {
                const respuesta = await fetch('https://api-fotos-juli.onrender.com/api/fotos');
                const datos = await respuesta.json();
                setFotos(datos);
            } catch (error) {
                console.error('Error al obtener las fotos:', error);
            }
        };

        Fotos();
    }, []);


    const guardarCompra = (nombre, fecha) => {
        const comprasGuardadas = JSON.parse(localStorage.getItem('compras')) || [];


        
        comprasGuardadas.push({ nombre, fecha });
        localStorage.setItem('compras', JSON.stringify(comprasGuardadas));
    };
/*
    const handleAgregar = (fotoName) => {
        if (isLoggedIn) {
            agregarAlCarrito(fotoName);
             // Guardar la compra en el localStorage
            const fecha = new Date().toLocaleDateString(); // Obtener la fecha actual
            guardarCompra(fotoName, fecha);
            
        } else {
            alert('Debes iniciar sesión para agregar productos al carrito.');
        }
    };
*/
    const handleAgregar = (fotoName) => {
    if (isLoggedIn) {
        // Verifica si la foto ya está en el carrito
        const fotoExistente = carrito.find((foto) => foto.name === fotoName);
        if (fotoExistente) {
            alert("La foto ya está en el carrito");
        } else {
            agregarAlCarrito(fotoName);
            // Guardar la compra en el localStorage
            const fecha = new Date().toLocaleDateString(); // Obtener la fecha actual
            guardarCompra(fotoName, fecha);
        }
    } else {
        alert('Debes iniciar sesión para agregar productos al carrito.');
    }
};


    return (
        <section className="mi-galleryDiv">
            {fotos.map((foto, index) => (
                <div key={index} className="mi-gallery-item">
                    <img
                        src={`https://api-fotos-juli.onrender.com/images/${foto.img}`}
                        alt={foto.name}
                        className="mi-gallery-img"
                        onContextMenu={(e) => e.preventDefault()}
                    />
                    <p>{foto.name}</p>
                    <Button
                        variant="outline-secondary"
                        className="add-to-cart-btn"
                        onClick={() => handleAgregar(foto.name)} 
                    >
                        Agregar al carrito
                    </Button>
                </div>
            ))}
        </section>
    );
}

export default Gallery;

