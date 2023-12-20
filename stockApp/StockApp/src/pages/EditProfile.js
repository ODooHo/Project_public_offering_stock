import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Button, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Style from '../styleSheet/EditProfileStyle'
import { getProfileImageApi,updateMyPageApi } from '../API/MyPageApi';
import useUserStore from '../UserInfo/UserStore';

export const EditProfile = ({ route, navigation }) => {
    const { userProfile, userProfileImage, onUpdate } = route.params;
    const [nickname, setNickname] = useState(userProfile.userNickname);
    const [email, setEmail] = useState(userProfile.userEmail);
    const [image, setImage] = useState(userProfileImage);

    useEffect(() => {
        console.log('EditProfile 회원 정보:', userProfile);
        const fetchProfileImage = async () => {
            try {
                const imageUrl = await getProfileImageApi();
                if (imageUrl) {
                    setImage({ uri: imageUrl });
                }
            } catch (error) {
                console.error('프로필 이미지 가져오기 실패:', error);
            }
        };

        fetchProfileImage();
    }, []);

    useLayoutEffect(() => {
        navigation.setParams({ handleSubmit });
    }, [navigation, nickname, image]);

    const handleImagePick = () => {
        launchImageLibrary({}, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.assets && response.assets.length > 0) {
                const asset = response.assets[0];
                const imageUri = asset.uri;
                const fileType = asset.type || 'image/jpeg';
                const fileName = asset.fileName || `profile_${new Date().getTime()}.jpg`;
        
                setImage({ uri: imageUri });
        
                const formData = new FormData();
                formData.append('userNickname', nickname);
                formData.append('userProfile', {
                uri: imageUri,
                type: fileType,
                name: fileName,
                });
        
                // 서버로 업로드하는 함수를 호출합니다.
                updateMyPageApi(nickname, imageUri);
            }
        });
    };
      
    const handleSubmit = async () => {
        try {
            const updatedUserInfo = await updateMyPageApi(nickname, image?.uri);
            if (onUpdate) {
                await onUpdate(updatedUserInfo);
            }
            useUserStore.getState().setUser(updatedUserInfo);
            navigation.goBack();
        } catch (error) {
            console.error('프로필 업데이트 실패:', error);
            Alert.alert('업데이트 실패', '프로필 업데이트에 실패했습니다. 다시 시도해 주세요.');
        }
    };
      
    return (
        <View style={Style.container}>
            <TouchableOpacity onPress={handleImagePick}>
                <Image source={image ? { uri: image.uri } : null} style={Style.image} />
            </TouchableOpacity>
            <Text style={Style.label}>Nickname</Text>
            <TextInput 
                style={Style.input} 
                value={nickname} 
                onChangeText={setNickname} 
                placeholder="Nickname" 
            />
            <Text style={Style.label}>
                Email: <Text style={Style.emailText}>{email}</Text>
            </Text>
        </View>
    );
};