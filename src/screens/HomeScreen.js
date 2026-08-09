import React from 'react';
import { View, Text, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadSampleDataIfEmpty, resetAndSeed } from '../store/bootstrap';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const bookCount = useSelector(state => state.books.items.length);
  const listCount = useSelector(state => state.lists.items.length);

  const handleLoadSample = async () => {
    const result = await dispatch(loadSampleDataIfEmpty());
    if (result.seeded) {
      Alert.alert('Sample data loaded', 'Authors, books, and starter lists are ready.');
      return;
    }

    Alert.alert(
      'Library not empty',
      'Overwrite everything with sample authors, books, and lists?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset & Load',
          style: 'destructive',
          onPress: async () => {
            await dispatch(resetAndSeed());
            Alert.alert('Done', 'Sample library and lists loaded.');
          },
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Book Tracker</Text>
      <Text style={styles.subtitle}>
        {bookCount} books · {listCount} lists
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title="My Library"
          onPress={() => navigation.navigate('Library')}
          color="#007AFF"
        />
        <View style={styles.spacer} />
        <Button
          title="My Lists"
          onPress={() => navigation.navigate('Lists')}
          color="#34C759"
        />
        <View style={styles.spacer} />
        <Button
          title="Authors"
          onPress={() => navigation.navigate('AuthorList')}
          color="#FF9500"
        />
        <View style={styles.spacer} />
        <Button
          title="Add Book"
          onPress={() => navigation.navigate('AddBook')}
          color="#5856D6"
        />
        <View style={styles.spacer} />
        <Button
          title="Add Author"
          onPress={() => navigation.navigate('AddAuthor')}
          color="#AF52DE"
        />
        <View style={styles.spacer} />
        <Button
          title="Load Sample Data"
          onPress={handleLoadSample}
          color="#8E8E93"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '80%',
  },
  spacer: {
    height: 12,
  },
});

export default HomeScreen;
