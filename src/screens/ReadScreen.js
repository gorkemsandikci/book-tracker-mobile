import React, { useMemo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Screen, ScreenHeader, BookListItem, AppText, spacing } from '../ui';

const ReadScreen = () => {
  const books = useSelector(state => state.books.items);
  const authors = useSelector(state => state.authors.items);

  const reading = useMemo(
    () => books.filter(book => (book.status || 'toRead') === 'reading'),
    [books]
  );

  const getAuthorName = (authorId) => {
    const author = authors.find(item => item.id === authorId);
    return author ? author.name : 'Unknown';
  };

  return (
    <Screen>
      <ScreenHeader title="Read" />
      <FlatList
        data={reading}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <BookListItem
            title={item.title}
            author={getAuthorName(item.authorId)}
            genre={item.genre || 'Uncategorized'}
            status={item.status}
            progress={item.progress ?? 0}
            coverColor={item.coverColor}
            coverUri={item.coverUri}
          />
        )}
        ListEmptyComponent={
          <AppText variant="author" align="center" style={styles.empty}>
            You are not reading any books right now.
          </AppText>
        }
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  empty: {
    marginTop: spacing.xxl,
  },
});

export default ReadScreen;
