import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeMenuBackgroundColor } from "../../store/actions/theme.actions";
const MenuColorChanger = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const { menuColor, menuBackgroundColor } = theme;
  return (
    <div>
      <p>Change The Menu Background Color With Simple Action</p>
      <select
        value={menuBackgroundColor}
        onChange={(e) => {
          dispatch({
            type: "change_menu_background_color",
            data: e.target.value,
          });
        }}
      >
        <option value="black">Black</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
      </select>
      <p>Change The Menu Color with action Creator</p>
      <select
        value={menuBackgroundColor}
        onChange={(e) => {
          dispatch(changeMenuBackgroundColor(e.target.value));
        }}
      >
        <option value="black">Black</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
      </select>
    </div>
  );
};

export default MenuColorChanger;
