import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUp/SignUpPage';
import MainPage from './pages/MainPage';
import CalendarPage from './pages/CalendarPage'; 
import CommunityPage from './pages/CommunityPage'
import MyPage from './pages/MyPage';
import { BoardDetail } from './pages/BoardDetail';
import { EditProfile } from './pages/EditProfile';
import { TradeDetail } from './pages/TradeDetail';
import WriteBoardPage from './pages/WriteBoardPage';
import IpoDetail from './pages/IpoDetail';
import SearchPage from './pages/SearchPage';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const ModalStack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName='Main' screenOptions={{ tabBarStyle: { height: 50}, tabBarLabel: () => null }}>
      <Tab.Screen name="Calendar" component={CalendarPage} options={{ headerShown: false, tabBarIcon: ({ color, size }) => (<Icon name="calendar-outline" color={color} size={size} />), }}/>
      <Tab.Screen name="Main" component={MainPage}
        options={({ navigation }) => ({
          headerShown: true,
          headerTransparent: true,
          headerTitle: '',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('SearchPage', { searchType: 'ipo' })} style={{ marginRight: 12 }}>
              <Icon name="search" size={25} color="#000" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color, size }) => (<AntDesign name="home" color={color} size={size} />),
        })}/>
      <Tab.Screen name="Community" component={CommunityPage}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "커뮤니티",
          tabBarIcon: ({ color, size }) => (<Feather name="users" color={color} size={size} />), 
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('SearchPage', { searchType: 'community' })} style={{ marginRight: 12 }}>
              <Icon name="search" size={25} color="#000" />
            </TouchableOpacity>
          ),
        })}/>
      <Tab.Screen name='MyPage' component={MyPage} options={{ tabBarIcon: ({ color, size }) => (<Icon name="person-circle-outline" color={color} size={35} />), }}/>
    </Tab.Navigator>
  );
}

function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="SignIn" component={SignInPage} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUpPage} options={{ headerShown: true, headerTransparent: true, headerTitle:'', headerBackTitleVisible: false }} />
      <Stack.Screen name="MainStack" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="BoardDetail" component={BoardDetail} options={{ headerShown: true, headerTitle:'게시글', headerBackTitleVisible: false }} />
      <Stack.Screen name="TradeDetail" component={TradeDetail} options={{ headerShown: true, headerTitle:'매매일지', headerBackTitleVisible: false }}/>
      <Stack.Screen name="IpoDetail" component={IpoDetail} options={{ headerShown: true, headerTitle: '공모주 상세정보', headerBackTitleVisible: false }}/>
      <Stack.Screen name="SearchPage" component={SearchPage} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <ModalStack.Navigator screenOptions={{ presentation: 'modal', headerShown: false }}>
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
            headerTitle: route.params?.board ? "게시글 수정" : "게시글 작성",
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text>    취소</Text>
              </TouchableOpacity>
            ),
          })}
        />
      </ModalStack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;