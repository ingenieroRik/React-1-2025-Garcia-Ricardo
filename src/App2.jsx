import React from 'react';  
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header';  
import Nav from './components/Nav';  
//import Main from './components/Main';  
import Gallery from './components/Gallery';  
import Footer from './components/Footer';  
import Carrito from './pages/Carrito';
import Login from './pages/Login';


function App() {






  
    return (
      <Router>
        <Header />
     
        <Routes>        
          <Route path="/" element={<Gallery />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </Router>
    );
  }


export default App;  