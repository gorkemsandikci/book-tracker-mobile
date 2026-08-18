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
        genre: 'Uncategorized',
        status: 'toRead',
        progress: 0,
        coverColor: '#5B4636',
        isFavorite: false,
        rating: 0,
        ...action.payload,
        id: action.payload.id || `book-${Date.now()}`,
      };
      state.items.push(newBook);
    },
    updateBook: (state, action) => {
      const { id, ...changes } = action.payload;
      const book = state.items.find(item => item.id === id);
      if (!book) return;
      Object.assign(book, changes);
    },
    toggleFavorite: (state, action) => {
      const book = state.items.find(item => item.id === action.payload);
      if (!book) return;
      book.isFavorite = !book.isFavorite;
    },
    setRating: (state, action) => {
      const { id, rating } = action.payload;
      const book = state.items.find(item => item.id === id);
      if (!book) return;
      book.rating = Math.max(0, Math.min(5, rating));
    },
    removeBook: (state, action) => {
      state.items = state.items.filter(book => book.id !== action.payload);
    },
    setBooks: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const {
  addBook,
  updateBook,
  toggleFavorite,
  setRating,
  removeBook,
  setBooks,
} = bookSlice.actions;

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
