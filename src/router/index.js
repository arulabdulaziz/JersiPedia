import React from 'react'
import { View, Text } from 'react-native'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Home,
  Splash,
  ListJerseyPage,
  Profile,
  JerseyDetail
} from '../pages';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import {BottomNavigation} from "../components"
const MainApp = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigation {...props} />}>
      <Tab.Screen 
       component={Home}
       name="Home" 
       options={{headerShown: false}} />
      <Tab.Screen
        component={ListJerseyPage}
        name="ListJersey"
        options={{title: 'Jersey', headerShown: false}}
      />
      <Tab.Screen
        component={Profile}
        name="Profile"
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}
const Router = () => {
    return (
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          component={Splash}
          name="Splash"
          options={{headerShown: false}}
        />

        <Stack.Screen
          component={MainApp}
          name="MainApp"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={JerseyDetail}
          name="JerseyDetail"
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
}

export default Router
