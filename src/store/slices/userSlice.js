import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    handleUser(state, actions) {
      state.user = actions.payload
    }
  }
});

export const { handleUser } = userSlice.actions;
export default userSlice.reducer;