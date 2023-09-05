import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import signInPage from './src/pages/signInPage';
import signUpPage from './src/pages/signUpPage';
import MainPage from './src/pages/MainPage';
import OtherPage from './src/pages/OtherPage'; 


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Main" component={MainPage} />
      <Tab.Screen name="Other" component={OtherPage} />
      {/* 필요한 만큼 탭 추가 */}
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="signIn" component={signInPage} options={{ headerShown: false }} />
        <Stack.Screen name="signUp" component={signUpPage} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;