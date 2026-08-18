import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { TabBar } from '../ui';
import BooksScreen from '../screens/BooksScreen';
import ListsScreen from '../screens/ListsScreen';
import StatsScreen from '../screens/StatsScreen';
import AddBookScreen from '../screens/AddBookScreen';
import AddAuthorScreen from '../screens/AddAuthorScreen';
import AuthorListScreen from '../screens/AuthorListScreen';
import ListDetailScreen from '../screens/ListDetailScreen';
import CreateListScreen from '../screens/CreateListScreen';
import BookDetailScreen from '../screens/BookDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Books"
        component={BooksScreen}
        options={{
          tabBarLabel: 'Books',
          tabBarIconName: 'library-outline',
          tabBarActiveIcon: 'library',
        }}
      />
      <Tab.Screen
        name="Lists"
        component={ListsScreen}
        options={{
          tabBarLabel: 'Lists',
          tabBarIconName: 'list-outline',
          tabBarActiveIcon: 'list',
        }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          tabBarLabel: 'Stats',
          tabBarIconName: 'pie-chart-outline',
          tabBarActiveIcon: 'pie-chart',
        }}
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen name="BookDetail" component={BookDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AddBook" component={AddBookScreen} options={{ title: 'Add Book' }} />
      <Stack.Screen name="AddAuthor" component={AddAuthorScreen} options={{ title: 'Add Author' }} />
      <Stack.Screen name="AuthorList" component={AuthorListScreen} options={{ title: 'Authors' }} />
      <Stack.Screen name="ListDetail" component={ListDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CreateList" component={CreateListScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
