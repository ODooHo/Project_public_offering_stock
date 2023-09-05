import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function MainPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Main Page!</Text>
      {/* 버튼 예제: 다른 페이지로 이동하는 버튼 (만약 필요하다면) */}
      {/* <Button title="Go to Details" onPress={() => navigation.navigate('Detail')} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
