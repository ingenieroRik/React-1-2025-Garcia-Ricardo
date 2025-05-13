import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import '../App.css';

function Nav({ cartCount }) { 
    return (
        <nav className="mi-nav">
            <ul className="mi-nav-list">
                <li><Link to="/" className="mi-nav-link">Todas las Fotos</Link></li>
                <li><Link to="/login" className="mi-nav-link">Inicio de Sesión</Link></li>
                <li className="cart-icon-container">
                    <Link to="/carrito" className="mi-nav-link">
                        <FontAwesomeIcon icon={faShoppingCart} /> {/* Ícono del carrito */}
                        {cartCount > 0 && ( 
                            <span className="cart-count">{cartCount}</span>
                        )}
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;