const initialState = {
  products: [],
  fetched: false,
  fetching: false,
  success: false,
};

const productsReducer = function (state = initialState, action) {
  switch (action.type) {
    case "set-products": {
      return {
        ...state,
        products: action.data,
      };
    }
    case "set-products-fetched": {
      return {
        ...state,
        fetched: action.data,
      };
    }
    case "set-products-fetching": {
      return {
        ...state,
        fetching: action.data,
      };
    }
    case "set-products-success": {
      return {
        ...state,
        success: action.data,
      };
    }

    default: {
      return state;
    }
  }
};

export default productsReducer;
