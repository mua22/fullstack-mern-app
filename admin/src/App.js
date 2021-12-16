import React from "react";
import Login from "./components/views/auth/Login";
import Register from "./components/views/auth/Register";
import Products from "./products/Products";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import ProductDetails from "./products/ProductDetails";
import ProductForm from "./products/ProductForm";
import { Container } from "@mui/material";
function App() {
  return (
    <div className="App">
      <Router basename={"/admin"}>
        <ul id="menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          {localStorage.getItem("jwt_access_token") ? (
            <>
              <li>
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.removeItem("jwt_access_token");
                    window.location.reload();
                  }}
                >
                  Logout
                </a>
              </li>{" "}
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products/create" element={<ProductForm />} />
            <Route path="/products/edit/:id" element={<ProductForm />} />
            <Route path="/products/details/:id" element={<ProductDetails />} />
            <Route path="/" element={<Products />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
}

export default App;
