import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import signInStyles from '../styleSheet/signInStyle';

function signInPage({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'ham' && password === '0000') {
      // 로그인 성공 알림
      Alert.alert('로그인 성공', '환영합니다!', [
      // 추가적으로 다른 화면으로 이동하는 코드를 여기에 추가할 수 있습니다.
        { text: "OK", onPress: () => navigation.navigate('Main') }
      ]);
    } else {
      // 로그인 실패 알림
      Alert.alert('로그인 실패', '아이디 또는 비밀번호가 틀렸습니다.');
    }
  };

  return (
    <View style={signInStyles.container}>
      <Text style={signInStyles.title}>로그인</Text>
      <TextInput
        style={signInStyles.input}
        placeholder="아이디"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={signInStyles.input}
        placeholder="비밀번호"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
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