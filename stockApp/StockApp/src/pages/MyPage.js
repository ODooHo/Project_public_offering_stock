import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { LogoutApi } from '../API/AuthApi';
import { useNavigation } from '@react-navigation/native';
import useUserStore from '../UserInfo/UserStore';
import { getTrades } from '../API/TradeApi';
import { calculateTotalProfitRate } from './TradeProfit';
import { getProfileImageApi, updateMyPageApi } from '../API/MyPageApi'

const MyPage = () => {
  const userStore = useUserStore();
  const user = userStore.user;
  const [userProfileImage, setUserProfileImage] = useState({});
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [totalProfitRate, setTotalProfitRate] = useState(0);
  const [monthlyProfitRate, setMonthlyProfitRate] = useState(0);

  useEffect(() => {
    const fetchProfileImage = async () => {
        setLoading(true);
        try {
            const imageUrl = await getProfileImageApi(user?.userEmail);
            setUserProfileImage(imageUrl);
        } catch (error) {
            console.error('프로필 이미지 가져오기 실패:', error);
        } finally {
            setLoading(false);
        }
    };

    if (user) {
      fetchProfileImage();
    }
  }, [user]);

  const handleUpdateProfile = () => {
    navigation.navigate('EditProfile', {
      userProfile: user,
      onUpdate: async (updatedProfileInfo) => {
        const newUser = updatedProfileInfo.data ? updatedProfileInfo.data.user : updatedProfileInfo;
        userStore.setUser(newUser);

        const imageUrl = await getProfileImageApi(newUser.userEmail);
        setUserProfileImage(imageUrl);
      }
    });
  };
  
  const handleLogout = async () => {
    try {
      await LogoutApi;
      Alert.alert('로그아웃', '로그아웃되었습니다.');
      navigation.navigate('SignIn');
    } catch (error) {
      Alert.alert('로그아웃 실패', '로그아웃을 실패했습니다.');
    }
  };

  useEffect(() => {
    const fetchTradesAndCalculateProfit = async () => {
      try {
        const response = await getTrades();
        if (response && response.data) {
          setTrades(response.data);
          setTotalProfitRate(calculateTotalProfitRate(response.data));
          const currentMonthTrades = response.data.filter(trade => {
            const tradeDate = new Date(trade.tradeDate);
            const currentDate = new Date();
            return tradeDate.getMonth() === currentDate.getMonth() &&
                   tradeDate.getFullYear() === currentDate.getFullYear();
          });
          setMonthlyProfitRate(calculateTotalProfitRate(currentMonthTrades));
        }
      } catch (error) {
        console.error('거래 정보 가져오기 오류:', error);
      }
    };

    fetchTradesAndCalculateProfit();
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          userProfileImage && (
            // <Image source={image ? { uri: image.uri } : null} style={styles.profileImage} />
            <Image source={{ uri: userProfileImage }} style={styles.profileImage} />
          )
        )}
        <Text style={styles.userNickname}>{user.userNickname}</Text>
        <Text style={styles.userEmail}>{user.userEmail}</Text>
        {/* <Text style={styles.userNickname}>{user.data.user.userNickname}</Text> */}
        {/* <Text style={styles.userEmail}>{user.data.user.userEmail}</Text> */}
      </View>
      {/* <View style={styles.profileSection}>
        {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Image
              source={{ uri: userProfileImage }}
              style={styles.profileImage}
            />
          )}
        <Text style={styles.userNickname}>{user?.userNickname}</Text>
        <Text style={styles.userEmail}>{user?.userEmail}</Text> */}
      {/* </View> */}

      <View style={styles.actionSection}>
        <TouchableOpacity
          onPress={handleUpdateProfile}
          style={[styles.actionButton, styles.leftActionButton]}
        >
          <Text style={styles.actionButtonText}>프로필 수정</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('TradeDetail')}
          style={[styles.actionButton, styles.rightActionButton]}
        >
          <Text style={styles.actionButtonText}>매매일지 작성</Text>
        </TouchableOpacity>
      </View>

      {/* 매매일지 목록 표시 */}
      <View style={styles.profitRateSection}>
        <Text style={styles.profitRateTitle}>수익률</Text>
        <Text style={styles.profitRateText}>총 수익률: {totalProfitRate}%</Text>
        <Text style={styles.profitRateText}>월별 수익률: {monthlyProfitRate}%</Text>
      </View>
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
  logoutButton: {
    backgroundColor: '#77B5FE',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profitRateSection: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginVertical: 10,
  },
  profitRateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8
  },
  profitRateText: {
    fontSize: 16
  },
});

export default MyPage;
