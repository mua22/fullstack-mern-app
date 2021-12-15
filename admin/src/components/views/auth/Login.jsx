import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/axiosInstance";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState({
    email: "admin@admin.com",
    password: "admin",
  });
  return (
    <div>
      <h1>Login</h1>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Email"
            value={user.email}
            fullWidth
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            value={user.password}
            fullWidth
            type="password"
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={(e) => {
              axiosInstance
                .post("/api/auth", user)
                .then((res) => {
                  console.log(res.data);
                  localStorage.setItem("jwt_access_token", res.data);
                  window.location.replace("/admin");
                })
                .catch((e) => {
                  console.log(e);
                });
            }}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
