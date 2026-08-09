import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addBook, saveBooks } from '../store/bookSlice';
import { loadAuthors } from '../store/authorSlice';

const AddBookScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [notes, setNotes] = useState('');
  const dispatch = useDispatch();
  const authors = useSelector(state => state.authors.items);

  useEffect(() => {
    dispatch(loadAuthors());
  }, [dispatch]);

  const handleAddBook = () => {
    if (title.trim() === '') return;

    const newBook = {
      title,
      authorId: selectedAuthor,
      notes,
    };
    dispatch(addBook(newBook));
    dispatch(saveBooks());

    setTitle('');
    setSelectedAuthor('');
    setNotes('');

    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add Book</Text>

      <TextInput
        style={styles.input}
        placeholder="Book Title"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Select Author:</Text>
      <View style={styles.authorSelector}>
        {authors.length === 0 ? (
          <Text style={styles.emptyAuthors}>No authors yet. Add an author first.</Text>
        ) : (
          authors.map(author => (
            <View key={author.id} style={styles.authorButton}>
              <Button
                title={author.name}
                onPress={() => setSelectedAuthor(author.id)}
                color={selectedAuthor === author.id ? '#007AFF' : '#888'}
              />
            </View>
          ))
        )}
      </View>

      <TextInput
        style={[styles.input, styles.notes]}
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      <Button title="Save Book" onPress={handleAddBook} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  authorSelector: {
    marginBottom: 20,
  },
  authorButton: {
    marginBottom: 8,
  },
  emptyAuthors: {
    color: '#888',
    marginBottom: 10,
  },
  notes: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default AddBookScreen;
