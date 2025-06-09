

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function Login({ usuarios, setIsLoggedIn,setCurrentUserEmail }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [showPassword, setShowPassword] = useState(false); 
    const navigate = useNavigate();


    const handleSubmit = (e) => {
    e.preventDefault();
    // Verificar si es el admin
     if (email === "admin@admin.com" && password === "admin")
    //if (email === import.meta.env.VITE_ADMIN_EMAIL && 
           // password === import.meta.env.VITE_ADMIN_PASSWORD)

            {
        setMensaje('¡Login de administrador exitoso!');
        setIsLoggedIn(true);
        setCurrentUserEmail(email); // Agregar esta línea
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
        setCurrentUserEmail(email); // Agregar esta línea
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
                <div className="form-group" style={{ position: 'relative' }}>
                    <label htmlFor="password">Contraseña</label>
                    <input 
                    type={showPassword ? "text" : "password"}
                    id="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    required 
                    style={{ paddingRight: "2.5rem" }}
                    />
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            position: "absolute",
                            right: "10px",
                            top: "38px",
                            cursor: "pointer",
                            userSelect: "none"
                        }}
                        title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                        {showPassword ? "🫣" : "👁️"}
                    </span>
                </div>
                <button type="submit" className="login-button">Iniciar Sesión</button>
            </form>
            <p>¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link></p>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}

export default Login;