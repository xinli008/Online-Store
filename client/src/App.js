import React from 'react';
import './App.css';
import { Router } from "@reach/router";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductList from "./components/ProductList";
import Login from "./components/Login";
import Register from "./components/Register";
import UserDashboard from "./components/UserDashboard";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  return (
    <div style={{ backgroundColor: "lightgrey" }}>
      <Router>
        <ProductList path="/productlist" default />
        <ProductList path="/productlistnew/:id" />
        <Login path="/login" />
        <Register path="/register" />
        <UserDashboard path="/dashboard" />
        <ShoppingCart path="/shoppingcart" />
      </Router>
    </div>
  );
}

export default App;
