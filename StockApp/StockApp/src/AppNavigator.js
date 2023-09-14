import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import MainPage from './pages/MainPage';
import OtherPage from './pages/OtherPage'; 
import CommunityPage from './pages/CommunityPage'
import { BoardDetail } from './pages/BoardDetail';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName='Main'>
      <Tab.Screen name="Other" component={OtherPage} />
      <Tab.Screen name="Main" component={MainPage} />
      <Tab.Screen name="Community" component={CommunityPage} />
      {/* 필요한 만큼 탭 추가 */}
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="SignIn" component={SignInPage} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpPage} options={{ headerShown: false }} />
        <Stack.Screen name="MainStack" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="BoardDetail" component={BoardDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;