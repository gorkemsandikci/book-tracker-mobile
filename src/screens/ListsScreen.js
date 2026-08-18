import React, { useMemo } from 'react';
import { Alert, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Screen, ScreenHeader, ListCard, AppText, spacing } from '../ui';
import { removeList, saveLists } from '../store/listSlice';
import { FAVORITES_LIST_ID } from './ListDetailScreen';

const ListsScreen = ({ navigation }) => {
  const lists = useSelector(state => state.lists.items);
  const books = useSelector(state => state.books.items);
  const dispatch = useDispatch();
  const favoriteCount = books.filter(book => book.isFavorite).length;

  const rows = useMemo(
    () => [
      {
        id: FAVORITES_LIST_ID,
        name: 'Favorites',
        description: 'Books you marked with a heart.',
        count: favoriteCount,
        icon: 'heart',
        pinned: true,
      },
      ...lists.map(list => ({
        id: list.id,
        name: list.name,
        description: list.description,
        count: list.bookIds.length,
        pinned: false,
      })),
    ],
    [lists, favoriteCount]
  );

  const handleDeleteList = (id, name) => {
    Alert.alert('Delete list', `Delete "${name}"? Books stay in your library.`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          dispatch(removeList(id));
          dispatch(saveLists());
        },
      },
    ]);
  };

  const openList = (id) => {
    navigation.navigate('ListDetail', { listId: id });
  };

  return (
    <Screen>
      <ScreenHeader
        title="Lists"
        actions={[
          {
            name: 'add-circle-outline',
            onPress: () => navigation.navigate('CreateList'),
            accessibilityLabel: 'Create list',
          },
        ]}
      />
      <AppText variant="author" style={styles.intro}>
        Open Favorites or any list you create.
      </AppText>
      <FlatList
        style={styles.listView}
        data={rows}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ListCard
            name={item.name}
            description={item.description}
            count={item.count}
            icon={item.icon}
            onPress={() => openList(item.id)}
            onDelete={item.pinned ? undefined : () => handleDeleteList(item.id, item.name)}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  intro: {
    marginBottom: spacing.md,
  },
  listView: {
    flex: 1,
  },
  list: {
    paddingBottom: spacing.xl,
  },
});

export default ListsScreen;
