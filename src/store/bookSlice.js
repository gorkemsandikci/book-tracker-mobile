import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const bookSlice = createSlice({
  name: 'books',
  initialState: {
    items: [],
  },
  reducers: {
    addBook: (state, action) => {
      const newBook = {
        ...action.payload,
        id: action.payload.id || `book-${Date.now()}`,
      };
      state.items.push(newBook);
    },
    removeBook: (state, action) => {
      state.items = state.items.filter(book => book.id !== action.payload);
    },
    setBooks: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { addBook, removeBook, setBooks } = bookSlice.actions;

export const loadBooks = () => async (dispatch) => {
  try {
    const booksJson = await AsyncStorage.getItem('books');
    if (booksJson !== null) {
      dispatch(setBooks(JSON.parse(booksJson)));
    }
  } catch (error) {
    console.error('Error loading books:', error);
  }
};

export const saveBooks = () => async (dispatch, getState) => {
  try {
    const books = getState().books.items;
    await AsyncStorage.setItem('books', JSON.stringify(books));
  } catch (error) {
    console.error('Error saving books:', error);
  }
};

export default bookSlice.reducer;
