import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addList, saveLists } from '../store/listSlice';

const CreateListScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleCreate = () => {
    if (name.trim() === '') {
      Alert.alert('Name required', 'Please enter a list name.');
      return;
    }

    dispatch(addList({ name: name.trim(), description: description.trim() }));
    dispatch(saveLists());
    setName('');
    setDescription('');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create List</Text>
      <TextInput
        style={styles.input}
        placeholder="List name (e.g. Want to Read)"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[styles.input, styles.description]}
        placeholder="Description (optional)"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button title="Save List" onPress={handleCreate} color="#34C759" />
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
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  description: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default CreateListScreen;
