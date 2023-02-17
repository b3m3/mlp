import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuState: false
};

const menuSlice = createSlice({
  name: 'isActiveMenu',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.menuState = !state.menuState
    },
    closeMenu: (state) => {
      state.menuState = false
    }
  }
});

export const { toggleMenu, closeMenu } = menuSlice.actions;
export default menuSlice.reducer;