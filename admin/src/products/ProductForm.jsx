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
  const [image, setImage] = React.useState("");
  const [progress, setProgess] = React.useState(0);
  const [sending, setSending] = React.useState(false);
  const [product, setProduct] = React.useState({
    name: "",
    price: "",
    color: "",
    department: "",
    description: "",
  });
  const getFormData = () => {
    var form_data = new FormData();
    for (var key in product) {
      form_data.append(key, product[key]);
    }
    form_data.append("image", image);
    return form_data;
  };
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
              .put("/api/products/" + params.id, getFormData(), {
                onUploadProgress: (ProgressEvent) => {
                  let progress =
                    Math.round(
                      (ProgressEvent.loaded / ProgressEvent.total) * 100
                    ) + "%";
                  setProgess(progress);
                },
              })
              .then((res) => {
                //   console.log(res.data);
                setSending(false);
                navigate("/");
              });
          else
            axiosInstance
              .post("/api/products", getFormData(), {
                onUploadProgress: (ProgressEvent) => {
                  let progress =
                    Math.round(
                      (ProgressEvent.loaded / ProgressEvent.total) * 100
                    ) + "%";
                  setProgess(progress);
                },
              })
              .then((res) => {
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
      <input
        disabled={sending}
        type="file"
        onChange={(e) => {
          setProgess(0);
          const file = e.target.files[0]; // accessing file
          console.log(file);
          setImage(file); // storing file
        }}
      />
    </div>
  );
};

export default ProductForm;
