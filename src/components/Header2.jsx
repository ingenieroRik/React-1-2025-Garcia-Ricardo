import React from 'react';  

import Nav from './Nav.jsx';
import '../App.css'; 


function Header() {  
    return (  
        <header  className="mi-header"  >  
            <h1>Bienvenidos a mis fotos del Rock y el Pop.</h1> 
            <Nav />
        </header>  
    );  
}  

export default Header;