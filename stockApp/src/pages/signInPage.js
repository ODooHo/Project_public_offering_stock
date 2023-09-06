import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import signInStyles from '../styleSheet/SignInStyle';
import { signInApi } from '../API/AuthApi';

function signInPage({ navigation }) {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await signInApi({ userEmail, userPassword }); // 서버에 로그인 요청

      if (response && response.token) {
        // 로그인 성공 알림
        Alert.alert('로그인 성공', '환영합니다!', [
          { text: "OK", onPress: () => navigation.navigate('Main') }
        ]);
      } else {
        // 로그인 실패 알림
        Alert.alert('로그인 실패', '아이디 또는 비밀번호가 틀렸습니다.');
      }
    } catch (error) {
      // 네트워크 오류 또는 서버 오류 시
      Alert.alert('로그인 실패', '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <View style={signInStyles.container}>
      <Text style={signInStyles.title}>로그인</Text>
      <TextInput
        style={signInStyles.input}
        placeholder="이메일"
        onChangeText={setUserEmail}
        value={userEmail}
      />
      <TextInput
        style={signInStyles.input}
        placeholder="비밀번호"
        secureTextEntry
        onChangeText={setUserPassword}
        value={userPassword}
      />
      <View style={signInStyles.buttonContainer}>
        <Button title="로그인" onPress={handleLogin} />
        <Button title="회원가입" onPress={() => navigation.navigate('signUp')} />
      </View>
      <Button title="로그인 없이 이용하기" onPress={() => navigation.navigate('Main')} /> 
    </View>
  );
}

export default signInPage;