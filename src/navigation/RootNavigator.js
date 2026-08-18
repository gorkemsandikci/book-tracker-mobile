import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
const Stack = createNativeStackNavigator();

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
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { flex: 1, backgroundColor: '#F2F2F7' },
        gestureEnabled: true,
        fullScreenGestureEnabled: false,
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="BookDetail" component={BookDetailScreen} />
      <Stack.Screen name="AddBook" component={AddBookScreen} options={{ headerShown: true, title: 'Add Book' }} />
      <Stack.Screen name="AddAuthor" component={AddAuthorScreen} options={{ headerShown: true, title: 'Add Author' }} />
      <Stack.Screen name="AuthorList" component={AuthorListScreen} options={{ headerShown: true, title: 'Authors' }} />
      <Stack.Screen name="ListDetail" component={ListDetailScreen} />
      <Stack.Screen name="CreateList" component={CreateListScreen} />
    </Stack.Navigator>
  );
}
