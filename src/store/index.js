import { configureStore } from '@reduxjs/toolkit';
import menuSlice from './slices/menuSlice';
import favoriteSlice from './slices/favoriteSlice';
import languageSlice from './slices/languageSlice';
import infoSlice from './slices/infoSlice';
import authModalSlice from './slices/authModalSlice';
import authSlice from './slices/authSlice';

const store = configureStore({
  reducer: {
    menu: menuSlice,
    favorite: favoriteSlice,
    language: languageSlice,
    info: infoSlice,
    modal: authModalSlice,
    auth: authSlice
  }
})

export default store;