import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  infoState: false
};

const infoSlice = createSlice({
  name: 'infoState',
  initialState,
  reducers: {
    onActiveInfo: (state) => {
      state.infoState = true;
    },
    onCloseInfo: (state) => {
      state.infoState = false;
    }
  }
})

export const { onActiveInfo, onCloseInfo } = infoSlice.actions;
export default infoSlice.reducer;