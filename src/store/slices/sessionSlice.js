import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sessionId: null
}

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSessionId(state, actions) {
      state.sessionId = actions.payload
    },
    removeSessionId(state) {
      state.sessionId = null
    }
  }
})

export const { setSessionId, removeSessionId } = sessionSlice.actions;
export default sessionSlice.reducer;