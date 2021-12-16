import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/actions/productActions";
import { changeMenuBackgroundColor } from "../../store/actions/theme.actions";
const ReduxThunkExample = () => {
  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.productsData);
  const { fetching, fetched, success, products } = productsData;
  return (
    <div>
      {fetched && (
        <div>
          <p>Fetching is Complete</p>
          {success ? <p>Successful</p> : <p>Unsuccessful</p>}
          {success && (
            <div>
              <ul>
                {products.map((p) => (
                  <li key={p._id}>{p.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      {!fetched && (
        <div>
          Products Are not fetched yet{" "}
          <Button
            variant="contained"
            disabled={fetching}
            onClick={(e) => {
              dispatch(fetchProducts());
            }}
          >
            Fetch Product
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReduxThunkExample;
