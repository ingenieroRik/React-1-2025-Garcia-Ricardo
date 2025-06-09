

import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function Gallery({ agregarAlCarrito, isLoggedIn }) { 
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

    const handleAgregar = (fotoName) => {
        if (isLoggedIn) {
            agregarAlCarrito(fotoName);
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

