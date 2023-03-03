import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteMovies: null,
  favoriteTv: null,
};

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavoriteMovies(state, actions) {
      state.favoriteMovies = actions.payload
    },
    setFavoriteTv(state, actions) {
      state.favoriteTv = actions.payload
    }
  },
});

export const { setFavoriteMovies, setFavoriteTv } = favoriteSlice.actions;
export default favoriteSlice.reducer;