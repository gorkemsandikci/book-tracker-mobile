import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authorSlice = createSlice({
  name: 'authors',
  initialState: {
    items: [],
  },
  reducers: {
    addAuthor: (state, action) => {
      const newAuthor = {
        ...action.payload,
        id: action.payload.id || `author-${Date.now()}`,
      };
      state.items.push(newAuthor);
    },
    removeAuthor: (state, action) => {
      state.items = state.items.filter(author => author.id !== action.payload);
    },
    setAuthors: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { addAuthor, removeAuthor, setAuthors } = authorSlice.actions;

export const loadAuthors = () => async (dispatch) => {
  try {
    const authorsJson = await AsyncStorage.getItem('authors');
    if (authorsJson !== null) {
      dispatch(setAuthors(JSON.parse(authorsJson)));
    }
  } catch (error) {
    console.error('Error loading authors:', error);
  }
};

export const saveAuthors = () => async (dispatch, getState) => {
  try {
    const authors = getState().authors.items;
    await AsyncStorage.setItem('authors', JSON.stringify(authors));
  } catch (error) {
    console.error('Error saving authors:', error);
  }
};

export default authorSlice.reducer;
