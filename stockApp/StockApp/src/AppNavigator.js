import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import MainPage from './pages/MainPage';
import CalendarPage from './pages/CalendarPage'; 
import CommunityPage from './pages/CommunityPage'
import MyPage from './pages/MyPage';
import { BoardDetail } from './pages/BoardDetail';
import { EditProfile } from './pages/EditProfile';
import { TradeDetail } from './pages/TradeDetail';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native';
import WriteBoardPage from './pages/WriteBoardPage';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const ModalStack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName='Main'>
      <Tab.Screen name="Calendar" component={CalendarPage} />
      <Tab.Screen name="Main" component={MainPage} />
      <Tab.Screen name="Community" component={CommunityPage} />
      <Tab.Screen name='MyPage' component={MyPage}/>
    </Tab.Navigator>
  );
}

function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="SignIn" component={SignInPage} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUpPage} options={{ headerShown: true, headerTransparent: true, headerTitle: '', headerBackTitleVisible: false }} />
      <Stack.Screen name="MainStack" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="BoardDetail" component={BoardDetail} />
      <Stack.Screen name="TradeDetail" component={TradeDetail} />
    </Stack.Navigator>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <ModalStack.Navigator screenOptions={{ prsentation: 'modal', headerShown: false }}>
        <ModalStack.Screen name="Main" component={MainStack} />
        <ModalStack.Screen name="EditProfile" component={EditProfile} 
          options={({ navigation, route }) => ({ 
            headerShown: true, 
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text>    취소</Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => route.params?.handleSubmit?.()}>
                <Text>저장    </Text>
              </TouchableOpacity>
            )
          })}
        />
        <ModalStack.Screen name="WriteBoard" component={WriteBoardPage}
          options={({ navigation, route }) => ({
            headerShown: true,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text>    취소</Text>
              </TouchableOpacity>
            ),
            // headerRight: () => (
            //   <TouchableOpacity onPress={() => route.params?.handleSubmit?.()}>
            //     <Text>작성    </Text>
            //   </TouchableOpacity>
            // )
          })}
        />
      </ModalStack.Navigator>
    </NavigationContainer>
  );
}

// function AppNavigator() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login">
//         <Stack.Screen name="SignIn" component={SignInPage} options={{ headerShown: false }} />
//         <Stack.Screen name="SignUp" component={SignUpPage} options={{ headerShown: true, headerTransparent: true, headerTitle: '', headerBackTitleVisible: false }} />
//         <Stack.Screen name="MainStack" component={TabNavigator} options={{ headerShown: false }} />
//         <Stack.Screen name="BoardDetail" component={BoardDetail} />
//         <Stack.Screen name="EditProfile" component={EditProfile} />
//         <Stack.Screen name="TradeDetail" component={TradeDetail} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

export default AppNavigator;