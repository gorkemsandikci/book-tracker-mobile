import AsyncStorage from '@react-native-async-storage/async-storage';
import { SEED_AUTHORS, SEED_BOOKS, SEED_LISTS } from '../data/seed';
import { setAuthors } from './authorSlice';
import { setBooks } from './bookSlice';
import { setLists } from './listSlice';

const persistAll = async (authors, books, lists) => {
  await AsyncStorage.multiSet([
    ['authors', JSON.stringify(authors)],
    ['books', JSON.stringify(books)],
    ['lists', JSON.stringify(lists)],
  ]);
};

const normalizeBook = (book) => ({
  genre: 'Uncategorized',
  status: 'toRead',
  progress: 0,
  coverColor: '#5B4636',
  isFavorite: false,
  rating: 0,
  ...book,
});

export const applySeedData = () => async (dispatch) => {
  dispatch(setAuthors(SEED_AUTHORS));
  dispatch(setBooks(SEED_BOOKS));
  dispatch(setLists(SEED_LISTS));
  await persistAll(SEED_AUTHORS, SEED_BOOKS, SEED_LISTS);
  return true;
};

export const loadAppData = () => async (dispatch) => {
  try {
    const [[, authorsJson], [, booksJson], [, listsJson]] = await AsyncStorage.multiGet([
      'authors',
      'books',
      'lists',
    ]);

    const authors = authorsJson ? JSON.parse(authorsJson) : [];
    const books = booksJson ? JSON.parse(booksJson) : [];
    const lists = listsJson ? JSON.parse(listsJson) : [];

    const isEmpty = !booksJson || books.length === 0;

    if (isEmpty) {
      await dispatch(applySeedData());
      return { seeded: true };
    }

    dispatch(setAuthors(authors));
    dispatch(setBooks(books.map(normalizeBook)));
    dispatch(setLists(lists.length > 0 ? lists : SEED_LISTS));

    if (lists.length === 0) {
      await AsyncStorage.setItem('lists', JSON.stringify(SEED_LISTS));
    }

    return { seeded: false };
  } catch (error) {
    console.error('Error loading app data:', error);
    await dispatch(applySeedData());
    return { seeded: true, error: true };
  }
};

export const loadSampleDataIfEmpty = () => async (dispatch, getState) => {
  const books = getState().books.items;
  if (books.length > 0) {
    return { seeded: false, reason: 'library_not_empty' };
  }
  await dispatch(applySeedData());
  return { seeded: true };
};

export const resetAndSeed = () => async (dispatch) => {
  await AsyncStorage.multiRemove(['authors', 'books', 'lists']);
  await dispatch(applySeedData());
  return { seeded: true, reset: true };
};
