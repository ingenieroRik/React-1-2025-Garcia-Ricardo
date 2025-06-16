import React, { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

// Componente para mostrar la imagen en un canvas
function ImagenDesdeAPI({ imageUrl, alt, width = 300, height = 400 }) {
  const canvasRef = useRef();

  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.src = imageUrl;

    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;
      // Dibuja la imagen escalada al tamaño fijo
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
    };
  }, [imageUrl, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ maxWidth: '100%', display: 'block', margin: '0 auto', background: '#eee' }}
      aria-label={alt}
      onContextMenu={e => e.preventDefault()}
    />
  );
}

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
        const email = localStorage.getItem('currentUserEmail');
        const comprasGuardadas = JSON.parse(localStorage.getItem('compras')) || [];
        comprasGuardadas.push({ nombre, fecha,email });
        localStorage.setItem('compras', JSON.stringify(comprasGuardadas));
    };

    const handleAgregar = (foto) => {
        if (isLoggedIn) {
            const fotoExistente = carrito.find((item) => item.id === foto.id);
            if (fotoExistente) {
                alert("La foto ya está en el carrito");
            } else {
                agregarAlCarrito({
                    id: foto.id,
                    name: foto.name,
                    price: foto.price
                });
                const fecha = new Date().toLocaleDateString();
                guardarCompra(foto.name, fecha);
            }
        } else {
            alert('Debes iniciar sesión para agregar productos al carrito.');
        }
    };

    return (
        <section className="mi-galleryDiv">
            {fotos.map((foto, index) => (
                <div key={index} className="mi-gallery-item">
                    <ImagenDesdeAPI
                        imageUrl={`https://api-fotos-juli.onrender.com/images/${foto.img}`}
                        alt={foto.name}
                    />
                    <p>{foto.name}</p>
                    <Button
                        variant="outline-secondary"
                        className="add-to-cart-btn"
                        onClick={() => handleAgregar(foto)} 
                    >
                        Agregar al carrito
                    </Button>
                </div>
            ))}
        </section>
    );
}

export default Gallery;