import React, { useEffect, useMemo } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  addBookToList,
  removeBookFromList,
  saveLists,
} from '../store/listSlice';

const ListDetailScreen = ({ navigation, route }) => {
  const { listId, addBookId } = route.params || {};
  const dispatch = useDispatch();
  const list = useSelector(state => state.lists.items.find(item => item.id === listId));
  const books = useSelector(state => state.books.items);
  const authors = useSelector(state => state.authors.items);

  useEffect(() => {
    if (list) {
      navigation.setOptions({ title: list.name });
    }
  }, [list, navigation]);

  useEffect(() => {
    if (!addBookId || !listId) return;
    dispatch(addBookToList({ listId, bookId: addBookId }));
    dispatch(saveLists());
    navigation.setParams({ addBookId: null });
  }, [addBookId, listId, dispatch, navigation]);

  const getAuthorName = (authorId) => {
    const author = authors.find(a => a.id === authorId);
    return author ? author.name : 'Unknown';
  };

  const listBooks = useMemo(() => {
    if (!list) return [];
    return list.bookIds
      .map(id => books.find(book => book.id === id))
      .filter(Boolean);
  }, [list, books]);

  const availableBooks = useMemo(() => {
    if (!list) return [];
    return books.filter(book => !list.bookIds.includes(book.id));
  }, [list, books]);

  if (!list) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyMessage}>List not found.</Text>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  const handleRemove = (bookId) => {
    dispatch(removeBookFromList({ listId, bookId }));
    dispatch(saveLists());
  };

  const handleAddBook = (bookId) => {
    dispatch(addBookToList({ listId, bookId }));
    dispatch(saveLists());
  };

  const showAddPicker = () => {
    if (availableBooks.length === 0) {
      Alert.alert('No books to add', 'All library books are already in this list, or the library is empty.');
      return;
    }

    Alert.alert(
      'Add from Library',
      'Choose a book',
      [
        ...availableBooks.slice(0, 8).map(book => ({
          text: book.title,
          onPress: () => handleAddBook(book.id),
        })),
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.bookItem}>
      <Text style={styles.bookTitle}>{item.title}</Text>
      <Text style={styles.author}>Author: {getAuthorName(item.authorId)}</Text>
      <Button title="Remove from List" onPress={() => handleRemove(item.id)} color="#ff9500" />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{list.name}</Text>
      {list.description ? <Text style={styles.description}>{list.description}</Text> : null}
      <View style={styles.actions}>
        <Button title="Add from Library" onPress={showAddPicker} color="#007AFF" />
        <View style={styles.spacer} />
        <Button title="Browse Library" onPress={() => navigation.navigate('Library')} />
      </View>
      {listBooks.length === 0 ? (
        <Text style={styles.emptyMessage}>This list is empty. Add books from your library.</Text>
      ) : (
        <FlatList
          style={styles.list}
          data={listBooks}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListFooterComponent={
            availableBooks.length > 0 ? (
              <ScrollView horizontal style={styles.availableRow} contentContainerStyle={styles.availableContent}>
                <Text style={styles.availableLabel}>Quick add: </Text>
                {availableBooks.slice(0, 5).map(book => (
                  <View key={book.id} style={styles.quickAdd}>
                    <Button title={`+ ${book.title}`} onPress={() => handleAddBook(book.id)} color="#34C759" />
                  </View>
                ))}
              </ScrollView>
            ) : null
          }
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
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  actions: {
    marginBottom: 12,
  },
  spacer: {
    height: 8,
  },
  list: {
    flex: 1,
  },
  bookItem: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  author: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#888',
  },
  availableRow: {
    marginTop: 16,
    marginBottom: 24,
  },
  availableContent: {
    alignItems: 'center',
    paddingRight: 20,
  },
  availableLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  quickAdd: {
    marginRight: 8,
  },
});

export default ListDetailScreen;
