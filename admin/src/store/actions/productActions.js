import axiosInstance from "../../services/axiosInstance";

export const fetchProducts = () => {
  return (dispatch) => {
    dispatch(setFetching(true));
    axiosInstance
      .get("/api/public/products")
      .then((res) => {
        dispatch(setProducts(res.data));
        dispatch(setSuccess(true));
        dispatch(setFetching(false));
      })
      .catch((error) => {
        setSuccess(false);
      })
      .finally(() => {
        dispatch(setFetched(true));
      });
  };
};
const setProducts = (products) => {
  return {
    type: "set-products",
    data: products,
  };
};

const setFetching = (status) => {
  return {
    type: "set-products-fetching",
    data: status,
  };
};
const setFetched = (status) => {
  return {
    type: "set-products-fetched",
    data: status,
  };
};
const setSuccess = (status) => {
  return {
    type: "set-products-success",
    data: status,
  };
};
