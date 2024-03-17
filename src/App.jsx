import './App.css'
import {  Route, Routes, HashRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ProductDetails from './pages/ProductDetails'
import ProductList from './pages/ProductList'
import ShoppingCart from './pages/ShoppingCart'
import Login from './pages/Login'
import Register from './pages/Register'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import Assignment from './pages/Assignment'
function App() {

  return (
    <>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/assignment/zethic" element={<Assignment />} />
      </Routes>
    </HashRouter>
    </>
  )
}

export default App
