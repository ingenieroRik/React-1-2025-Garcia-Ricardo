

import React, { useState } from 'react';
import Container  from 'react-bootstrap/Container';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import RegistroUsuario from './pages/RegistroUsuario';
import Header from './components/Header';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Carrito from './pages/Carrito';
import Login from './pages/Login';
import RutaProtegida from './components/RutaProtegida';
import Miscompras from './components/MisCompras'; // Asegúrate de que el nombre y la ruta sean correctos
import Factura from './components/Factura';
import ListaUsuarios from './pages/ListaUsuarios';
import UsuarioForm from './components/UsuarioForm';

function App() {


    

    // Usuarios por defecto
    const usuariosPorDefecto = [
          { id: 1, nombre: "Ana", email: "ana@email.com", compras: [{}] }, //1 compra
          { id: 2, nombre: "Luis", email: "luis@email.com", compras: [{}] },
          { id: 3, nombre: "Sofía", email: "sofia@email.com", compras: [{}] }
    ];

   const [usuarios, setUsuarios] = useState(usuariosPorDefecto);

  //const [usuarios, setUsuarios = useState([]);
  const [usuarioAEditar, setUsuarioAEditar] = useState(null);
  const [contadorId, setContadorId] = useState(usuariosPorDefecto.length + 1); // Inicia el contador con el siguiente ID disponible

    const agregarUsuario=(usuario)=>
    {
    const nuevoUsuario = { ...usuario, id: contadorId, compras: usuario.compras || [] };
    setUsuarios([...usuarios, nuevoUsuario]);
    setContadorId(contadorId + 1);
    };


                const actualizarUsuario = (usuarioActualizado) => {
            setUsuarios(usuarios.map(p =>
                p.id === usuarioActualizado.id
                ? { ...p, ...usuarioActualizado, compras: p.compras }
                : p
            ));
            setUsuarioAEditar(null);
            };


            const borrarUsuario= (id) => 
            {
            setUsuarios(usuarios.filter(p => p.id !== id));
            };

            const editarUsuario = (usuario) => 
            {
            setUsuarioAEditar(usuario);
            };






    const eliminarDelCarrito = (fotoName) => {
    if (fotoName === 'CLEAR_ALL') {
        setCarrito([]);
    } else {
        setCarrito((prevCarrito) => prevCarrito.filter((foto) => foto.name !== fotoName));
    }
};

    const [isLoggedIn, setIsLoggedIn] = useState(false); 
     const [adminEmail] = useState('admin@admin.com'); // Cambia por el email real del admin
    const [currentUserEmail, setCurrentUserEmail] = useState('');

   
   
    const registrarUsuario = (nuevoUsuario) => {
    setUsuarios((prev) => [...prev, {...nuevoUsuario, compras: []}]);
       };
    

    const [carrito, setCarrito] = useState([]); 

   
    
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
    const registrarCompra = (userId, compra) => {
  setUsuarios(usuarios.map(u =>
    u.id === userId
      ? { ...u, compras: [...u.compras, compra] }
      : u
  ));
};



     // Suponiendo que el usuario actual es el primero en la lista de usuarios
      const usuarioActual = usuarios.length > 0 ? usuarios[0] : { name: "Invitado", email: "invitado@example.com" };
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
                            registrarCompra={registrarCompra}
                            usuarioActual={usuarioActual}     // <-- pásale el usuario actual
                            setCarrito={setCarrito}      
                        /> 
                    </RutaProtegida>
                    }
                    />
                <Route path="/login" element={<Login 
                   usuarios={usuarios} 
                   setIsLoggedIn={setIsLoggedIn}
                   setCurrentUserEmail={setCurrentUserEmail}
                />} />



                <Route path="/registro" element={<RegistroUsuario registrarUsuario={registrarUsuario} usuarios={usuarios} />} />
                   {/* Ruta protegida solo para el admin */}
                <Route 
                   path="/usuarios-ventas"
                    element={
                        <RutaProtegida isLoggedIn={isLoggedIn && currentUserEmail === adminEmail}>
                            <Container className="my-4">
                                <h2>Gestión de Usuarios</h2>
                                <UsuarioForm
                                    onSubmit={usuarioAEditar ? actualizarUsuario : agregarUsuario}
                                    usuarioAEditar={usuarioAEditar}
                                    onCancel={() => setUsuarioAEditar(null)}
                                />
                                <hr />
                                <ListaUsuarios
                                    usuarios={usuarios}
                                    onEdit={editarUsuario}
                                    onDelete={borrarUsuario}
                                />
                            </Container>
                        </RutaProtegida>
                    }
                />
    
            <Route path="/factura" element={
                    <Factura 
                        name={usuarioActual.name} 
                        email={usuarioActual.email} 
                        items={carrito} 
                    />
                } />




        </Routes>



            <Footer />
        </Router>
    );
}

export default App;