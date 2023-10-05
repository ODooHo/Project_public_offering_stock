import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import axios from 'axios';

import { getToken } from '../tokenManager'
import { getMyPageApi } from '../API/MyPageApi'

const WriteBoardPage = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userInfo, setUserInfo ] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = await getToken();
                const data = await getMyPageApi(token); 
                setUserInfo(data);
            } catch (error) {
                console.error('Failed to fetch user info:', error);
            }
        };

        fetchUserInfo();
    }, []);
  
    const handlePostSubmit = async () => {
        if (!title || !content) {
            Alert.alert('Error', 'Both title and content are required.');
            return;
        }
    
        try {
            const token = await getToken();
            const response = await axios.post('/api/community/board/writeBoard', {
                boardTitle: title,
                boardContent: content,
                boardWriterEmail: userInfo?.email || 'undefined',
                boardWriterNickname: userInfo?.nickname || 'undefined',
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
      
            if (response.data) {
                navigation.goBack();
            } else {
                Alert.alert('Error', 'Try again.');
            }
        } catch (error) {
            console.error('Failed to post the board:', error);
            Alert.alert('Error', 'Try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>게시글 작성</Text>
            <TextInput 
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput 
                style={[styles.input, styles.contentInput]}
                placeholder="Content"
                multiline={true}
                value={content}
                onChangeText={setContent}
            />
            <Button title="작성하기" onPress={handlePostSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  contentInput: {
    height: 150,
    textAlignVertical: 'top',
  }
});

export default WriteBoardPage;
