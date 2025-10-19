import React from 'react';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import ProductDetailsPage from './components/ProductDetails/ProductDetailsPage';
import ProductsPage from './components/ProductsPage/ProductsPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import LoginPage from './components/LoginPage/LoginPage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductDetailsPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
