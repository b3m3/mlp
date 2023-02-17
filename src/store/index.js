import { configureStore } from '@reduxjs/toolkit';
import menuSlice from './slices/menuSlices';

const store = configureStore({
  reducer: {
    menu: menuSlice,
  }
})

export default store;