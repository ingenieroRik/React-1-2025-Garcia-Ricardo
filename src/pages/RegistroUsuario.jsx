import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function RegistroUsuario({ registrarUsuario , usuarios }) {
    const [form, setForm] = useState({ nombre: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

   const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Verificar si el usuario ya existe
        const usuarioExistente = usuarios.find(u => u.email === form.email);
        if (usuarioExistente) {
            alert('Este correo electrónico ya está registrado');
            return;
        }
        // Registrar el nuevo usuario
        registrarUsuario(form);
        // Esperar 1 segundo y mostrar mensaje
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert('Usuario registrado correctamente');
        
        // Navegar al login
        navigate('/login');
    };

    return (
        <div className="login-container">
            <h2>Registro de Usuario</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" id="nombre" value={form.nombre} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input type="email" id="email" value={form.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" value={form.password} onChange={handleChange} required />
                </div>
                <button type="submit" className="login-button">Registrarse</button>
            </form>
        </div>
    );
}

export default RegistroUsuario;