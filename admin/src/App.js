import React from "react";
import Login from "./components/views/auth/Login";
import Register from "./components/views/auth/Register";
import Products from "./products/Products";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import ProductDetails from "./products/ProductDetails";
import ProductForm from "./products/ProductForm";
import { Container } from "@mui/material";
import Provider from "react-redux/es/components/Provider";
import store from "./store";
import NavBar from "./components/layout/NavBar";
import MenuColorChanger from "./components/redux-examples/MenuColorChanger";
import ReduxThunkExample from "./components/redux-examples/ReduxThunkExample";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router basename={"/admin"}>
          <NavBar />
          <Container maxWidth="lg">
            <Routes>
              <Route
                path="/redux-thunk-example"
                element={<ReduxThunkExample />}
              />
              <Route path="/redux-example" element={<MenuColorChanger />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products/create" element={<ProductForm />} />
              <Route path="/products/edit/:id" element={<ProductForm />} />
              <Route
                path="/products/details/:id"
                element={<ProductDetails />}
              />
              <Route path="/" element={<Products />} />
            </Routes>
          </Container>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
