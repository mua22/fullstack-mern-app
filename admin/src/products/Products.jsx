import React from "react";
import SingleProduct from "./SingleProduct";
import Pagination from '@mui/material/Pagination';
import axios from "axios";
import { Link } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import AuthCheck from "../components/views/auth/AuthCheck";
import { Button } from "@mui/material";
const Products = () => {
  const [products, setProducts] = React.useState([]);
  const [hasError, setHasError] = React.useState(false);
  //   console.log(products);
  //   React.useEffect(() => console.log("Only First Render"), []);
  //   React.useEffect(() => console.log("First Render And Products"), [products]);
  //   React.useEffect(() => console.log("This will be called on each render"));
  const getData = () => {
    axiosInstance
      .get("/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
        setHasError(true);
      });
  };
  React.useEffect(function () {
    // console.log("Sending Ajax call");
    getData();
  }, []);
  return (
    <AuthCheck>
      <div>
        <h3>Products</h3>

        <Button
          color="primary"
          component={Link}
          to="/products/create"
          variant="contained"
        >
          Add New Product
        </Button>
        {products.length == 0 && !hasError && <p>Loading ...</p>}
        {hasError && <p>Something Wrong Happened. We are looking into it</p>}
        {products.map((p) => (
          <SingleProduct product={p} key={p._id} onDelete={getData} />
        ))}
      </div>
    </AuthCheck>
  );
};

export default Products;
