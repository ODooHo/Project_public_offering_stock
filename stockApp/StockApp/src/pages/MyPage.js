import React, { useState, useEffect } from 'react';
import { View,Text,Button,FlatList,StyleSheet,TextInput,TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { getMyPageApi,updateMyPageApi,createTradeEntryApi, } from '../API/MyPageApi';
import { useNavigation } from '@react-navigation/native';

import EditProfile from './EditProfile';
import TradeDetail from './TradeDetail';
import { getToken, removeToken } from '../tokenManager';

const MyPage = () => {
  const [userProfile, setUserProfile] = useState({});
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();

        //마이페이지 정보 불러오기
        const myPageData = await getMyPageApi(token);
        setUserProfile(myPageData);

        //사용자 매매일지 불러오기
        //getUserTradesApi()와 관련된 코드 추가

        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch MyPage data!', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdateProfile = () => {
    navigation.navigate('EditProfile', {
      userProfile,
      onUpdate: (updatedProfile) => setUserProfile(updatedProfile)
    });
  };

  const handleCreateTradeEntry = async () => {
    try {
      const token = await getToken();
      const tradeEntryData = {
        // 매매일지 작성 정보 추가
      };

      // 매매일지 작성 로직 구현
      await createTradeEntryApi(token, tradeEntryData);

      // 작성 후 사용자 매매일지 다시 불러오기
      // getUserTradesApi()와 관련된 코드 추가
    } catch (error) {
      console.error('Failed to create trade entry!', error);
    }
  };

  const handleLogout = async () => {
    try {
      await removeToken();
      Alert.alert('로그아웃', '로그아웃되었습니다.');
      navigation.navigate('SignIn');
    } catch (error) {
      Alert.alert('로그아웃 실패', '로그아웃을 실패했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.profileSection}>
          <View style={styles.imageContainer}>
            <Image source={userProfile.image ? { uri: userProfile.image } : require('../assets/default.jpg')} style={styles.profileImage} />
            {/* <Image source={{ uri: userProfile.image || 'default.jpg' }} style={styles.profileImage} /> */}
          </View>
          <View style={styles.userInfoContainer}>
            <Text style={styles.userNickname}>닉네임 {userProfile.userNickname}</Text>
            <Text style={styles.userEmail}>이메일 : {userProfile.userEmail}</Text> 
          </View>
        </View>
      )}

      <View style={styles.actionSection}>
        <TouchableOpacity
          onPress={handleUpdateProfile}
          style={[styles.actionButton, styles.leftActionButton]}
        >
          <Text style={styles.actionButtonText}>프로필 수정</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('TradeDetail')}
        //   onPress={handleCreateTradeEntry}
          style={[styles.actionButton, styles.rightActionButton]}
        >
          <Text style={styles.actionButtonText}>매매일지 작성</Text>
        </TouchableOpacity>
      </View>
      
      {/* 매매일지 목록 표시 */}
      <Text style={styles.header}>매매일지</Text>
      <FlatList
        data={trades}
        keyExtractor={(item) => item.tradeId.toString()}
        renderItem={({ item }) => (
          <View style={styles.tradeItem}>
            {/* 매매일지 항목 표시 */}
          </View>
        )}
      />

      {/* 로그아웃 버튼 */}
      <TouchableOpacity
        onPress={handleLogout}
        style={styles.logoutButton}
      >
        <Text style={styles.actionButtonText}>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    marginRight: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userInfoContainer: {
    flex: 1,
  },
  userNickname: {
    fontSize: 30,
    fontWeight: '500',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 15,
    marginTop: 10,
    color: '#505050'
  },
  tradeItem: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  actionSection: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#77B5FE',
    // #4f97A3, #3A75C4, #003366, #4169E1
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  leftActionButton: {
    marginRight: 5,
  },
  rightActionButton: {
    marginLeft: 5,
  },
  logoutButton:{
    backgroundColor: '#77B5FE',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default MyPage;
