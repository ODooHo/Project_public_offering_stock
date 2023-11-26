import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

import { fetchBoardDetail, fetchBoardImage, fetchBoardComments, createComment, deleteBoard, deleteComment, editComment, addLike, deleteLike, getLikeCount } from '../API/BoardApi';
import useUserStore from '../UserInfo/UserStore';

const SERVER_URL = 'http://15.165.24.146:8080';

export const BoardDetail = ({ route }) => {
  const { boardId } = route.params;
  const { user } = useUserStore();
  const [board, setBoard] = useState(null);
  const [boardImageUrl, setBoardImageUrl] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState(user?.userEmail || "");
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    setCurrentUserEmail(user?.userEmail || "");
  }, [user]);

  useEffect(() => {
    fetchBoardDetail(boardId)
      .then(response => {
        if (response && response.data){
          setBoard(response.data);
          if (response.data.boardImage) {
            fetchBoardImage(boardId)
              .then(imageResponse => {
                setBoardImageUrl(`${SERVER_URL}/api/community/board/${boardId}/image`);
              })
              .catch(error => {
                console.error("게시글 이미지 불러오는 중 오류 발생!", error);
              });
          }
        } else{
          console.error("응답 데이터가 유효하지 않습니다.", response);
        }
      })
      .catch(error => {
        console.error("게시글 상세 정보 불러오는 중 오류 발생!", error);
      });
    refreshComments();
  }, [boardId, currentUserEmail]);

  const refreshComments = () => {
    fetchBoardComments(boardId)
      .then(response => {
        setComments(response);
      })
      .catch(error => {
        console.error("댓글 정보 가져오는 중 오류 발생!", error);
      });
  };

  useEffect(() => {
    getLikeCount(boardId)
        .then(response => {
          setLikeCount(response.data);
          console.log("두번째:", response);
        })
        .catch(error => {
            console.error("좋아요 개수 가져오는 중 오류 발생!", error);
        });
  }, [boardId]);

  const handleAddComment = () => {
    const commentData = {
      commentContent: newComment,
      boardId: boardId,
      commentWriterEmail: currentUserEmail,
      commentWriterNickname: user?.userNickname
    };
    console.log("댓글 작성자 이메일:", currentUserEmail);
    createComment(boardId, commentData)
      .then(response => {
        setNewComment("");
        refreshComments();
      })
      .catch(error => {
        console.error("댓글 추가 중 오류 발생!", error);
      });
  };

  const handleDeleteComment = (commentId) => {
    const comment = comments.data.find(c => c.commentId === commentId);
    console.log("삭제 comment:", comment);
    if (!comment) {
      console.error("댓글을 찾을 수 없습니다.");
      return;
    }
    console.log("댓글 작성자 이메일:", comment.commentWriterEmail);
    console.log("현재 사용자 이메일:", currentUserEmail);
    if (comment.commentWriterEmail === currentUserEmail) {
      deleteComment(boardId, commentId)
      .then(response => {
        refreshComments();
      })
      .catch(error => {
        console.error("댓글 삭제 중 오류 발생!", error);
      });
    } else {
      Alert.alert("Error", "본인이 작성한 댓글만 삭제할 수 있습니다.")
    }
  };

  const handleEditButtonPress = (comment) => {
    setEditingCommentId(comment.commentId);
    setEditingContent(comment.commentContent);
  };

  const handleEditComment = () => {
    if (editingCommentId && editingContent) {
      const commentData = {
        commentContent: editingContent
      };
      editComment(boardId, editingCommentId, commentData)
        .then(() => {
          setEditingCommentId(null);
          setEditingContent("");
          refreshComments();
        })
        .catch(error => {
          console.error("댓글 수정 중 오류 발생!", error);
        });
    }
  };

  const handleDeleteBoard = async () => {
    if (board.boardWriterEmail !== currentUserEmail) {
      Alert.alert("알림", "자신이 작성한 게시글만 삭제할 수 있습니다.");
      return;
    }
    try {
      await deleteBoard(boardId);
      navigation.goBack();
    } catch (error) {
      console.error("게시글 삭제 중 오류 발생:", error);
      Alert.alert("Error", "게시글 삭제 중 오류 발생");
    }
  };

  const handleLike = () => {
    const likeDto = {
      boardId: boardId,
      userEmail: currentUserEmail
    };

    if (!liked) {
      addLike(likeDto)
        .then(response => {
          setLikeCount(prevCount => prevCount + 1);
          setLiked(true);
          Alert.alert("알림", "좋아요!");
        })
        .catch(error => {
          console.error("좋아요 추가 중 오류 발생!", error);
        });
    } else {
      handleUnlike();
    }
  };

  const handleUnlike = () => {
    deleteLike(boardId, currentUserEmail)
      .then(response => {
          setLikeCount(prevCount => prevCount - 1);
          setLiked(false);
          Alert.alert("알림", "좋아요 취소!");
        })
        .catch(error => {
          console.error("좋아요 취소 중 오류 발생!", error);
        });
  };

  return (
    <View style={styles.container}>
      {board && (
        <View style={styles.boardContainer}>
          <Text style={styles.boardTitle}>{board.boardTitle}</Text>
          <Text style={styles.boardContent}>{board.boardContent}</Text>
          {boardImageUrl && (
            <Image
              source={{ uri: boardImageUrl }}
              style={{ width: '100%', height: 200, resizeMode: 'contain' }}
            />
          )}
          <Text style={styles.boardInfo}>작성자: {board.boardWriterNickname}</Text>
          <Text style={styles.boardInfo}>작성일: {board.boardWriteDate}</Text>
          <Text style={styles.boardInfo}>조회수: {board.boardClickCount}</Text>
          <View style={styles.iconInfoContainer}>
            <FontAwesome5 name="heart" style={styles.icon}/>
            <Text style={styles.iconInfoText}>{likeCount}</Text>
            <TouchableOpacity onPress={handleLike}>
              <Text style={styles.smallText}>{liked ? "좋아요취소" : "좋아요"}</Text>
            </TouchableOpacity>
          </View>
          {/* <Text style={styles.boardInfo}>좋아요: {board.boardLikeCount}</Text> */}
          <View style={styles.iconInfoContainer}>
            <FontAwesome5 name="comment" style={styles.icon}/>
            <Text style={styles.iconInfoText}>{board.boardCommentCount}</Text>
          </View>
          {/* <Text style={styles.boardInfo}>댓글 수: {board.boardCommentCount}</Text> */}
          {board.boardWriterEmail === currentUserEmail && (
            <>
              <TouchableOpacity onPress={() => navigation.navigate('WriteBoard', { board })}>
                <Text>수정</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDeleteBoard}>  
                <Text>삭제</Text>
              </TouchableOpacity>
            </>
           )}  
        </View>
      )}

      <FlatList
        data={comments.data}
        keyExtractor={comment => comment.commentId.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <View style={styles.commentHeader}>
              <Text style={styles.commentAuthor}>{item.commentWriterNickname}</Text>
              <View style={styles.commentActions}>
                {item.commentWriterEmail === currentUserEmail && (
                  <>
                    <TouchableOpacity onPress={() => handleEditButtonPress(item)}>
                      <Text style={styles.smallText}>수정  </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteComment(item.commentId)}>
                      <Text style={styles.smallText}>삭제</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
            {editingCommentId === item.commentId ? (
              <TextInput
                style={styles.commentInput}
                value={editingContent}
                onChangeText={setEditingContent}
                placeholder="댓글을 수정하세요..."
              />
            ) : (
              <Text style={styles.commentContent}>{item.commentContent}</Text>
            )}
            {editingCommentId === item.commentId ? (
              <Button title="저장" onPress={handleEditComment} />
            ) : (
              <Text style={styles.commentInfo}>작성일: {item.commentWriteDate}</Text>
            )}
            {item.commentWriterProfile && (
              <Image source={{ uri: SERVER_URL + item.commentWriterProfile }} style={styles.commentProfileImage} />
            )}
            {item.commentImage && (
              <Image source={{ uri: SERVER_URL + item.commentAuthor }} style={styles.commentImage} />
            )} 
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
  icon: {
    color: 'grey',
    marginRight: 2,
  },
  smallText: {
    fontSize: 12,
    color: 'gray',
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  commentActions: {
    flexDirection: 'row',
  },
});