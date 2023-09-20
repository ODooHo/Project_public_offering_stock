import React, { useState, useEffect } from 'react';
import { View,Text,Button,FlatList,StyleSheet,TextInput,TouchableOpacity,ActivityIndicator, } from 'react-native';
import { getMyPageApi,updateMyPageApi,createTradeEntryApi, } from '../API/MyPageApi';
import { useNavigation } from '@react-navigation/native';
import TradeDetail from './TradeDetail';
// MyPageDto 및 PatchUserDto와 관련된 DTO import

const MyPage = () => {
  const [userProfile, setUserProfile] = useState({});
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();

        // 마이페이지 정보 불러오기
        const myPageData = await getMyPageApi(token);
        setUserProfile(myPageData);

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

  const handleUpdateProfile = async () => {
    try {
      const token = await getToken();
      const updatedProfile = {
        // 업데이트할 프로필 정보 추가
      };

      // 사용자 프로필 업데이트 로직 구현
      await updateMyPageApi(token, updatedProfile);

      // 업데이트 후 다시 마이페이지 정보 불러오기
      const myPageData = await getMyPageApi(token);
      setUserProfile(myPageData);
    } catch (error) {
      console.error('Failed to update profile!', error);
    }
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

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <Text style={styles.header}>마이페이지</Text>
          <Text style={styles.userInfo}>
            이메일: {userProfile.userEmail}
          </Text>
          <Text style={styles.userInfo}>
            닉네임: {userProfile.userNickname}
          </Text>
          {/* 기타 정보 표시 */}
        </View>
      )}

      {/* 프로필 수정 섹션 */}
      <View style={styles.actionSection}>
        <Text style={styles.actionHeader}>프로필 수정</Text>
        <TouchableOpacity
          onPress={handleUpdateProfile}
          style={styles.actionButton}
        >
          <Text style={styles.actionButtonText}>프로필 수정</Text>
        </TouchableOpacity>
      </View>

      {/* 매매일지 섹션 */}
      <View style={styles.actionSection}>
        <Text style={styles.actionHeader}>매매일지</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('TradeDetail')} // TradeDetail로 이동
        //   onPress={handleCreateTradeEntry}
          style={styles.actionButton}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 8,
  },
  tradeItem: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  actionSection: {
    marginBottom: 24,
  },
  actionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  actionButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default MyPage;






