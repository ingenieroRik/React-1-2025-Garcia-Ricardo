/*
import React from 'react';
import '../App.css'; // Importa los estilos para el login

function Login() {
    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <form className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input type="email" id="email" placeholder="Ingresa tu correo" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" placeholder="Ingresa tu contraseña" required />
                </div>
                <button type="submit" className="login-button">Iniciar Sesión</button>
            </form>
        </div>
    );
}

export default Login;

import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Login() {
    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <form className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input type="email" id="email" placeholder="Ingresa tu correo" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" placeholder="Ingresa tu contraseña" required />
                </div>
                <button type="submit" className="login-button">Iniciar Sesión</button>
            </form>
            <p>¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link></p>
        </div>
    );
}

export default Login;
*/

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function Login({ usuarios, setIsLoggedIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();


    /*
    const handleSubmit = (e) => {
        e.preventDefault();
        const usuario = usuarios.find(u => u.email === email && u.password === password);
        if (usuario) {
            setMensaje('¡Login exitoso!');
            setIsLoggedIn(true);
            setTimeout(() => {
                setMensaje('');
                navigate('/');
            }, 1000); // 1 segundo
        } else {
            setMensaje('Usuario o contraseña incorrectos.');
        }
    };
*/

    
    const handleSubmit = (e) => {
    e.preventDefault();
    // Verificar si es el admin
    if (email === import.meta.env.VITE_ADMIN_EMAIL && 
            password === import.meta.env.VITE_ADMIN_PASSWORD) {
        setMensaje('¡Login de administrador exitoso!');
        setIsLoggedIn(true);
        localStorage.setItem('currentUserEmail', email); // Agregar esta línea
        setTimeout(() => {
            setMensaje('');
            navigate('/usuarios-ventas');
        }, 1000);
        return;
    }
    // Verificar usuarios normales
    const usuario = usuarios.find(u => u.email === email && u.password === password);
    if (usuario) {
        setMensaje('¡Login exitoso!');
        setIsLoggedIn(true);
        localStorage.setItem('currentUserEmail', email); // Agregar esta línea
        setTimeout(() => {
            setMensaje('');
            navigate('/');
        }, 1000);
    } else {
        setMensaje('Usuario o contraseña incorrectos.');
    }
};
   
    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="login-button">Iniciar Sesión</button>
            </form>
            <p>¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link></p>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}

export default Login;