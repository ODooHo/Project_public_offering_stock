import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { fetchIpoDetail, addFavoriteIpo, deleteFavoriteIpo, getFavoriteIpo } from '../API/IpoApi';
import useUserStore from '../UserInfo/UserStore';

export function IpoDetail({ route }) {
  const [ipoDetail, setIpoDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const { ipoName } = route.params;

  const getIpoDetail = useCallback(async () => {
    try {
      const data = await fetchIpoDetail(ipoName);
      setIpoDetail(data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setError(error);
      setLoading(false);
    }
  }, [ipoName]);

  const checkIfFavorite = useCallback(async () => {
    try {
      const response = await getFavoriteIpo();
      const favoriteList = response.data;
      setIsFavorite(favoriteList.some(favor => favor.ipoName === ipoName));
    } catch (error) {
      console.error('Error fetching favorite IPOs:', error);
    }
  }, [ipoName]);

  useEffect(() => {
    const initializeData = async () => {
      await getIpoDetail();
      await checkIfFavorite();
    };
    initializeData();
  }, [getIpoDetail, checkIfFavorite]);

  const addToFavorites = async () => {
    try {
      const response = await addFavoriteIpo(ipoName);
      if (response && response.data) {
        console.log("관심종목 추가 응답:", response.data);
        setIsFavorite(true);
      } else {
        console.log("관심종목 추가 실패, 응답 없음", response);
      }
    } catch (error) {
      console.error('관심종목 추가 중 오류:', error);
      if (error.response) {
        console.error('HTTP status:', error.response.status);
        console.error('Http response:,', error.response.data);
      }
    }
  };

  const removeFromFavorites = async () => {
    try {
      console.log("Removing IPO with name:", ipoName);
      const response = await deleteFavoriteIpo(ipoName);
      if (response && response.data) {
        console.log("관심종목 삭제 응답:", response.data);
        setIsFavorite(false);
      } else {
        console.log("관심종목 삭제 실패, 응답 없음");
      }
    } catch (error) {
      console.error('관심종목 삭제 중 오류:', error);
    }
  };

  // const addToFavorites = async () => {
  //   try {
  //     const response = await addFavoriteIpo(ipoName);
  //     console.log("관심:", response.data);
  //     setIsFavorite(true);
  //   } catch (error) {
  //     console.error('Error adding to favorites:', error);
  //   }
  // };

  // const removeFromFavorites = async () => {
  //   try {
  //     await deleteFavoriteIpo(ipoName);
  //     setIsFavorite(false);
  //   } catch (error) {
  //     console.error('Error removing from favorites:', error);
  //   }
  // };
  
  // const removeFromFavorites = async () => {
  //   try {
  //     console.log("Removing IPO with name:", ipoName); 
  //     const response = await deleteFavoriteIpo(ipoName);
  //     console.log("remove IPO:", response.data);
  //     setIsFavorite(false);
  //   } catch (error) {
  //     console.error('Error removing from favorites:', error);
  //   }
  // };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error fetching data</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: '#f8f8f8' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>{ipoDetail.ipoName}</Text>
      <Text>대표명: {ipoDetail.owner}</Text>
      <Text>종목 코드: {ipoDetail.ipoCode}</Text>
      <Text>자본금: {ipoDetail.seed}</Text>
      <Text>업종: {ipoDetail.business}</Text>
      <Text>매출액: {ipoDetail.sale && ipoDetail.sale.join(', ')}</Text>
      <Text>영업이익: {ipoDetail.profit && ipoDetail.profit.join(', ')}</Text>
      <Text>순 이익: {ipoDetail.pureProfit && ipoDetail.pureProfit.join(', ')}</Text>
      <TouchableOpacity onPress={() => isFavorite ? removeFromFavorites() : addToFavorites()}>
        {isFavorite ? (
          <Text style={{ fontSize: 24, color: 'red' }}>❤️</Text>
        ) : (
          <Text style={{ fontSize: 24 }}>🤍</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

export default IpoDetail;
