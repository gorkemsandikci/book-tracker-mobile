import React, { useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeAuthor, saveAuthors, loadAuthors } from '../store/authorSlice';

const AuthorListScreen = ({ navigation }) => {
  const authors = useSelector(state => state.authors.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAuthors());
  }, [dispatch]);

  const handleDeleteAuthor = (id) => {
    Alert.alert(
      'Delete Author',
      'Are you sure you want to delete this author?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch(removeAuthor(id));
            dispatch(saveAuthors());
          }
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.authorItem}>
      <Text style={styles.authorName}>{item.name}</Text>
      {item.birthYear ? <Text>Birth Year: {item.birthYear}</Text> : null}
      {item.nationality ? <Text>Nationality: {item.nationality}</Text> : null}
      <Button
        title="Delete"
        onPress={() => handleDeleteAuthor(item.id)}
        color="#ff0000"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Author List</Text>
      <Button
        title="Add New Author"
        onPress={() => navigation.navigate('AddAuthor')}
      />
      {authors.length === 0 ? (
        <Text style={styles.emptyMessage}>No authors added yet</Text>
      ) : (
        <FlatList
          data={authors}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  authorItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  authorName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
});

export default AuthorListScreen;
