import React from 'react';
import Nav from './Nav.jsx';
import '../App.css';

function Header({ cartCount, isLoggedIn, setIsLoggedIn}) {
    return (
        <header className="mi-header">
            <h1>Bienvenidos a mis fotos del Rock y el Pop.</h1>
            <Nav cartCount={cartCount} isLoggedIn={isLoggedIn}  setIsLoggedIn={setIsLoggedIn} />
        </header>
    );
}

export default Header;