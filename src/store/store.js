// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import reducer from '../reducer/reducer';

const store = configureStore({
  reducer: {
    login: reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
