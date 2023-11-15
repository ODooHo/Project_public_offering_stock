import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import useUserStore from '../UserInfo/UserStore';
import { fetchBoardList, searchBoards, fetchRecentSearches, deleteSearchesTerm } from '../API/BoardApi';

const CommunityPage = ({ navigation }) => {
  const [boards, setBoards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [showRecentSearches, setShowRecentSearches] = useState(false);

  const userInfo = useUserStore((state) => state.user);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getBoardList();
      getRecentSearches();
    });

    return unsubscribe;
  }, [navigation]);

  const onSearch = async () => {
    if (!searchTerm) return;
    try {
      const searchDto = { searchContent: searchTerm };
      const response = await searchBoards(searchDto);
      setBoards(response.data);
      setShowRecentSearches(false);
      await getRecentSearches();
    } catch (error) {
      console.error('Error searching boards:', error);
    }
  };

  const getRecentSearches = async () => {
    try {
      const response = await fetchRecentSearches();
      setRecentSearches(response.data);
    } catch (error) {
      console.error('Error fetching recent searches:', error);
    }
  };

  const onRecentSearchTermClick = async (term) => {
    setSearchTerm(term.searchContent);
    onSearch();
  };

  const getBoardList = async () => {
    try {
      const response = await fetchBoardList();
      setBoards(response.data);
    } catch (error) {
      console.error('Error fetching board list:', error);
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

  const handleCreateBoard = () => {
    navigation.navigate('WriteBoard');
  };

  function renderItem({ item }) {
    return (
      <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('BoardDetail', { boardId: item.boardId })}>
        <View style={styles.boardContent}>
          <Text style={styles.boardWriter}>{item.boardWriterNickname}</Text>
          <Text style={styles.boardTitle} numberOfLines={1} ellipsizeMode='tail'>{item.boardTitle}</Text>
          <Text style={styles.boardPreview} numberOfLines={1} ellipsizeMode='tail'>{item.boardContent}</Text>
          {/* <Text style={styles.boardInfo}>Click{item.boardClickCount} Like{item.boardLikeCount} Comment{item.boardCommentCount} {item.boardWriteDate}</Text> */}
          <View style={styles.boardInfo}>
            <FontAwesome5 name="eye" style={styles.icon}/>
            <Text style={styles.boardInfoText}>{item.boardClickCount}</Text>
            <FontAwesome5 name="heart" style={styles.icon} />
            <Text style={styles.boardInfoText}>{item.boardLikeCount}</Text>
            <FontAwesome5 name="comment" style={styles.icon}/>
            <Text style={styles.boardInfoText}>{item.boardCommentCount}   {item.boardWriteDate}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  const CreateBoardButton = () => {
    return (
      <TouchableOpacity
        style={styles.createBoardButton}
        onPress={handleCreateBoard}
      >
        <Text style={styles.createBoardButtonText}>+</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="검색..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          onFocus={onSearchInputFocus}
        />
        <TouchableOpacity style={styles.searchButton} onPress={onSearch}>
          <Text style={styles.searchButtonText}>검색</Text>
        </TouchableOpacity>
      </View>
      {showRecentSearches && recentSearches.length > 0 && (
        <View style={styles.recentSearchesContainer}>
          {recentSearches.map((term, index) => (
            <View key={index} style={styles.recentSearchItem}>
                <Text style={{flex: 1}} onPress={() => onRecentSearchTermClick(term)}>{term.searchContent}</Text>
                <TouchableOpacity onPress={() => deleteRecentSearch(term.searchId)}>
                  <Text style={styles.deleteButtonText}>삭제</Text>
                </TouchableOpacity>
                {/* <Button title="삭제" onPress={() => deleteRecentSearch(term.searchId)} /> */}
            </View>
          ))}
        </View>
      )}
      <FlatList
        data={boards}
        renderItem={renderItem}
        keyExtractor={(item) => item.boardId.toString()}
      />
      <CreateBoardButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15
  },
  listItem: {
    backgroundColor: 'white',
    borderBottomWidth: 1.5,
    borderBottomColor: '#e1e1e1',
    // paddingVertical: 8,
    paddingHorizontal: 20,
    padding: 13,
    // marginVertical: 0,
    // borderRadius: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  boardContent: {
    flex: 1,
  },
  boardWriter: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 8,
  },
  boardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  boardPreview: {
    fontSize: 13,
    fontWeight: '300',
    marginBottom: 10,
  },
  boardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: -5,
  },
  boardInfoText:{
    fontSize: 12,
    color: 'grey',
    marginRight: 15,
  },
  icon: {
    color: 'grey',
    marginRight: 2,
  },
  writeButton: {
    marginVertical: 15,
    alignSelf: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
  },
  createBoardButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: 'skyblue', // 노란색
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000', // iOS용 그림자
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  createBoardButtonText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  searchButton:{
    padding: 6,
    backgroundColor: 'skyblue',
    borderRadius: 5,
    marginLeft: 5,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: '400',
  },
  deleteButtonText: {
    color: 'red', // 삭제 버튼 텍스트 색상
    fontWeight: 'bold', // 글씨 굵기
    padding: 5, // 삭제 텍스트 주변 패딩
    color: '#FF0000',
  },
  
});

export default CommunityPage;