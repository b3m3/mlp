import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    handleAuth(state, actions) {
      state.auth = actions.payload
    }
  }
});

export const { handleAuth } = authSlice.actions;
export default authSlice.reducer;