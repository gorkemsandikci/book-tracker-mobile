import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Screen, ScreenHeader, AppText, ProgressBar, spacing, colors } from '../ui';

const StatsScreen = ({ navigation }) => {
  const books = useSelector(state => state.books.items);

  const stats = useMemo(() => {
    const total = books.length;
    const finished = books.filter(book => book.status === 'finished').length;
    const reading = books.filter(book => book.status === 'reading').length;
    const toRead = books.filter(book => (book.status || 'toRead') === 'toRead').length;
    const favorites = books.filter(book => book.isFavorite).length;
    const rated = books.filter(book => (book.rating || 0) > 0);
    const avgRating = rated.length
      ? (rated.reduce((sum, book) => sum + book.rating, 0) / rated.length).toFixed(1)
      : '0.0';
    const avgProgress = total
      ? Math.round(books.reduce((sum, book) => sum + (book.progress || 0), 0) / total)
      : 0;

    return { total, finished, reading, toRead, favorites, avgRating, ratedCount: rated.length, avgProgress };
  }, [books]);

  return (
    <Screen>
      <ScreenHeader
        title="Stats"
        actions={[
          {
            name: 'heart-outline',
            onPress: () => navigation.navigate('ListDetail', { listId: 'favorites' }),
            accessibilityLabel: 'Open favorites',
          },
          {
            name: 'people-outline',
            onPress: () => navigation.navigate('AuthorList'),
            accessibilityLabel: 'Authors',
          },
        ]}
      />
      <View style={styles.card}>
        <AppText variant="bookTitle">{stats.total} books in library</AppText>
        <AppText variant="author" style={styles.line}>
          {stats.reading} reading · {stats.toRead} to read · {stats.finished} finished
        </AppText>
        <AppText variant="caption" style={styles.line}>
          {stats.favorites} favorites · average rating {stats.avgRating} ({stats.ratedCount} rated)
        </AppText>
        <AppText variant="caption" style={styles.line}>
          Average progress {stats.avgProgress}%
        </AppText>
        <ProgressBar progress={stats.avgProgress} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
  },
  line: {
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
});

export default StatsScreen;
