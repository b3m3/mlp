import { configureStore } from '@reduxjs/toolkit';
import menuSlice from './slices/menuSlice';
import favoriteSlice from './slices/favoriteSlice';
import languageSlice from './slices/languageSlice';
import infoSlice from './slices/infoSlice';
import authModalSlice from './slices/authModalSlice';
import userSlice from './slices/userSlice';

const store = configureStore({
  reducer: {
    menu: menuSlice,
    favorite: favoriteSlice,
    language: languageSlice,
    info: infoSlice,
    modal: authModalSlice,
    user: userSlice
  }
})

export default store;