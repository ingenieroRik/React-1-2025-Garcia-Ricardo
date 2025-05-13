/*

import React, { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'; 

import '../App.css'; // si lo cargo despues sobreescribo los estilos de bootstrap

function Gallery() {
  const [fotos, setFotos] = useState([]);

  
  useEffect(() => {
    const Fotos = async () => {
      try {
        const respuesta = await fetch('https://api-fotos-juli.onrender.com/api/fotos');
        const datos = await respuesta.json();
        //console.log('Datos recibidos de la API:', datos); // Verificar el JSON en la consola
        setFotos(datos);
      } catch (error) {
        console.error('Error al obtener las fotos:', error);
      }
    };

    Fotos();
  }, []);

  return (
    <section className='mi-galleryDiv'
   
    >
      {fotos.map((foto, index) => (
        <div key={index}  className="mi-gallery-item">
          <img
            src={`https://api-fotos-juli.onrender.com/images/${foto.img}`} 
            alt={foto.name}   
            className="mi-gallery-img"   
          />
          <p >{foto.name}</p>
          <Button variant="primary" className="add-to-cart-btn">
            Agregar al carrito
          </Button>
        </div>
      ))}
    </section>
  );

}

export default Gallery;  
*/

import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'; // si lo cargo despues sobreescribo los estilos de bootstrap

function Gallery() {
  const [fotos, setFotos] = useState([]);
  const [carrito, setCarrito] = useState([]); // Estado para almacenar los elementos del carrito

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

  // Función para agregar un elemento al carrito
  const agregarAlCarrito = (fotoName) => {
    setCarrito((prevCarrito) => [...prevCarrito, fotoName]); // Agrega el nombre de la foto al carrito
    console.log('Carrito actualizado:', [...carrito, fotoName]); // Muestra el carrito actualizado en la consola
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
            variant="primary"
            className="add-to-cart-btn"
            onClick={() => agregarAlCarrito(foto.name)} // Llama a la función al hacer clic
          >
            Agregar al carrito
          </Button>
        </div>
      ))}
    </section>
  );
}

export default Gallery;


