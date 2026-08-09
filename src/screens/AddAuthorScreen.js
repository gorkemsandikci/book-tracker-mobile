import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addAuthor, saveAuthors } from '../store/authorSlice';

const AddAuthorScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [nationality, setNationality] = useState('');
  const dispatch = useDispatch();

  const handleAddAuthor = () => {
    if (name.trim() === '') return;

    const newAuthor = {
      name,
      birthYear: birthYear || '',
      nationality: nationality || '',
    };
    dispatch(addAuthor(newAuthor));
    dispatch(saveAuthors());

    setName('');
    setBirthYear('');
    setNationality('');

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Author</Text>
      <TextInput
        style={styles.input}
        placeholder="Author Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Birth Year"
        value={birthYear}
        onChangeText={setBirthYear}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Nationality"
        value={nationality}
        onChangeText={setNationality}
      />
      <Button title="Save Author" onPress={handleAddAuthor} />
    </View>
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
});

export default AddAuthorScreen;
