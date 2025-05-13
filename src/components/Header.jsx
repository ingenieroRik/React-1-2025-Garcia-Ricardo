import React from 'react';
import Nav from './Nav.jsx';
import '../App.css';

function Header({ cartCount }) {
    return (
        <header className="mi-header">
            <h1>Bienvenidos a mis fotos del Rock y el Pop.</h1>
            <Nav cartCount={cartCount} /> {/* Pasa el contador al Nav */}
        </header>
    );
}

export default Header;