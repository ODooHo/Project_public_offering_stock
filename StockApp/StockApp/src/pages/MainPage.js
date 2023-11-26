import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { addWhitelistedNativeProps } from 'react-native-reanimated/lib/typescript/ConfigHelper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchIpoList } from '../API/IpoApi';
import useUserStore from '../UserInfo/UserStore';

function MainPage({ navigation }) {
  const [ipoList, setIpoList] = useState([]);
  const [ongoingIpoList, setOngoingIpoList] = useState([]);
  const userInfo = useUserStore((state) => state.user);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getIpoList();
    });
    return unsubscribe;
  }, [navigation]);

  const getIpoList = async () => {
    try {
      const response = await fetchIpoList();
      const allIpos = response.data;
      const ongoingIpos = allIpos.filter(ipo => isOngoingIpo(ipo));
      setOngoingIpoList(ongoingIpos);
      setIpoList(allIpos);
    } catch (error) {
      console.error('Error fetching IPO list:', error);
    }
  };

  // const getIpoList = async () => {
  //   try {
  //     const response = await fetchIpoList();
  //     const sortedIpos = response.data
  //       .filter(ipo => ipo.date)  // Ensure we only process IPOs with a date field
  //       .map(ipo => {
  //         const dateRange = ipo.date.split(' ~ ');
  //         return {
  //           ...ipo,
  //           startDate: new Date(dateRange[0].trim().replace(/\./g, '-')),
  //           endDate: new Date(dateRange[1].trim().replace(/\./g, '-'))
  //         };
  //       })
  //       .sort((a, b) => a.startDate - b.startDate);
  
  //     setIpoList(sortedIpos);
  //   } catch (error) {
  //     console.error('Error fetching IPO list:', error);
  //   }
  // };
  const displayCollusionPrice = (ipo) => {
    return ipo.finalCollusion && ipo.finalCollusion !== '-' 
           ? `${ipo.finalCollusion} 원`
           : ipo.collusion;
  };

  const isOngoingIpo = (ipo) => {
    const today = new Date();
    const kstTime = new Date(today.getTime() + (9 * 60 * 60 * 1000)); 
    const dateRange = ipo.date.split('  ~  ');

    if (dateRange.length === 2) {
      const startDate = new Date(dateRange[0].trim().replace(/\./g, '-'));
      const endDate = new Date(dateRange[1].trim().replace(/\./g, '-'));

      // console.log('Today:', kstTime);
      // // console.log('Today:', today);
      // console.log('Start Date:', startDate);
      // console.log('End Date:', endDate);
      
      // const isOngoing = today >= startDate && today <= endDate;
      const isOngoing = kstTime >= startDate && kstTime <= endDate;
      // console.log('Is Ongoing:', isOngoing);
  
      return isOngoing;
    } else {
      console.error('Invalid date format:', ipo.date);
      return false;
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('IpoDetail', { ipoName: item.ipoName })}
    >
      <Text style={styles.ipoTitle}>{item.ipoName}</Text>
      <Text style={styles.ipoDate}>{item.date}</Text>
      <Text style={styles.ipoPrice}>공모가: {displayCollusionPrice(item)}</Text>
      <Text style={styles.ipoChief} numberOfLines={1} ellipsizeMode='tail'>주관사: {item.chief}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* 공모기간 중인 IPO 목록 표시 */}
      <Text style={styles.sectionTitle}>공모기간 중인 IPO</Text>
      <FlatList
        data={ongoingIpoList}
        renderItem={renderItem}
        keyExtractor={(item) => item.ipoName + '_ongoing'}
        contentContainerStyle={{ padding: 10, minHeight: 230 }}
      />
      {/* 전체 IPO 목록 표시 */}
      <Text style={styles.sectionTitle}>전체 IPO 목록</Text>
      <FlatList
        data={ipoList}
        renderItem={renderItem}
        keyExtractor={(item) => item.ipoName}
      />
      {/* <FlatList
        data={ipoList}
        renderItem={renderItem}
        keyExtractor={(item) => item.ipoName}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f8f8f8',
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 10,
  },
  header:{

  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    shadowOpacity: 1,
    elevation: 3,
  },
  ipoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ipoDate: {
    fontSize: 14,
    color: 'grey',
    marginBottom: 4,
  },
  ipoPrice: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  ipoChief: {
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },
});

export default MainPage;
