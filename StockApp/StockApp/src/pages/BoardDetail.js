import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { fetchBoardDetail, fetchBoardComments } from '../API/BoardApi';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const BoardDetail = ({ route }) => {
  const { boardId } = route.params;
  const [board, setBoard] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchBoardDetail(boardId)
      .then(response => {
        setBoard(response);
      })
      .catch(error => {
        console.error("There was an error fetching the board details!", error);
      });

    fetchBoardComments(boardId)
      .then(response => {
        setComments(response);
      })
      .catch(error => {
        console.error("There was an error fetching the comments!", error);
      });
  }, [boardId]);

  const handleAddComment = () => {
    // 새 댓글 추가 로직을 여기에 구현하세요.
    setNewComment("");  // 댓글을 추가한 후, 입력란 초기화
  };

  return (
    <View style={styles.container}>
      {board && (
        <View style={styles.boardContainer}>
          <Text style={styles.boardTitle}>{board.boardTitle}</Text>
          <Text style={styles.boardContent}>{board.boardContent}</Text>
          <Text style={styles.boardInfo}>작성자: {board.boardWriterNickname}</Text>
          <Text style={styles.boardInfo}>작성일: {board.boardWriteDate}</Text>
          <Text style={styles.boardInfo}>조회수: {board.boardClickCount}</Text>
          <View style={styles.iconInfoContainer}>
            <Ionicons name="chatbox" size={20} color="#333"></Ionicons>
            <Text style={styles.iconInfoText}>{board.boardLikeCount}</Text>
          </View>
          {/* <Text style={styles.boardInfo}>좋아요: {board.boardLikeCount}</Text> */}
          <View style={styles.iconInfoContainer}>
            <Icon name="comments" size={20} color="#333" />
            <Text style={styles.iconInfoText}>{board.boardCommentCount}</Text>
          </View>
          {/* <Text style={styles.boardInfo}>댓글 수: {board.boardCommentCount}</Text> */}
        </View>
      )}

      <FlatList
        data={comments}
        keyExtractor={comment => comment.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <Text style={styles.commentAuthor}>{item.author}</Text>
            <Text style={styles.commentContent}>{item.content}</Text>
          </View>
        )}
      />

      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          value={newComment}
          onChangeText={setNewComment}
          placeholder="댓글을 입력하세요..."
        />
        <TouchableOpacity onPress={handleAddComment} style={styles.commentButton}>
          <Text style={styles.commentButtonText}>등록</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f7f7f7',
  },
  boardContainer: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  boardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  boardContent: {
    marginBottom: 10,
  },
  boardInfo: {
    color: '#888',
  },
  commentContainer: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e9e9e9',
    marginVertical: 5,
  },
  commentAuthor: {
    fontWeight: 'bold',
  },
  commentContent: {
    marginTop: 5,
  },
  commentInputContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  commentButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  commentButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  iconInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  iconInfoText: {
    marginLeft: 5,
    color: '#333',
  },
});
