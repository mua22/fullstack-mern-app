import { Button, TextField } from "@mui/material";
import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import axiosInstance from "../services/axiosInstance";
const ProductForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const isEditing = id ? true : false;
  React.useEffect(function () {
    if (isEditing)
      axiosInstance
        .get("/api/products/" + params.id)
        .then((res) => {
          setProduct(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);
  const [sending, setSending] = React.useState(false);
  const [product, setProduct] = React.useState({
    name: "",
    price: "",
    color: "",
    department: "",
    description: "",
  });
  return (
    <div>
      <h2>Product Form</h2>
      <Button
        variant="contained"
        disabled={sending}
        onClick={(e) => {
          setSending(true);
          if (isEditing)
            axiosInstance
              .put("/api/products/" + params.id, product)
              .then((res) => {
                //   console.log(res.data);
                setSending(false);
                navigate("/");
              });
          else
            axiosInstance.post("/api/products", product).then((res) => {
              //   console.log(res.data);
              setSending(false);
              navigate("/");
            });
        }}
      >
        {isEditing ? "Edit Product" : "Add Product"}
      </Button>
      <br />

      <TextField
        disabled={sending}
        value={product.name}
        label="Name"
        fullWidth
        variant="standard"
        onChange={(e) => {
          console.log(e.target.value);
          setProduct({ ...product, name: e.target.value });
        }}
      />
      <TextField
        disabled={sending}
        value={product.price}
        label="Price"
        fullWidth
        variant="standard"
        onChange={(e) => {
          setProduct({ ...product, price: e.target.value });
        }}
      />
      <select
        disabled={sending}
        value={product.color}
        onChange={(e) => {
          setProduct({ ...product, color: e.target.value });
        }}
      >
        <option value="red">red</option>
        <option value="blue">blue</option>
      </select>
      <TextField
        disabled={sending}
        value={product.description}
        label="Description"
        fullWidth
        multiline
        rows={4}
        variant="standard"
        onChange={(e) => {
          setProduct({ ...product, description: e.target.value });
        }}
      />
    </div>
  );
};

export default ProductForm;
