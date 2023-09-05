import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { signUpApi } from '../API/AuthApi';
import signUpStyles from '../styleSheet/signUpStyles';
// import defaultProfileImage from '../assets/default.jpg';
const defaultProfileImage = require('../assets/default.jpg');


const signUpPage = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPasswordCheck, setUserPasswordCheck] = useState('');
    const [userNickname, setUserNickname] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState('');
    const [userProfile, setUserProfile] = useState(defaultProfileImage);
    // const [userProfile, setUserProfile] = useState({
    //     uri: defaultProfileImage,
    //     type: null,
    //     name: null
    // });

    const [emailDomain, setEmailDomain] = useState('domain 선택');
    const [customDomain, setCustomDomain] = useState('');


    useEffect(() => {
        if (emailDomain === 'custom') {
            setCustomDomain(''); 
        }
    }, [emailDomain]);

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'gmail.com', value: 'gmail.com' },
        { label: 'naver.com', value: 'naver.com' },
        { label: 'daum.net', value: 'daum.net' },
        { label: 'Custom...', value: 'custom' }
    ]);

    const [errorMessages, setErrorMessages] = useState({
        email: "",
        password: "",
        passwordCheck: "",
        nickname: "",
        phoneNumber: ""
    });

    const handleBlur = (field) => () => {
        let errors = { ...errorMessages };

        switch(field) {
            case 'email':
                if (!userEmail) {
                    errors.email = "Email is required.";
                    if (emailDomain === 'custom' && !customDomain) {
                        errors.customDomain = "Domain is required.";
                    } else {
                        errors.customDomain = "";
                    }
                } else {
                    errors.email = ""; // Clear email error
                    if (emailDomain === 'custom' && !customDomain) {
                        errors.customDomain = "Domain is required.";
                    } else {
                        errors.customDomain = "";
                    }
                }
                break;
            case 'password':
                if (!userPassword) errors.password = "Password is required.";
                else errors.password = ""; 
                break;
            case 'passwordCheck':
                if (userPassword !== userPasswordCheck) errors.passwordCheck = "Passwords do not match!";
                else errors.passwordCheck = ""; 
                break;
            case 'nickname':
                if (!userNickname) errors.nickname = "Nickname is required.";
                else errors.nickname = ""; 
                break;
            case 'phoneNumber':
                if (!userPhoneNumber) errors.phoneNumber = "Phone Number is required.";
                else errors.phoneNumber = ""; 
                break;
            default:
                break;
        }

        setErrorMessages(errors);
    };

    const handleSubmit = async () => {
        let errors = {};

        // 이메일 주소 결합
        const fullEmail = `${userEmail}@${emailDomain === 'custom' ? customDomain : emailDomain}`;
    
        // if (!fullEmail) errors.email = "Email is required.";
        if (!fullEmail.includes('@') || !fullEmail.split('@')[1]) errors.email = "Complete email is required.";
        if (!userPassword) errors.password = "Password is required.";
        if (userPassword !== userPasswordCheck) errors.passwordCheck = "Passwords do not match!";
        if (!userNickname) errors.nickname = "Nickname is required.";
        if (!userPhoneNumber) errors.phoneNumber = "Phone Number is required.";

        
        setErrorMessages(errors);

        if (Object.keys(errors).length) return;

        const data = {
            userEmail,
            userPassword,
            userNickname,
            userPhoneNumber,
        };

        if (userProfile.uri !== defaultProfileImage){
            data.userProfile = {
                uri: userProfile.uri,
                type: userProfile.type,
                name: userProfile.name
            };
        }

        try {
            const response = await signUpApi(data);
            console.log(response);
        } catch (error) {
            Alert.alert('Signup failed', error.message);
        }
    };

    const handleImagePicker = () => {
        launchImageLibrary({
              mediaType: 'photo',
              includeBase64: false,
              maxHeight: 200,
              maxWidth: 200,
        }, (response) => {
            if (!response.didCancel && !response.error) {
                // setUserProfile(response);
                // }
                setUserProfile({
                    uri: response.uri,
                    type: response.type,
                    name: response.fileName
                });
            }
        });
    };

    return (
        <View style={signUpStyles.container}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop:-30, marginBottom: 30 }}>
                <TouchableOpacity onPress={handleImagePicker}>
                    <Image
                        source={typeof userProfile === 'number' ? userProfile : { uri: userProfile.uri }}
                        style={signUpStyles.profileImage}
                    />
                </TouchableOpacity>
                <Text>Tap to change profile image</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                    style={errorMessages.email ? [signUpStyles.input, {borderColor: 'red'}] : signUpStyles.input}
                    placeholder="Email       "
                    value={userEmail}
                    onChangeText={text => {
                        const [name, domain] = text.split('@');
                        setUserEmail(name);
                    }}
                    // onChangeText={setUserEmail}
                    keyboardType="email-address"
                    onBlur={handleBlur('email')}
                />
                <Text> @ </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {emailDomain === 'custom' ? (
                        <TextInput
                            style={{
                                height: 40,
                                width: 150,
                                color: 'black', // 텍스트 색상을 검은색으로 설정
                                borderColor: errorMessages.customDomain ? 'red' : 'gray',
                                // borderColor: 'gray', // 테두리 색상 설정
                                borderWidth: 1, // 테두리 두께 설정
                                paddingHorizontal: 8, // 좌우 패딩 설정
                            }}
                            placeholder="직접입력"
                            placeholderTextColor="lightgray" // 플레이스홀더 글자 색상 설정
                            value={customDomain}
                            onChangeText={setCustomDomain}
                            editable={true} // 텍스트 입력 가능하도록 설정
                            onBlur={handleBlur('email')}
                        />
                    ) : (
                        <TextInput
                            style={{ height: 40, width: 150 }}
                            placeholder="Domain"
                            value={emailDomain}
                            editable={false}
                        />
                    )}
                </View>
                <View style={{ marginLeft: -65, marginBottom: 50}}>
                    <DropDownPicker
                        open={open}
                        value={emailDomain}
                        items={items}
                        setOpen={setOpen}
                        setValue={value => {
                            if (value !== 'custom') {
                                setEmailDomain(value);
                                setCustomDomain('');
                            } else {
                                setEmailDomain('custom');
                            }
                        }}
                        setItems={setItems}
                        containerStyle={{ height: 10, width: 135, zIndex: 10000000000000000000000000}}
                        placeholder="Select domain"
                        modal
                        dropDownDirection="TOP"
                    />
                </View>
            </View>
            {errorMessages.email && <Text style={signUpStyles.errorMessage}>{errorMessages.email}</Text>}
            {errorMessages.customDomain && <Text style={signUpStyles.errorMessage}>{errorMessages.customDomain}</Text>}
            
            <TextInput
                style={errorMessages.password ? [signUpStyles.input, {borderColor: 'red'}] : signUpStyles.input}
                placeholder="Password"
                value={userPassword}
                onChangeText={setUserPassword}
                secureTextEntry
                onBlur={handleBlur('password')}
            />
            {errorMessages.password && <Text style={signUpStyles.errorMessage}>{errorMessages.password}</Text>}

            <TextInput
                style={errorMessages.passwordCheck ? [signUpStyles.input, {borderColor: 'red'}] : signUpStyles.input}
                placeholder="Confirm Password"
                value={userPasswordCheck}
                onChangeText={setUserPasswordCheck}
                secureTextEntry
                onBlur={handleBlur('passwordCheck')}
            />
            {errorMessages.passwordCheck && <Text style={signUpStyles.errorMessage}>{errorMessages.passwordCheck}</Text>}

            <TextInput
                style={errorMessages.nickname ? [signUpStyles.input, {borderColor: 'red'}] : signUpStyles.input}
                placeholder="Nickname"
                value={userNickname}
                onChangeText={setUserNickname}
                onBlur={handleBlur('nickname')}
            />
            {errorMessages.nickname && <Text style={signUpStyles.errorMessage}>{errorMessages.nickname}</Text>}

            <TextInput
                style={errorMessages.phoneNumber ? [signUpStyles.input, {borderColor: 'red'}] : signUpStyles.input}
                placeholder="Phone Number"
                value={userPhoneNumber}
                onChangeText={setUserPhoneNumber}
                keyboardType="phone-pad"
                onBlur={handleBlur('phoneNumber')}
            />
            {errorMessages.phoneNumber && <Text style={signUpStyles.errorMessage}>{errorMessages.phoneNumber}</Text>}

            <TouchableOpacity style={signUpStyles.button} onPress={handleSubmit}>
                <Text style={signUpStyles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}

export default signUpPage;