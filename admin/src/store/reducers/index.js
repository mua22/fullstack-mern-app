import { combineReducers } from "redux";

import themeReducer from "./theme.reducer";
import productsReducer from "./products.reducer";
const createReducer = (asyncReducers) => {
  // console.log(asyncReducers);
  return combineReducers({
    theme: themeReducer,
    productsData: productsReducer,
    ...asyncReducers,
  });
};

export default createReducer;
