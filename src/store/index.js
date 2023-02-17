import { configureStore } from '@reduxjs/toolkit';
import menuSlice from './slices/menuSlice';
import favoriteSlice from './slices/favoriteSlice';

const store = configureStore({
  reducer: {
    menu: menuSlice,
    favorite: favoriteSlice
  }
})

export default store;