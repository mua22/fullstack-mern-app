const initialState = {
  menuColor: "white",
  menuBackgroundColor: "black",
};

const themeReducer = function (state = initialState, action) {
  switch (action.type) {
    case "change_menu_color": {
      return {
        ...state,
        menuColor: action.data,
      };
    }
    case "change_menu_background_color": {
      return {
        ...state,
        menuBackgroundColor: action.data,
      };
    }

    default: {
      return state;
    }
  }
};

export default themeReducer;
