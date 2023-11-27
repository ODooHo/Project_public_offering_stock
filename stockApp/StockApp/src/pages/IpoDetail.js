import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { fetchIpoDetail, addFavoriteIpo, deleteFavoriteIpo, getFavoriteIpo } from '../API/IpoApi';
import useUserStore from '../UserInfo/UserStore';

const screenWidth = Dimensions.get('window').width;

export function IpoDetail({ route }) {
  const [ipoDetail, setIpoDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const { ipoName } = route.params;
  const userInfo = useUserStore((state) => state.user);

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
      const response = await addFavoriteIpo(ipoName, userInfo.userEmail);
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

  const displayCollusionPrice = () => {
    return ipoDetail.finalCollusion && ipoDetail.finalCollusion !== '-' 
           ? `${ipoDetail.finalCollusion} 원`
           : ipoDetail.collusion;
  };

  const formatChartData = (ipoDetail) => {
    const parseNumber = (str) => Number(str.replace(/,/g, ''));
    const labels = ['2021', '2022', '2023'];
    const dataSets = [
      { data: ipoDetail.sale ? ipoDetail.sale.map(parseNumber) : [],},
      { data: ipoDetail.profit ? ipoDetail.profit.map(parseNumber) : [],},
      { data: ipoDetail.pureProfit ? ipoDetail.pureProfit.map(parseNumber) : [],},
    ];
    return {
      labels,
      datasets: dataSets,
    };
  };

  let chartData = { labels: [], datasets: [{ data: [] }] };
  if (Object.keys(ipoDetail).length > 0) {
    chartData = formatChartData(ipoDetail);
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error fetching data</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.ipoName}>{ipoDetail.ipoName}</Text>
        <Text style={styles.ipoCode}>   {ipoDetail.ipoCode}</Text>
        <TouchableOpacity onPress={() => isFavorite ? removeFromFavorites() : addToFavorites()} style={styles.favoriteIconContainer}>
          <Icon
            name={isFavorite ? 'heart' : 'heart-o'}
            size={24}
            color={isFavorite ? 'red' : 'grey'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.importantInfoContainer}>
        <Text style={styles.importantInfoLabel}>공모가:</Text>
        <Text style={styles.importantInfoValue}>{displayCollusionPrice()}</Text>
      </View>
      <View style={styles.importantInfoContainer}>
        <Text style={styles.importantInfoLabel}>주관사:</Text>
        <Text style={styles.importantInfoValue}>{ipoDetail.chief}</Text>
      </View>
      <View style={styles.importantInfoContainer}>
        <Text style={styles.importantInfoLabel}>기관경쟁률:</Text>
        <Text style={styles.importantInfoValue}>{ipoDetail.compete}</Text>
      </View>
      <View style={styles.importantInfoContainer}>
        <Text style={styles.importantInfoLabel}>상장일:</Text>
        <Text style={styles.importantInfoValue}>{ipoDetail.publicDate}</Text>
      </View>
      <View style={styles.ipoInfoContainer}>
        <Text style={styles.chartTitle}>공모정보</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>청약일:</Text>
          <Text style={styles.infoValue}>{ipoDetail.date}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>상장일:</Text>
          <Text style={styles.infoValue}>{ipoDetail.publicDate}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>공모가:</Text>
          <Text style={styles.infoValue}>{ipoDetail.collusion}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>확정 공모가:</Text>
          <Text style={styles.infoValue}>{ipoDetail.finalCollusion}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>의모 보유 확약:</Text>
          <Text style={styles.infoValue}>{ipoDetail.commit}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>보호 예수 물량:</Text>
          <Text style={styles.infoValue}>{ipoDetail.protect}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>보호 예수 비율:</Text>
          <Text style={styles.infoValue}>{ipoDetail.protectPercent}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>유통 가능 물량:</Text>
          <Text style={styles.infoValue}>{ipoDetail.possible}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>유통 가능 비율:</Text>
          <Text style={styles.infoValue}>{ipoDetail.possiblePercent}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>상장 주식 수:</Text>
          <Text style={styles.infoValue}>{ipoDetail.shareQuantity}</Text>
        </View>
      </View>
      <View style={styles.companyInfoContainer}>
        <Text style={styles.chartTitle}>기업정보</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>업종:</Text>
          <Text style={styles.infoValue}>{ipoDetail.business}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>대표명:</Text>
          <Text style={styles.infoValue}>{ipoDetail.owner}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>위치:</Text>
          <Text style={styles.infoValue}>{ipoDetail.locate}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>최대 주주:</Text>
          <Text style={styles.infoValue}>{ipoDetail.shareholder}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>자본금:</Text>
          <Text style={styles.infoValue}>{ipoDetail.seed}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>공모주식수:</Text>
          <Text style={styles.infoValue}>{ipoDetail.ipoQuantity}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>액면가:</Text>
          <Text style={styles.infoValue}>{ipoDetail.faceValue}</Text>
        </View>
      </View>
      <View style={styles.salesInfoContainer}>
        <Text style={styles.chartTitle}>재무 정보</Text>
        <BarChart
          // 여기에 chartData를 전달합니다.
          data={chartData}
          width={screenWidth - 32}
          height={220}
          fromZero={true}
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            barPercentage: 0.5,
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
            marginBottom: 50,
          }}
        />
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  ipoName: {
    fontSize: 24,
    fontWeight: '300',
    marginBottom: 16,
  },
  ipoCode: {
    flex: 1,
    marginTop: -5,
    fontSize: 12,
    color: 'gray'
  },
  favoriteIconContainer: {
    position: 'absolute',
    top: 0,       
    right: 10,
  },
  favoriteIcon: {
    fontSize: 24,
    marginTop: 16,
  },
  importantInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    padding: 16,
    backgroundColor: '#e8f4fd',
    borderRadius: 10
  },
  importantInfoLabel: {
    fontWeight: 'bold',
    color: '#000', // Dark text for better readability
  },
  importantInfoValue: {
    fontWeight: 'bold',
    color: '#000',
  },
  lessImportantInfoContainer: {
    // Style for less important information
  },
  lessImportantInfoLabel: {
    // Style for less important labels
  },
  lessImportantInfoValue: {
    // Style for less important values
  },
  favoriteButton: {
    alignItems: 'center',
    padding: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontWeight: 'bold',
  },
  infoValue: {
    flex: 1,
  },
  ipoInfoContainer: {
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  companyInfoContainer: {
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  salesInfoContainer: {
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
    marginBottom: 15,
  }
});

export default IpoDetail;