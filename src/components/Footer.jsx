


import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import '../App.css';

function Footer() {
    return (

        
        <footer className="mi-footer">
            <p >
                &copy; 2025 - Juli García Fotografía
            </p>
            <div className="mi-footer-icons" >
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="mi-footer-icon facebook">
                    <FontAwesomeIcon icon={faFacebook} size="2x" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="mi-footer-icon twitter">
                    <FontAwesomeIcon icon={faTwitter} size="2x" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="mi-footer-icon instagram">
                    <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
            </div>
        </footer>
    );
}

export default Footer;

