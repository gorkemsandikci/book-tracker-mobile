import React, { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Screen, ScreenHeader, TextField, PrimaryButton, spacing } from '../ui';
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
    navigation.goBack();
  };

  return (
    <Screen>
      <ScreenHeader title="New list" onBack={() => navigation.goBack()} />
      <TextField
        placeholder="List name (e.g. Book club)"
        value={name}
        onChangeText={setName}
        style={styles.field}
      />
      <TextField
        placeholder="Description (optional)"
        value={description}
        onChangeText={setDescription}
        multiline
        style={styles.field}
      />
      <PrimaryButton title="Save list" onPress={handleCreate} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  field: {
    marginBottom: spacing.sm,
  },
});

export default CreateListScreen;
