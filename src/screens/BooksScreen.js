import React, { useMemo, useState } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Screen,
  ScreenHeader,
  SearchBar,
  SegmentedControl,
  BookListItem,
  AppText,
  spacing,
} from '../ui';
import { toggleFavorite, saveBooks } from '../store/bookSlice';
import { FAVORITES_LIST_ID } from './ListDetailScreen';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'toRead', label: 'To Read' },
  { key: 'reading', label: 'Reading' },
  { key: 'finished', label: 'Finished' },
];

const BooksScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const books = useSelector(state => state.books.items);
  const authors = useSelector(state => state.authors.items);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortKey, setSortKey] = useState('title');

  const getAuthorName = (authorId) => {
    const author = authors.find(item => item.id === authorId);
    return author ? author.name : 'Unknown';
  };

  const visibleBooks = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return books
      .filter(book => {
        const status = book.status || 'toRead';
        if (filter !== 'all' && status !== filter) return false;
        if (!normalized) return true;
        const author = getAuthorName(book.authorId).toLowerCase();
        return (
          book.title.toLowerCase().includes(normalized) ||
          author.includes(normalized) ||
          (book.genre || '').toLowerCase().includes(normalized)
        );
      })
      .sort((a, b) => {
        if (sortKey === 'author') {
          return getAuthorName(a.authorId).localeCompare(getAuthorName(b.authorId));
        }
        if (sortKey === 'progress') {
          return (b.progress || 0) - (a.progress || 0);
        }
        if (sortKey === 'rating') {
          return (b.rating || 0) - (a.rating || 0);
        }
        return a.title.localeCompare(b.title);
      });
  }, [books, authors, query, filter, sortKey]);

  const handleSort = () => {
    Alert.alert('Sort books', 'Choose a sort order', [
      { text: 'Title', onPress: () => setSortKey('title') },
      { text: 'Author', onPress: () => setSortKey('author') },
      { text: 'Rating', onPress: () => setSortKey('rating') },
      { text: 'Progress', onPress: () => setSortKey('progress') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleToggleFavorite = (bookId) => {
    dispatch(toggleFavorite(bookId));
    dispatch(saveBooks());
  };

  return (
    <Screen>
      <ScreenHeader
        title="Books"
        actions={[
          {
            name: 'heart-outline',
            onPress: () => navigation.navigate('ListDetail', { listId: FAVORITES_LIST_ID }),
            accessibilityLabel: 'Open favorites',
          },
          {
            name: 'swap-vertical-outline',
            onPress: handleSort,
            accessibilityLabel: 'Sort books',
          },
          {
            name: 'add-circle-outline',
            onPress: () => navigation.navigate('AddBook'),
            accessibilityLabel: 'Add book',
          },
        ]}
      />
      <SearchBar value={query} onChangeText={setQuery} />
      <View style={styles.filter}>
        <SegmentedControl options={FILTERS} value={filter} onChange={setFilter} />
      </View>
      <FlatList
        style={styles.listView}
        data={visibleBooks}
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
            onToggleFavorite={() => handleToggleFavorite(item.id)}
          />
        )}
        ListEmptyComponent={
          <AppText variant="author" align="center" style={styles.empty}>
            No books match this filter.
          </AppText>
        }
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  filter: {
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
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

export default BooksScreen;
