import React from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Screen,
  ScreenHeader,
  BookCover,
  AppText,
  StarRating,
  FavoriteButton,
  CheckRow,
  PrimaryButton,
  spacing,
  colors,
  radii,
} from '../ui';
import { setRating, toggleFavorite, saveBooks, removeBook } from '../store/bookSlice';
import {
  addBookToList,
  removeBookFromList,
  removeBookFromAllLists,
  saveLists,
} from '../store/listSlice';
import { FAVORITES_LIST_ID } from './ListDetailScreen';

const BookDetailScreen = ({ navigation, route }) => {
  const { bookId } = route.params || {};
  const dispatch = useDispatch();
  const book = useSelector(state => state.books.items.find(item => item.id === bookId));
  const authors = useSelector(state => state.authors.items);
  const lists = useSelector(state => state.lists.items);

  if (!book) {
    return (
      <Screen>
        <ScreenHeader title="Book" />
        <AppText variant="author">This book is no longer in your library.</AppText>
      </Screen>
    );
  }

  const author = authors.find(item => item.id === book.authorId);
  const authorName = author ? author.name : 'Unknown';

  const persistFavorite = () => {
    dispatch(toggleFavorite(book.id));
    dispatch(saveBooks());
  };

  const persistRating = (rating) => {
    dispatch(setRating({ id: book.id, rating }));
    dispatch(saveBooks());
  };

  const toggleList = (list) => {
    const inList = list.bookIds.includes(book.id);
    if (inList) {
      dispatch(removeBookFromList({ listId: list.id, bookId: book.id }));
    } else {
      dispatch(addBookToList({ listId: list.id, bookId: book.id }));
    }
    dispatch(saveLists());
  };

  const handleDelete = () => {
    Alert.alert('Delete book', 'Remove this book from your library and all lists?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          dispatch(removeBook(book.id));
          dispatch(removeBookFromAllLists(book.id));
          dispatch(saveBooks());
          dispatch(saveLists());
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <Screen>
      <ScreenHeader
        title="Book"
        onBack={() => navigation.goBack()}
        actions={[
          {
            name: 'trash-outline',
            onPress: handleDelete,
            accessibilityLabel: 'Delete book',
          },
        ]}
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
        showsVerticalScrollIndicator
      >
        <View style={styles.hero}>
          <BookCover uri={book.coverUri} color={book.coverColor} title={book.title} />
          <View style={styles.heroText}>
            <AppText variant="bookTitle">{book.title}</AppText>
            <AppText variant="author" style={styles.author}>
              {authorName}
            </AppText>
            <AppText variant="caption">{book.genre || 'Uncategorized'}</AppText>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.favoriteRow}>
            <AppText variant="bookTitle">Favorite</AppText>
            <FavoriteButton active={!!book.isFavorite} onPress={persistFavorite} size={26} />
          </View>
          <AppText variant="caption" style={styles.hint}>
            Save this title to your favorites.
          </AppText>
        </View>

        <View style={styles.card}>
          <AppText variant="bookTitle">Your rating</AppText>
          <View style={styles.stars}>
            <StarRating value={book.rating || 0} onChange={persistRating} size={28} />
          </View>
          <AppText variant="caption">
            {book.rating ? `${book.rating} out of 5` : 'Not rated yet'}
          </AppText>
        </View>

        <View style={styles.card}>
          <AppText variant="bookTitle">Lists</AppText>
          <AppText variant="caption" style={styles.hint}>
            Add this book to as many lists as you like.
          </AppText>
          <CheckRow
            label="Favorites"
            checked={!!book.isFavorite}
            onPress={persistFavorite}
          />
          {lists.map(list => (
            <CheckRow
              key={list.id}
              label={list.name}
              checked={list.bookIds.includes(book.id)}
              onPress={() => toggleList(list)}
            />
          ))}
          <View style={styles.create}>
            <PrimaryButton
              title="Open Favorites"
              onPress={() => navigation.navigate('ListDetail', { listId: FAVORITES_LIST_ID })}
            />
          </View>
          <View style={styles.create}>
            <PrimaryButton
              title="Create new list"
              onPress={() => navigation.navigate('CreateList')}
            />
          </View>
        </View>

        {book.notes ? (
          <View style={styles.card}>
            <AppText variant="bookTitle">Notes</AppText>
            <AppText variant="body" style={styles.hint}>
              {book.notes}
            </AppText>
          </View>
        ) : null}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    minHeight: 0,
  },
  content: {
    paddingBottom: spacing.xxl,
    flexGrow: 1,
  },
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  heroText: {
    flex: 1,
    marginLeft: spacing.md,
  },
  author: {
    marginTop: 4,
    marginBottom: 6,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  favoriteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hint: {
    marginTop: spacing.xs,
  },
  stars: {
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  create: {
    marginTop: spacing.md,
  },
});

export default BookDetailScreen;
