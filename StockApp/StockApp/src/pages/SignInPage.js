import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { setRefreshToken, setToken, getToken } from '../tokenManager';
import { SignInApi, getAccessTokenApi } from '../API/AuthApi';
import SignInStyles  from '../styleSheet/SignInStyle';
import useUserStore from '../UserInfo/UserStore';

const SignInPage = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await SignInApi({ userEmail, userPassword });
  
      if (response && response.data) {
        const { token, refreshToken, user } = response.data;
  
        if (token) {
          console.log("Received Token: ", token); // 받은 토큰 값 출력
          await setToken(token);
          await setRefreshToken(refreshToken);
  
          // 사용자 상태 설정
          useUserStore.getState().setUser(user);
  
          Alert.alert('로그인 성공', '환영합니다!', [
            { text: "OK", onPress: () => navigation.navigate('MainStack') }
          ]);
        } else {
          // 응답에 token이 없을 경우
          console.log('Unexpected response:', response);
          Alert.alert('로그인 실패', '아이디 또는 비밀번호가 틀렸습니다.');
        }
      } else {
        // response가 null이거나 data 속성이 없을 경우
        console.log('Invalid response object:', response);
        Alert.alert('로그인 실패', '서버 응답이 올바르지 않습니다.');
      }
    } catch (error) {
      if (error.response){
        console.log(error.response.data);
      } else if (error.request) {
        console.log('The request was made but no response was received');
      } else {
        console.log('Error', error.message);
      }
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  const fetchDataWithToken = async () => {
    try {
      const token = await getToken();
      // console.log('Stored Token: ', token); //저장된 토큰 값 출력
      const response = await getAccessTokenApi(token);
      if (response && response.data && response.data.token) {
        await setToken(response.data.token);
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchDataWithToken();
  }, []);


  return (
    <View style={SignInStyles.container}>
      <Text style={SignInStyles.title}>로그인</Text>
      <TextInput
        style={SignInStyles.input}
        placeholder="이메일"
        onChangeText={setUserEmail}
        value={userEmail}
      />
      <TextInput
        style={SignInStyles.input}
        placeholder="비밀번호"
        secureTextEntry
        onChangeText={setUserPassword}
        value={userPassword}
      />
      <View style={SignInStyles.buttonContainer}>
        <Button title="로그인" onPress={handleLogin} color="#007AFF" />
        {/* <Button title="회원가입" onPress={() => navigation.navigate('SignUp')} color="#007AFF" /> */}
        <Button title="회원가입" onPress={handleSignUp} color="#007AFF" />
      </View>
      <Button title="로그인 없이 이용하기" onPress={() => navigation.navigate('MainStack')} color="#007AFF" /> 
    </View>
  );
}


export default SignInPage;