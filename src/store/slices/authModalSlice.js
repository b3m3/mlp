import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modal: false
}

const authModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state) {
      state.modal = true;
    },
    closeModal(state) {
      state.modal = false;
    }
  }
})

export const { openModal, closeModal } = authModalSlice.actions;
export default authModalSlice.reducer;