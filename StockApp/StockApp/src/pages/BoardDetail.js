import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TextInput, TouchableOpacity, Image, Alert, Modal } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
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
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleEditInModal = () => {
    if(board.boardWriterEmail === currentUserEmail) {
      navigation.navigate('WriteBoard', { board: board });
    } else {
      Alert.alert("알림", "자신이 작성한 게시글만 수정할 수 있습니다.");
    }
    toggleModal();
  };

  const handleDeleteInModal = () => {
    if (board && board.boardWriterEmail === currentUserEmail) {
      Alert.alert(
        "삭제 확인",
        "게시글을 삭제하시겠습니까?",
        [
          { text: "취소", style: "cancel" },
          {
            text: "삭제", onPress: async () => {
              await deleteBoard(boardId);
              navigation.goBack();
            }
          }
        ]
      );
    } else {
      Alert.alert("알림", "본인이 작성한 게시글만 삭제할 수 있습니다.");
    }
    toggleModal();
  };

  const handleCancelInModal = () => {
    toggleModal();
  };

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

  // 좋아요 상태를 토글하는 함수
  const toggleLike = async () => {
    const likeDto = {
      boardId: boardId,
      userEmail: currentUserEmail
    };
    
    if (liked) {
      // 이미 좋아요가 되어 있을 경우, 좋아요 취소 로직
      await deleteLike(boardId, currentUserEmail);
      setLiked(false);
      setLikeCount(prevCount => prevCount - 1);
    } else {
      // 좋아요가 되어 있지 않을 경우, 좋아요 로직
      await addLike(likeDto);
      setLiked(true);
      setLikeCount(prevCount => prevCount + 1);
    }
  };

  return (
    <View style={styles.container}>
      {board && (
        <View style={styles.boardContainer}>
          <View style={styles.headerContainer}>
            <Image source={{ uri: boardImageUrl }} style={styles.profileImage} />
            <View style={styles.authorInfo}>
              <Text style={styles.authorName}>{board.boardWriterNickname}</Text>
              <Text style={styles.postDate}>{board.boardWriteDate}</Text>
            </View>
            <TouchableOpacity onPress={toggleModal} style={styles.optionsButton} activeOpacity={0.7}>
              <FontAwesome5 name="ellipsis-h" size={20} color="grey"/>
            </TouchableOpacity>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={toggleModal}
          >
            <View style={updatedStyles.modalContainer}>
              <View style={updatedStyles.modal}>
                <TouchableOpacity style={updatedStyles.modalOption} onPress={handleEditInModal}>
                  <Text style={updatedStyles.modalOptionText}>수정</Text>
                </TouchableOpacity>
                <TouchableOpacity style={updatedStyles.modalOption} onPress={handleDeleteInModal}>
                  <Text style={updatedStyles.modalOptionText}>삭제</Text>
                </TouchableOpacity>
                <TouchableOpacity style={updatedStyles.modalOption} onPress={handleCancelInModal}>
                  <Text style={updatedStyles.modalOptionText}>취소</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Text style={styles.boardTitle}>{board.boardTitle}</Text>
          <Text style={styles.boardContent}>{board.boardContent}</Text>
          {boardImageUrl && (
            <Image
              source={{ uri: boardImageUrl }}
              style={{ width: '100%', height: 200, resizeMode: 'contain' }}
            />
          )}
          <View style={styles.iconInfoContainer}>
            <FontAwesome5 name="eye" style={styles.icon}/>
            <Text style={styles.iconInfoText}>{board.boardClickCount}    </Text>
          {/* </View>
          <View style={styles.iconInfoContainer}> */}
            {/* <FontAwesome5 name="heart" style={styles.icon}/> */}
            <TouchableOpacity onPress={toggleLike} style={styles.icon}>
              <Icon
                name={liked ? 'heart' : 'heart-o'}
                size={14}
                color={liked ? 'red' : 'grey'}
              />
            </TouchableOpacity>
            <Text style={styles.iconInfoText}>{likeCount}    </Text>
          {/* </View>
          <View style={styles.iconInfoContainer}> */}
            <FontAwesome5 name="comment" style={styles.icon}/>
            <Text style={styles.iconInfoText}>{board.boardCommentCount}</Text>
          </View>
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

const updatedStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modal: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  modalOption: {
    padding: 16,
    flexDirection: 'row',
  },
  modalOptionText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F9F9F9',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 50, // 프로필 이미지 크기 조정
    height: 50,
    borderRadius: 25, // 원형 이미지
    marginRight: 10,
  },
  authorInfo: {
    justifyContent: 'center',
  },
  authorName: {
    fontWeight: 'bold',
  },
  postDate: {
    fontSize: 12,
    color: '#888',
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
    // marginTop: 10,
    marginBottom: 10,
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  commentButton: {
    backgroundColor: 'skyblue',
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
    marginRight: 1,
  },
  favoriteIconContainer: {
    // 스타일을 여기에 추가하십시오.
    padding: 10, // 아이콘 주변의 터치 영역 확장
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
  optionsButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  optionsMenu: {
    position: 'absolute',
    right: 10,
    top: 40,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  optionsText: {
    fontSize: 15,
    marginVertical: 5,
  },
});