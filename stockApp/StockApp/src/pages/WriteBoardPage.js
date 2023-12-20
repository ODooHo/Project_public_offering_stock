import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { createBoard, editBoard } from '../API/BoardApi';
import useUserStore from '../UserInfo/UserStore';
import { BoardDetail } from './BoardDetail';

const WriteBoardPage = ({ route, navigation }) => {
    // const [title, setTitle] = useState('');
    // const [content, setContent] = useState('');
    // const [image, setImage] = useState(null);
    // const userInfo = useUserStore();
    const existingBoard = route.params?.board;
    const [title, setTitle] = useState(existingBoard?.boardTitle || '');
    const [content, setContent] = useState(existingBoard?.boardContent || '');
    const [image, setImage] = useState(existingBoard?.boardImage ? { uri: existingBoard.boardImage } : null);
    const userInfo = useUserStore();

    const selectImage = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
        };
    
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.assets[0].uri };
                setImage(source);
                console.log('Selected image: ', source);
            }
        });
    };

    const handleSubmit = async () => {
        if (!title || !content) {
            Alert.alert('Error', 'Both title and content are required.');
            return;
        }
        
        const formData = new FormData();
        formData.append('boardTitle', title);
        formData.append('boardContent', content);
        formData.append('boardWriterEmail', userInfo.user.userEmail);
        formData.append('boardWriterProfile', userInfo.user.userProfile);
        formData.append('boardWriterNickname', userInfo.user.userNickname);

        const boardData = {
            boardTitle: title,
            boardContent: content,
            boardWriterEmail: userInfo.user.userEmail,
            boardWriterProfile: userInfo.user.userProfile,
            boardWriterNickname: userInfo.user.userNickname,
        };

        if (image) {
            const imageUri = Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri;
            formData.append('boardImage', {
                uri: imageUri,
                type: 'image/jpeg', // 실제 이미지 타입에 따라 변경할 수 있습니다.
                name: 'photo.jpg', // 실제 파일 이름이나, 동적으로 생성된 파일 이름을 사용할 수 있습니다.
            });
        }

        try {
            console.log(`Submitting form with title: ${title} and content: ${content}`);
            if (existingBoard) {
                console.log(`Editing existing board with ID: ${existingBoard.boardId}`);
                // 기존 글 수정
                const response = await editBoard(existingBoard.boardId, boardData);
                if (response.ok) {
                    const jsonResponse = await response.json();
                    console.log('Server Response:', jsonResponse);
                    Alert.alert('Success', 'Board edited successfully');
                    navigation.goBack();
                } else {
                    const errorResponse = await response.text();
                    console.error('Server Error:', errorResponse);
                    Alert.alert('Error', 'Failed to edit board.');
                }
            } else {
                // 새로운 글 작성
                const response = await createBoard(formData);
                console.log('Server Response:', response);
                Alert.alert('Success', 'Board created successfully');
            }
            navigation.goBack();
        } catch (error) {
            console.error('Error creating/editing board:', error);
            Alert.alert('Error', 'There was an issue creating/editing the board.');
        }

        // try {
        //     const response = await createBoard(formData);
        //     console.log('Server Response:', response);
        //     Alert.alert('Success', 'Board created successfully');
        //     navigation.goBack();
        // } catch (error) {
        //     console.error('Error creating board:', error);
        //     Alert.alert('Error', 'There was an issue creating the board.');
        // }

    };

    return (
        <View style={styles.container}>
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
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>작성</Text>
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
    input: {
        backgroundColor: 'white',
        borderBottomWidth: 2,
        borderBottomColor: '#e1e1e1',
        marginBottom: 20,
        paddingHorizontal: 15,
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
    },
});

export default WriteBoardPage;