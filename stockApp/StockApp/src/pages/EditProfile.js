import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Button, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import Style from '../styleSheet/EditProfileStyle'
import { getToken } from '../tokenManager';

export const EditProfile = ({ route, navigation }) => {
  const { userProfile, onUpdate } = route.params;
  
  const [nickname, setNickname] = useState(userProfile.userNickname);
  const [email, setEmail] = useState(userProfile.userEmail);
  const [image, setImage] = useState(userProfile.image);

  useLayoutEffect(() => {
      navigation.setParams({ handleSubmit });
  }, [navigation, nickname, image]);

  const handleImagePick = () => {
      ImagePicker.showImagePicker({}, (response) => {
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

    const handleSubmit = async () => {
        try {
            const token = await getToken();
            let formData = new FormData();

            // if (image.uri) {
            //     formData.append("userProfile", {
            //         uri: image.uri,
            //         type: "image/jpeg",
            //         name: "profile.jpg",
            //     });
            // }

            if (image && image.uri) {
                formData.append("userProfile", {
                    uri: image.uri,
                    type: "image/jpeg",
                    name: "profile.jpg",
                });
            }

            formData.append("userNickname", nickname);
      
            const response = await axios.patch('/api/myPage/patchUser', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
      
            if (response.data) {
                onUpdate(response.data.user);
                navigation.goBack();
            } else {
                Alert.alert('Error', ' Try again.');
            }
        } catch (error) {
            console.error('Failed to update profile:', error);
            Alert.alert('Error', 'Try again.');
        }
    };

    return (
        <View style={Style.container}>
            <TouchableOpacity onPress={handleImagePick}>
                <Image source={image ? { uri: image } : require('../assets/default.jpg')} style={Style.image} />
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
