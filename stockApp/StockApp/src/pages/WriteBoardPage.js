import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

import useUserStore from '../UserInfo/UserStore';
import { createBoard, editBoard } from '../API/BoardApi'
import { getToken } from '../tokenManager'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { JumpingTransition } from 'react-native-reanimated';

const WriteBoardPage = ({ navigation, route }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const userInfo = useUserStore((state) => state.user);

    const board = route.params?.board;

    useEffect(() => {
        if (board) {
            setTitle(board.boardTitle);
            setContent(board.boardContent);
        }

        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={handleAction} style={{ marginRight: 10 }}>
                    <Text style={{ color: 'black', fontSize: 14, marginRight: 6 }}>
                        {board ? "수정" : "작성"}
                    </Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation, board, handleAction]);

    const selectImage = () => {
        launchImageLibrary({}, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                setImage(response);
            }
        });
    };
  
    const handlePostSubmit = async () => {
        if (!title.trim() || !content.trim) {
            Alert.alert('Error', 'Both title and content are required.');
            return;
        }
        try {
            const token = await getToken();

            const formData = new FormData();
            formData.append('boardTitle', title);
            formData.append('boardContent', content);
            formData.append('boardWriterEmail', userInfo.userEmail);
            formData.append('boardWriterProfile', userInfo.userProfile);
            formData.append('boardWriterNickname', userInfo.userNickname);

            //날짜
            const currentDate = new Date().toISOString();
            formData.append('boardWriteDate', currentDate);

            if (image) {
                formData.append('boardImage', {
                    uri: image.uri,
                    type: image.type,
                    name: image.fileName,
                });
            } else {
                formData.append('boardImage', null);
            }
            const response = await createBoard(formData, token);
            console.log('작성된 글:', response);
            const isSuccess = response.result && response.message === "Success";
            if (isSuccess) {
                navigation.goBack();
            } else {
                Alert.alert('Error', 'Try again.');
            }
        } catch (error) {
            console.error('Failed to post the board:', error);
            Alert.alert('Error', 'Try again.');
        }
    };

    const handleEditSubmit = async () => {
        if(!title || !content) {
            Alert.alert('Error', 'Both title and content are required.');
            return;
        }
        try {
            const token = await getToken();

            const formData = new FormData();
            formData.append('boardTitle', title);
            formData.append('boardContent', content);
            formData.append('boardWriterEmail', userInfo.userEmail);
            formData.append('boardWriterProfile', userInfo.userProfile);
            formData.append('boardWriterNickname', userInfo.userNickname);

            //날짜
            const currentDate = new Date().toISOString().split('T')[0];
            // const currentDate = new Date().toISOString();
            formData.append('boardWriteDate', currentDate);

            if (image) {
                formData.append('boardImage', {
                    uri: image.uri,
                    type: image.type,
                    name: image.fileName,
                });
            } else {
                formData.append('boardImage', null);
            }

            const response = await editBoard(board.id, formData, token);
            console.log("수정된 글:", response)
            const isSuccess = response.result && response.message === "Success";
            if (isSuccess) {
                navigation.goBack();
            } else {
                Alert.alert('Error', 'Try again.');
            }
        } catch (error) {
            console.error('Failed to edit the board:', error);
            Alert.alert('Error', 'Try again.');
        }
    };

    const handleAction = async () => {
        if (board) {
            handleEditSubmit();
        } else {
            handlePostSubmit();
        }
    };

    return (
        <View style={styles.container}>
            {/* <Text style={styles.header}>{board ? "게시글 수정" : "게시글 작성"}</Text> */}
            <TextInput 
                style={styles.input}
                placeholder="제목"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput 
                style={[styles.input, styles.contentInput]}
                placeholder="내용을 입력하세요"
                multiline={true}
                value={content}
                onChangeText={setContent}
            />
            {image && <Image source={{ uri: image.uri }} style={styles.image} />}
            <TouchableOpacity style={styles.button} onPress={selectImage}>
                <Text style={styles.buttonText}>이미지 선택</Text>
            </TouchableOpacity>
        </View>
    );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderBottomColor: '#e1e1e1',
    marginBottom: 20,
    paddingHorizontal: 15,
    // padding: 15,
    borderRadius: 0,
    // backgroundColor: '#f5f5f5',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // flexDirection: 'row',
    height: 50,
    fontSize: 16,
  },
  contentInput: {
    height: 250,
    textAlignVertical: 'top',

  },
  image: {
      width: 100,
      height: 100,
      marginBottom: 20,
  },
  button: {
      backgroundColor: 'skyblue',
      padding: 10,
      borderRadius: 10,
      alignItems: 'center',
      marginBottom: 15,
      height: 35,
  },
  buttonText: {
      color: 'white',
      fontWeight: '300',
      fontSize: 15,
  }
});

export default WriteBoardPage;