import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import LibraryScreen from './src/screens/LibraryScreen';
import ListsScreen from './src/screens/ListsScreen';
import ListDetailScreen from './src/screens/ListDetailScreen';
import CreateListScreen from './src/screens/CreateListScreen';
import AddBookScreen from './src/screens/AddBookScreen';
import AddAuthorScreen from './src/screens/AddAuthorScreen';
import AuthorListScreen from './src/screens/AuthorListScreen';
import store from './src/store';
import { loadAppData } from './src/store/bootstrap';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    store.dispatch(loadAppData());
  }, []);

  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Book Tracker' }} />
          <Stack.Screen name="Library" component={LibraryScreen} options={{ title: 'My Library' }} />
          <Stack.Screen name="Lists" component={ListsScreen} options={{ title: 'My Lists' }} />
          <Stack.Screen name="ListDetail" component={ListDetailScreen} options={{ title: 'List' }} />
          <Stack.Screen name="CreateList" component={CreateListScreen} options={{ title: 'Create List' }} />
          <Stack.Screen name="AddBook" component={AddBookScreen} options={{ title: 'Add Book' }} />
          <Stack.Screen name="AddAuthor" component={AddAuthorScreen} options={{ title: 'Add Author' }} />
          <Stack.Screen name="AuthorList" component={AuthorListScreen} options={{ title: 'Authors' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
