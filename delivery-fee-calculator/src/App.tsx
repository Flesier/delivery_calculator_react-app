import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Cart from './components/Cart';
import React from 'react';
import Navbar from './components/Navbar';
import Calculator from './components/Calculator';
import Footer from './components/Footer';
export const productData = [];


function App() {
  const products = JSON.stringify(productData)
  useEffect(() => {
    localStorage.setItem('products', products)
  }, [products])

  return (
    <Suspense fallback={<h1>Loading</h1>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Calculator />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Navbar /> 
        <Footer /> 
      </BrowserRouter>
    </Suspense>
  )
}

export default App;