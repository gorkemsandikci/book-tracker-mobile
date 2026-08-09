import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './bookSlice';
import authorReducer from './authorSlice';
import listReducer from './listSlice';

export const store = configureStore({
  reducer: {
    books: bookReducer,
    authors: authorReducer,
    lists: listReducer,
  },
});

export default store;
