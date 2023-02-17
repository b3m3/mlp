import { createSlice } from "@reduxjs/toolkit";
import { FAVORITE_KEY } from "../../constans/localStorage";
import { getFromLocalStorage } from "../../utils/localStorage";

const favoritesStorage = getFromLocalStorage(FAVORITE_KEY);

const initialState = {
  favoritesList: favoritesStorage ? JSON.parse(favoritesStorage) : []
};

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, actions) => {
      state.favoritesList.push(actions.payload)
    },
    removeFavorite: (state, actions) => {
      state.favoritesList = state.favoritesList.filter(el => el.id !== actions.payload)
    },
    clearFavorite: (state) => {
      state.favoritesList = state.favoritesList([])
    }
  },
});

export const { addFavorite, removeFavorite, clearFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;