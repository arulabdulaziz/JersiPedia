import React from 'react';
import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Home,
  Splash,
  ListJerseyPage,
  Profile,
  JerseyDetail,
  Chart,
  Checkout,
  EditProfile,
  ChangePassword,
  History,
  Login,
  Register1,
  Register2,
} from '../pages';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import {BottomNavigation} from '../components';
const MainApp = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigation {...props} />}>
      <Tab.Screen component={Home} name="Home" options={{headerShown: false}} />
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
};
const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Register2">
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
      <Stack.Screen
        component={Chart}
        name="Chart"
        options={{headerShown: true, title: 'Keranjang'}}
      />
      <Stack.Screen
        component={Checkout}
        name="Checkout"
        options={{headerShown: true, title: 'Checkout'}}
      />
      <Stack.Screen
        component={EditProfile}
        name="EditProfile"
        options={{headerShown: true, title: 'Edit Profile'}}
      />
      <Stack.Screen
        component={ChangePassword}
        name="ChangePassword"
        options={{headerShown: true, title: 'Change Password'}}
      />
      <Stack.Screen
        component={History}
        name="History"
        options={{headerShown: true, title: 'Riwayat Pemesanan'}}
      />
      <Stack.Screen
        component={Login}
        name="Login"
        options={{headerShown: false, title: 'Login'}}
      />
      <Stack.Screen
        component={Register1}
        name="Register1"
        options={{headerShown: false, title: 'Register1'}}
      />
      <Stack.Screen
        component={Register2}
        name="Register2"
        options={{headerShown: false, title: 'Register2'}}
      />
    </Stack.Navigator>
  );
};

export default Router;
