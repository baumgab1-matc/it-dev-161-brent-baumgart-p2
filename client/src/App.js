import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./App.css";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import CheckoutItem from "./components/CheckoutItem";
import Checkout from "./components/Checkout";
import { ProductProvider } from "./context/ProductContext";
import Register from "./components/Register";
import CustomerOrders from "./components/CustomerOrders";
import { CustomerProvider } from "./context/CustomerContext";
import { useEffect, useState } from "react";

function App() {


  return (
    <ProductProvider>
      <CustomerProvider>
      <Router>
        <Header />

        <main>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/cart" element={<Checkout />} />
            <Route exact path="/products/item-name" element={<CheckoutItem />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/orders" element={<CustomerOrders />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </main>

      </Router>
      </CustomerProvider>
    </ProductProvider>
  );
}



export default App;
