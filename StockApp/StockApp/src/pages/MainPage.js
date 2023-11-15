import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchIpoList, searchIpo, fetchRecentSearches } from '../API/IpoApi';
import { deleteSearchesTerm } from '../API/BoardApi';
import useUserStore from '../UserInfo/UserStore';

function MainPage({ navigation }) {
  const [ipoList, setIpoList] = useState([]);
  const [ongoingIpoList, setOngoingIpoList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [showRecentSearches, setShowRecentSearches] = useState(false);

  const userInfo = useUserStore((state) => state.user);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getIpoList();
      getRecentSearches();
    });

    return unsubscribe;
  }, [navigation]);

  const onSearch = async () => {
    if (!searchTerm) return;
    try {
      const searchDto = {
        searchContent: searchTerm,
      };
      const response = await searchIpo(searchDto);
      setIpoList(response.data);
      setShowRecentSearches(false);
      await getRecentSearches();
    } catch (error) {
      console.error('Error searching IPOs:', error);
    }
  };

  const getRecentSearches = async () => {
    try {
      const response = await fetchRecentSearches();
      console.log('서버 응답:', response);
      setRecentSearches(response.data);
    } catch (error) {
      console.log('Error fetching recent searches:', error);
    }
  };

  const onRecentSearchTermClick = (term) => {
    setSearchTerm(term.searchContent);
    onSearch();
  };

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

  const deleteRecentSearch = async (searchId) => {
    try {
      await deleteSearchesTerm(searchId);
      getRecentSearches();
    } catch (error) {
      console.error('Error deleting recent search:', error);
    }
  };

  const onSearchInputFocus = () => {
    setShowRecentSearches(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => navigation.navigate('IpoDetail', { ipoName: item.ipoName })}
    >
      <Text style={styles.ipoName}>{item.ipoName}</Text>
      <Text style={styles.dateText}>{item.date}</Text>
    </TouchableOpacity>
  );
  
  const isOngoingIpo = (ipo) => {
    // const koreanTime = getKoreanTime();
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
      // 날짜 형식이 잘못된 경우 처리
      console.error('Invalid date format:', ipo.date);
      return false;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search IPOs"
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
          onFocus={onSearchInputFocus}
          style={styles.searchInput}
        />
        <TouchableOpacity onPress={onSearch} style={styles.searchButton}>
          <Icon name="search" size={25} color="white" />
        </TouchableOpacity>
        {/* <Button title="Search" onPress={onSearch} /> */}
      </View>
      {showRecentSearches && recentSearches.length > 0 && (
        <View style={styles.recentSearchesContainer}>
          {recentSearches.map((term) => (
            <View key={term.searchId} style={styles.recentSearchItem}>
              <Text onPress={() => onRecentSearchTermClick(term)}>
                {term.searchContent}
              </Text>
              <Button title="삭제" onPress={() => deleteRecentSearch(term.searchId)} />
            </View>
          ))}
          {/* {recentSearches.map((term, index) => (
            <View key={index} style={styles.recentSearchItem}>
              <Text onPress={() => onRecentSearchTermClick(term)}>
                {term.searchContent}
              </Text>
              <Button title="삭제" onPress={() => deleteRecentSearch(term.searchId)} />
            </View>
          ))} */}
        </View>
      )}

      {/* 공모기간 중인 IPO 목록 표시 */}
      <Text style={styles.sectionTitle}>공모기간 중인 IPO</Text>
      <FlatList
        data={ongoingIpoList}
        renderItem={renderItem}
        keyExtractor={(item) => item.ipoName + '_ongoing'}
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
    backgroundColor: '#f8f8f8',
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 10,
  },
  listItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ipoName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  // ongoingText: {
  //   color: 'green', 
  // },
  recentSearchesContainer: {
    marginBottom: 15,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 25,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    padding: 8,
    marginRight: 10,
    fontSize: 16,
  },
  searchButton: {
    padding: 8,
    backgroundColor: '#007bff',
    borderRadius: 25,
  },
  listItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
  },
  ipoName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateText: {
    color: 'gray',
  },
});

export default MainPage;
