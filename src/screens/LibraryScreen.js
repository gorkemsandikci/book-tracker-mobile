import React from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeBook, saveBooks } from '../store/bookSlice';
import {
  addBookToList,
  removeBookFromAllLists,
  saveLists,
} from '../store/listSlice';

const LibraryScreen = ({ navigation }) => {
  const books = useSelector(state => state.books.items);
  const authors = useSelector(state => state.authors.items);
  const lists = useSelector(state => state.lists.items);
  const dispatch = useDispatch();

  const getAuthorName = (authorId) => {
    const author = authors.find(a => a.id === authorId);
    return author ? author.name : 'Unknown';
  };

  const handleDeleteBook = (id) => {
    Alert.alert(
      'Delete Book',
      'This removes the book from your library and all lists. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch(removeBook(id));
            dispatch(removeBookFromAllLists(id));
            dispatch(saveBooks());
            dispatch(saveLists());
          },
        },
      ]
    );
  };

  const handleAddToList = (bookId) => {
    if (lists.length === 0) {
      Alert.alert('No Lists', 'Create a list first in My Lists.');
      return;
    }

    Alert.alert(
      'Add to List',
      'Choose a list',
      [
        ...lists.map(list => ({
          text: list.name,
          onPress: () => {
            dispatch(addBookToList({ listId: list.id, bookId }));
            dispatch(saveLists());
            Alert.alert('Added', `Book added to "${list.name}".`);
          },
        })),
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.bookItem}>
      <Text style={styles.bookTitle}>{item.title}</Text>
      <Text style={styles.author}>Author: {getAuthorName(item.authorId)}</Text>
      {item.notes ? <Text style={styles.notes}>{item.notes}</Text> : null}
      <View style={styles.actions}>
        <Button title="Add to List" onPress={() => handleAddToList(item.id)} color="#007AFF" />
        <View style={styles.actionSpacer} />
        <Button title="Delete" onPress={() => handleDeleteBook(item.id)} color="#ff0000" />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Library</Text>
      <Text style={styles.subtitle}>
        {books.length} book{books.length === 1 ? '' : 's'} in catalog
      </Text>
      <Button title="Add New Book" onPress={() => navigation.navigate('AddBook')} />
      {books.length === 0 ? (
        <Text style={styles.emptyMessage}>
          No books yet. Add one or load sample data from Home.
        </Text>
      ) : (
        <FlatList
          style={styles.list}
          data={books}
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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  list: {
    marginTop: 12,
  },
  bookItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  author: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  notes: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  actions: {
    marginTop: 8,
  },
  actionSpacer: {
    height: 8,
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
});

export default LibraryScreen;
