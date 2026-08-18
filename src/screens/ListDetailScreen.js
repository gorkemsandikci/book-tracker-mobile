import React, { useMemo } from 'react';
import { Alert, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Screen, ScreenHeader, AppText, BookListItem, spacing } from '../ui';
import { addBookToList, removeBookFromList, saveLists } from '../store/listSlice';
import { toggleFavorite, saveBooks } from '../store/bookSlice';

export const FAVORITES_LIST_ID = 'favorites';

const ListDetailScreen = ({ navigation, route }) => {
  const { listId } = route.params || {};
  const dispatch = useDispatch();
  const customList = useSelector(state => state.lists.items.find(item => item.id === listId));
  const books = useSelector(state => state.books.items);
  const authors = useSelector(state => state.authors.items);
  const isFavorites = listId === FAVORITES_LIST_ID;

  const list = useMemo(() => {
    if (isFavorites) {
      return {
        id: FAVORITES_LIST_ID,
        name: 'Favorites',
        description: 'Books you marked with a heart.',
        bookIds: books.filter(book => book.isFavorite).map(book => book.id),
      };
    }
    return customList;
  }, [isFavorites, customList, books]);

  const getAuthorName = (authorId) => {
    const author = authors.find(item => item.id === authorId);
    return author ? author.name : 'Unknown';
  };

  const listBooks = useMemo(() => {
    if (!list) return [];
    return list.bookIds.map(id => books.find(book => book.id === id)).filter(Boolean);
  }, [list, books]);

  const availableBooks = useMemo(() => {
    if (!list) return [];
    if (isFavorites) {
      return books.filter(book => !book.isFavorite);
    }
    return books.filter(book => !list.bookIds.includes(book.id));
  }, [list, books, isFavorites]);

  if (!list) {
    return (
      <Screen>
        <ScreenHeader title="List" onBack={() => navigation.goBack()} />
        <AppText variant="author">List not found.</AppText>
      </Screen>
    );
  }

  const addBookToThisList = (bookId) => {
    if (isFavorites) {
      const book = books.find(item => item.id === bookId);
      if (book && !book.isFavorite) {
        dispatch(toggleFavorite(bookId));
        dispatch(saveBooks());
      }
      return;
    }
    dispatch(addBookToList({ listId, bookId }));
    dispatch(saveLists());
  };

  const handleAddBook = () => {
    if (availableBooks.length === 0) {
      Alert.alert('Nothing to add', 'Every library book is already in this list.');
      return;
    }

    Alert.alert('Add from library', 'Choose a book', [
      ...availableBooks.slice(0, 8).map(book => ({
        text: book.title,
        onPress: () => addBookToThisList(book.id),
      })),
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  return (
    <Screen>
      <ScreenHeader
        title={list.name}
        onBack={() => navigation.goBack()}
        actions={[
          {
            name: 'add-circle-outline',
            onPress: handleAddBook,
            accessibilityLabel: 'Add from library',
          },
        ]}
      />
      {list.description ? (
        <AppText variant="author" style={styles.description}>
          {list.description}
        </AppText>
      ) : null}
      <FlatList
        style={styles.listView}
        data={listBooks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <BookListItem
            title={item.title}
            author={getAuthorName(item.authorId)}
            genre={item.genre || 'Uncategorized'}
            status={item.status || 'toRead'}
            progress={item.progress ?? 0}
            rating={item.rating || 0}
            isFavorite={!!item.isFavorite}
            coverUri={item.coverUri}
            coverColor={item.coverColor}
            onPress={() => navigation.navigate('BookDetail', { bookId: item.id })}
            onToggleFavorite={() => {
              dispatch(toggleFavorite(item.id));
              dispatch(saveBooks());
            }}
          />
        )}
        ListEmptyComponent={
          <AppText variant="author" align="center" style={styles.empty}>
            {isFavorites
              ? 'No favorites yet. Tap the heart on a book to add it here.'
              : 'This list is empty. Add books from your library.'}
          </AppText>
        }
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  description: {
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  listView: {
    flex: 1,
  },
  list: {
    paddingBottom: spacing.xl,
  },
  empty: {
    marginTop: spacing.xxl,
  },
});

export default ListDetailScreen;
