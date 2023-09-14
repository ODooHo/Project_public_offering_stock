
// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator } from 'react-native';
// import { fetchBoardList } from '../API/BoardApi';

// const MOCK_DATA = [
//   {
//     boardId: 1,
//     boardTitle: "Sample Title 1",
//     author: "John Doe",
//     date: "2023-09-11"
//   },
//   // ... (다른 모의 데이터 추가 가능)
// ];

// const CommunityPage = ({ navigation }) => {
//   const [boards, setBoards] = useState([]);
//   const [loading, setLoading] = useState(true);

// //   서버 열었을 때 사용
// //   useEffect(() => {
// //     fetchBoardList()
// //       .then(response => {
// //         setBoards(response);
// //       })
// //       .catch(error => {
// //         console.error("There was an error fetching the board list!", error);
// //       });
// //   }, []);

//   useEffect(() => {
//     fetchBoardList()
//       .then(response => {
//         setBoards(response);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error("There was an error fetching the board list!", error);
//         //서버 응답 모방을 위한 mock data 사용
//         setBoards(MOCK_DATA);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" />;
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>커뮤니티 게시판</Text>
//       <FlatList
//         data={boards}
//         keyExtractor={item => item.boardId.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.listItem}>
//             <View>
//               <Text style={styles.boardTitle}>{item.boardTitle}</Text>
//               <Text style={styles.boardInfo}>{item.author} | {item.date}</Text>
//             </View>
//             <Button 
//               title="상세보기" 
//               onPress={() => navigation.navigate('BoardDetail', { boardId: item.boardId })}
//             />
//           </View>
//         )}
//       />
//       <Button title="게시글 작성" onPress={() => { /* 게시글 작성 화면으로 이동 */ }} style={styles.writeButton} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//     padding: 10,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 15
//   },
//   listItem: {
//     backgroundColor: 'white',
//     padding: 15,
//     marginVertical: 5,
//     borderRadius: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between'
//   },
//   boardTitle: {
//     fontSize: 16,
//     fontWeight: '600'
//   },
//   boardInfo: {
//     color: 'grey'
//   },
//   writeButton: {
//     marginVertical: 15,
//     alignSelf: 'center',
//   }
// });

// export default CommunityPage;



import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchBoardList } from '../API/BoardApi';

const CommunityPage = ({ navigation }) => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBoardList()
      .then(response => {
        setBoards(response);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the board list!", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>커뮤니티 게시판</Text>
      <FlatList
        data={boards}
        keyExtractor={item => item.boardId.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <View>
              <Text style={styles.boardTitle}>{item.boardTitle}</Text>
              <Text style={styles.boardInfo}>{item.author} | {item.date}</Text>
            </View>
            <Button 
              title="상세보기" 
              onPress={() => navigation.navigate('BoardDetail', { boardId: item.boardId })}
            />
          </View>
        )}
      />
      <Button title="게시글 작성" onPress={() => { /* 게시글 작성 화면으로 이동 */ }} style={styles.writeButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15
  },
  listItem: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  boardTitle: {
    fontSize: 16,
    fontWeight: '600'
  },
  boardInfo: {
    color: 'grey'
  },
  writeButton: {
    marginVertical: 15,
    alignSelf: 'center',
  }
});

export default CommunityPage;
