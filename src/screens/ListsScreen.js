import React from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeList, saveLists } from '../store/listSlice';

const ListsScreen = ({ navigation }) => {
  const lists = useSelector(state => state.lists.items);
  const dispatch = useDispatch();

  const handleDeleteList = (id, name) => {
    Alert.alert(
      'Delete List',
      `Delete "${name}"? Books stay in your library.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch(removeList(id));
            dispatch(saveLists());
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => navigation.navigate('ListDetail', { listId: item.id })}
    >
      <Text style={styles.listName}>{item.name}</Text>
      {item.description ? <Text style={styles.description}>{item.description}</Text> : null}
      <Text style={styles.count}>{item.bookIds.length} book{item.bookIds.length === 1 ? '' : 's'}</Text>
      <View style={styles.row}>
        <Button
          title="Open"
          onPress={() => navigation.navigate('ListDetail', { listId: item.id })}
          color="#007AFF"
        />
        <View style={styles.spacer} />
        <Button
          title="Delete"
          onPress={() => handleDeleteList(item.id, item.name)}
          color="#ff0000"
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Lists</Text>
      <Button title="Create List" onPress={() => navigation.navigate('CreateList')} color="#34C759" />
      {lists.length === 0 ? (
        <Text style={styles.emptyMessage}>No lists yet. Create Want to Read, Already Read, or any custom list.</Text>
      ) : (
        <FlatList
          style={styles.list}
          data={lists}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  list: {
    marginTop: 12,
  },
  listItem: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  count: {
    fontSize: 13,
    color: '#888',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spacer: {
    width: 12,
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
});

export default ListsScreen;
