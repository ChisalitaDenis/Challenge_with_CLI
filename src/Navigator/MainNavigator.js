import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ApartmentScreen from '../screens/ApartmentsScreen/ApartmentScreen';
import Profile from '../screens/ProfileScreens/Profile';
import HolderProfile from '../screens/ProfileScreens/HolderProfile';
import roots from './roots';

const MainNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={roots.Home} component={HomeScreen} options={{}} />
        <Stack.Screen
          name={roots.Apartment}
          component={ApartmentScreen}
          options={{}}
        />
        <Stack.Screen name={roots.MyProfile} component={Profile} options={{}} />
        <Stack.Screen
          name={roots.HolderProfile}
          component={HolderProfile}
          options={{}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
