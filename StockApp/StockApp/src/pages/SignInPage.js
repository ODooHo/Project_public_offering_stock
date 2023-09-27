import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { setRefreshToken, setToken, getToken } from '../tokenManager';
import { SignInApi, getAccessTokenApi } from '../API/AuthApi';
import SignInStyles  from '../styleSheet/SignInStyle';

const SignInPage = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await SignInApi({ userEmail, userPassword });

      if (response && response.data && response.data.token) {
        await setToken(response.data.token);
        await setRefreshToken(response.data.refreshToken)

        Alert.alert('로그인 성공', '환영합니다!', [
          { text: "OK", onPress: () => navigation.navigate('Main') }
        ]);
      } else {
        Alert.alert('로그인 실패', '아이디 또는 비밀번호가 틀렸습니다.');
      }
    } catch (error) {
      Alert.alert('로그인 실패', '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  const fetchDataWithToken = async () => {
    try {
      const token = await getToken();
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
      <Button title="로그인 없이 이용하기" onPress={() => navigation.navigate('Main')} color="#007AFF" /> 
    </View>
  );
}


export default SignInPage;
