import React, { useState, useEffect } from 'react';
import { View,Text,Button,FlatList,StyleSheet,TextInput,TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { getProfileImageApi,createTradeEntryApi, } from '../API/MyPageApi';
import { useNavigation } from '@react-navigation/native';
import useUserStore from '../UserInfo/UserStore';

import EditProfile from './EditProfile';
import TradeDetail from './TradeDetail';

const SERVER_URL = 'http://15.165.24.146:8080';

const MyPage = () => {
  const userStore = useUserStore();
  const { user, setUser } = userStore;
  // const userProfileInfo = userStore.user;
  const [userProfileImage, setUserProfileImage] = useState({});
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  console.log("정보확인:", user);

  useEffect(() => {
    if (user) {
      setUserProfileImage(user.userProfile); // 이미지 URL 업데이트
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const imageUrl = await getProfileImageApi();
        console.log("가져온 이미지 url확인:", imageUrl);
        if (imageUrl) {
          setUserProfileImage(imageUrl);
        } else {
          console.log("유효한 이미지 URL이 없습니다.")
        }
        // setUserProfileImage(imageUrl);
        // 사용자 매매일지 불러오기
        // getUserTradesApi()와 관련된 코드 추가
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch MyPage data!', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleUpdateProfile = () => {
    if (!user || !user.userNickname) {
      Alert.alert('오류', '필요한 프로필 정보가 없습니다.');
      return;
    }
    navigation.navigate('EditProfile', {
      userProfile: user,
      userProfileImage,
      onUpdate: (updatedProfileInfo) => {
        setUser(updatedProfileInfo);
      }
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
            {userProfileImage ? (
              <Image source={{ uri: userProfileImage }} style={styles.profileImage} />
            ) : (
              <Text>프로필 이미지가 없습니다.</Text>
            )}
          </View>
          <View style={styles.userInfoContainer}>
            {user && (
              <>
                <Text style={styles.userNickname}>{user.userNickname}</Text>
                <Text style={styles.userEmail}>{user.userEmail}</Text> 
              </>
            )}
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