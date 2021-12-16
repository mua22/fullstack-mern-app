import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const NavBar = () => {
  const theme = useSelector((state) => state.theme);
  const { menuColor, menuBackgroundColor } = theme;
  const productsData = useSelector((state) => state.productsData);
  const { products } = productsData;
  return (
    <ul id="menu" style={{ backgroundColor: menuBackgroundColor }}>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <a href="/">Visit Website</a>
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
      <li>
        <Link to="redux-example">Redux Example</Link>
      </li>
      <li>
        <Link to="redux-thunk-example">
          Redux Thunk Example ({products.length})
        </Link>
      </li>
    </ul>
  );
};

export default NavBar;
