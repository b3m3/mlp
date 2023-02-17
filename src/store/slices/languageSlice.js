import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: ''
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, actions) => {
      state.language = (actions.payload);
    }
  }
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;

