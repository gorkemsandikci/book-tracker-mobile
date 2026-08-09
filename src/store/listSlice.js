import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const listSlice = createSlice({
  name: 'lists',
  initialState: {
    items: [],
  },
  reducers: {
    setLists: (state, action) => {
      state.items = action.payload;
    },
    addList: (state, action) => {
      const newList = {
        id: `list-${Date.now()}`,
        name: action.payload.name,
        description: action.payload.description || '',
        bookIds: action.payload.bookIds || [],
        createdAt: new Date().toISOString(),
      };
      state.items.push(newList);
    },
    updateList: (state, action) => {
      const { id, name, description } = action.payload;
      const list = state.items.find(item => item.id === id);
      if (!list) return;
      if (name !== undefined) list.name = name;
      if (description !== undefined) list.description = description;
    },
    removeList: (state, action) => {
      state.items = state.items.filter(list => list.id !== action.payload);
    },
    addBookToList: (state, action) => {
      const { listId, bookId } = action.payload;
      const list = state.items.find(item => item.id === listId);
      if (!list) return;
      if (!list.bookIds.includes(bookId)) {
        list.bookIds.push(bookId);
      }
    },
    removeBookFromList: (state, action) => {
      const { listId, bookId } = action.payload;
      const list = state.items.find(item => item.id === listId);
      if (!list) return;
      list.bookIds = list.bookIds.filter(id => id !== bookId);
    },
    removeBookFromAllLists: (state, action) => {
      const bookId = action.payload;
      state.items.forEach(list => {
        list.bookIds = list.bookIds.filter(id => id !== bookId);
      });
    },
  },
});

export const {
  setLists,
  addList,
  updateList,
  removeList,
  addBookToList,
  removeBookFromList,
  removeBookFromAllLists,
} = listSlice.actions;

export const loadLists = () => async (dispatch) => {
  try {
    const listsJson = await AsyncStorage.getItem('lists');
    if (listsJson !== null) {
      dispatch(setLists(JSON.parse(listsJson)));
    }
  } catch (error) {
    console.error('Error loading lists:', error);
  }
};

export const saveLists = () => async (dispatch, getState) => {
  try {
    const lists = getState().lists.items;
    await AsyncStorage.setItem('lists', JSON.stringify(lists));
  } catch (error) {
    console.error('Error saving lists:', error);
  }
};

export default listSlice.reducer;
