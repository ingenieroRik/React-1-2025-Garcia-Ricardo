import React from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import '../App.css';


function Nav({ cartCount, isLoggedIn, setIsLoggedIn }) { 
    const navigate = useNavigate();
    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/');
    };
    return (
        <nav className="mi-nav">
            <ul className="mi-nav-list">
                <li><Link to="/" className="mi-nav-link">Todas las Fotos</Link></li>
                <li>
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className="mi-nav-link" style={{background: 'none', border: 'none', cursor: 'pointer'}}>
                            Cerrar Sesión
                        </button>
                    ) : (
                        <Link to="/login" className="mi-nav-link">Inicio de Sesión</Link>
                    )}
                </li>
                <li className="cart-icon-container">
                    <Link to="/carrito" className="mi-nav-link">
                        <FontAwesomeIcon icon={faShoppingCart} />
                        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                    </Link>
                </li>
            </ul>
        </nav>
    );
}


export default Nav;