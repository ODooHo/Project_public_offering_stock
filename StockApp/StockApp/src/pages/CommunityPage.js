import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import useUserStore from '../UserInfo/UserStore';
import { fetchBoardList } from '../API/BoardApi';

const CommunityPage = ({ navigation }) => {
  const [boards, setBoards] = useState([]);
  const userInfo = useUserStore((state) => state.user);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getBoardList();
    });
    return unsubscribe;
  }, [navigation]);

  const getBoardList = async () => {
    try {
      const response = await fetchBoardList();
      setBoards(response.data);
    } catch (error) {
      console.error('Error fetching board list:', error);
    }
  };

  const handleCreateBoard = () => {
    navigation.navigate('WriteBoard');
  };

  // const navigateToSearch = () => {
  //   navigation.navigate('SearchPage', {
  //     searchType: 'community',
  //   });
  // };

  function renderItem({ item }) {
    return (
      <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('BoardDetail', { boardId: item.boardId })}>
        <View style={styles.boardContent}>
          <Text style={styles.boardWriter}>{item.boardWriterNickname}</Text>
          <Text style={styles.boardTitle} numberOfLines={1} ellipsizeMode='tail'>{item.boardTitle}</Text>
          <Text style={styles.boardPreview} numberOfLines={1} ellipsizeMode='tail'>{item.boardContent}</Text>
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
      <TouchableOpacity style={styles.createBoardButton} onPress={handleCreateBoard}>
        <Text style={styles.createBoardButtonText}>+</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <TouchableOpacity onPress={navigateToSearch} style={styles.searchIcon}>
          <Icon name="search" size={25} color="#000" />
        </TouchableOpacity>
      </View> */}
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
    fontSize: 11,
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
  createBoardButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: 'skyblue', 
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  createBoardButtonText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default CommunityPage;