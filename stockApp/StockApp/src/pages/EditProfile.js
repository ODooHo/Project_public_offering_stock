import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Button, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import Style from '../styleSheet/EditProfileStyle'
import { updateMyPageApi } from '../API/MyPageApi';
import { getToken } from '../tokenManager';
import useUserStore from '../UserInfo/UserStore';

export const EditProfile = ({ route, navigation }) => {
  const { userProfile, userProfileImage, onUpdate } = route.params;
  
  const [nickname, setNickname] = useState(userProfile.userNickname);
  const [email, setEmail] = useState(userProfile.userEmail);
  const [image, setImage] = useState(userProfileImage);

  useLayoutEffect(() => {
      navigation.setParams({ handleSubmit });
  }, [navigation, nickname, image]);

  const handleImagePick = () => {
      launchImageLibrary({}, (response) => {
          if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.uri };
                setImage(source);
            }
        });
    };

    // const handleSubmit = async () => {
    //     try {
    //         await updateMyPageApi(nickname, image?.uri);
    //         if (onUpdate) {
    //             onUpdate({ ...userProfile, userNickname: nickname, userProfile: image?.uri });
    //         }
    //         navigation.goBack();
    //     } catch (error) {
    //         console.error('Failed to update profile:', error);
    //         Alert.alert('Error', 'Try again.');
    //     }
    // };

    const handleSubmit = async () => {
        try {
            const updatedUserInfo = await updateMyPageApi(nickname, image?.uri);
            if (onUpdate) {
                onUpdate(updatedUserInfo);
                useUserStore.getState().setUser(updatedUserInfo);
            }
            navigation.goBack();
        } catch (error) {
            console.error('Failed to update profile:', error);
            Alert.alert('Error', 'Try again.');
        }
    };
      
    return (
        <View style={Style.container}>
            <TouchableOpacity onPress={handleImagePick}>
                <Image source={{ uri: image }} style={Style.image} />
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