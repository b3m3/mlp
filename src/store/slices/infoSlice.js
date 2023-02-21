import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  infoState: false
};

const infoSlice = createSlice({
  name: 'infoState',
  initialState,
  reducers: {
    onActive: (state) => {
      state.infoState = true;
    },
    onClose: (state) => {
      state.infoState = false;
    }
  }
})

export const { onActive, onClose } = infoSlice.actions;
export default infoSlice.reducer;