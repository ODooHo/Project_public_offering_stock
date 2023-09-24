import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { SignUpApi } from '../API/AuthApi';
import SignUpStyles from '../styleSheet/SignUpStyles';
import SignInPage from './SignInPage';

const SignUpPage = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPasswordCheck, setUserPasswordCheck] = useState('');
    const [userNickname, setUserNickname] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState('');
    const [emailDomain, setEmailDomain] = useState('domain 선택');
    const [customDomain, setCustomDomain] = useState('');
    const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);

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
                    errors.email = "이메일을 입력하세요.";
                    if (emailDomain === 'custom' && !customDomain) {
                        errors.customDomain = "도메인을 입력하세요.";
                    } else {
                        errors.customDomain = "";
                    }
                } else {
                    errors.email = ""; // 이메일 오류 제거
                    if (emailDomain === 'custom' && !customDomain) {
                        errors.customDomain = "도메인을 입력하세요.";
                    } else {
                        errors.customDomain = "";
                    }
                }
                break;
            case 'password':
                if (!userPassword) errors.password = "비밀번호를 입력하세요.";
                else errors.password = ""; 
                break;
            case 'passwordCheck':
                if (userPassword !== userPasswordCheck) errors.passwordCheck = "비밀번호가 일치하지 않습니다!";
                else errors.passwordCheck = ""; 
                break;
            case 'nickname':
                if (!userNickname) errors.nickname = "닉네임을 입력하세요.";
                else errors.nickname = ""; 
                break;
            case 'phoneNumber':
                if (!userPhoneNumber) errors.phoneNumber = "전화번호를 입력하세요.";
                else errors.phoneNumber = ""; 
                break;
            default:
                break;
        }

        setErrorMessages(errors);
    };

    const handleSubmit = async () => {
        let errors = {};

        const fullEmail = `${userEmail}@${emailDomain === 'custom' ? customDomain : emailDomain}`;
    
        if (!fullEmail.includes('@') || !fullEmail.split('@')[1]) errors.email = "올바른 이메일을 입력하세요.";
        if (!userPassword) errors.password = "비밀번호를 입력하세요.";
        if (userPassword !== userPasswordCheck) errors.passwordCheck = "비밀번호가 일치하지 않습니다!";
        if (!userNickname) errors.nickname = "닉네임을 입력하세요.";
        if (!userPhoneNumber) errors.phoneNumber = "전화번호를 입력하세요.";
        
        setErrorMessages(errors);

        if (Object.keys(errors).length) return;

        const formData = new FormData();

        formData.append('userEmail', fullEmail);
        formData.append('userPassword', userPassword);
        formData.append('userNickname', userNickname);
        formData.append('userPhoneNumber', userPhoneNumber);

        try {
            const response = await SignUpApi(formData);
            console.log(response);

            showSignUpSuccessPopup();
            SignInPage.navigateToLoginPage();
        } catch (error) {
            Alert.alert('회원가입 실패', error.message);
        }
    };

    const closeSignUpSuccessPopup = () => {
        setIsSignUpSuccess(false);
    };

    return (
        <View style={SignUpStyles.container}>
            <View style={SignUpStyles.imageContainer}>
                <Image
                    source={require('../assets/default.jpg')} // 이미지 경로
                    style={SignUpStyles.profileImage} // 스타일 적용 (동그라미 스타일)
                />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                    style={errorMessages.email ? [SignUpStyles.input, {borderColor: 'red'}] : SignUpStyles.input}
                    placeholder="이메일"
                    value={userEmail}
                    onChangeText={text => {
                        const [name, domain] = text.split('@');
                        setUserEmail(name);
                    }}
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
                                color: 'black',
                                borderColor: errorMessages.customDomain ? 'red' : 'gray',
                                borderWidth: 1,
                                paddingHorizontal: 8,
                            }}
                            placeholder="직접입력"
                            placeholderTextColor="lightgray"
                            value={customDomain}
                            onChangeText={setCustomDomain}
                            editable={true}
                            onBlur={handleBlur('email')}
                        />
                    ) : (
                        <TextInput
                            style={{ height: 40, width: 150 }}
                            placeholder="도메인"
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
                        containerStyle={{ height: 10, width: 135, zIndex: 1000}}
                        placeholder="도메인 선택"
                        modal
                        dropDownDirection="TOP"
                    />
                </View>
            </View>
            {errorMessages.email && <Text style={SignUpStyles.errorMessage}>{errorMessages.email}</Text>}
            {errorMessages.customDomain && <Text style={SignUpStyles.errorMessage}>{errorMessages.customDomain}</Text>}
            
            <TextInput
                style={errorMessages.password ? [SignUpStyles.input, {borderColor: 'red'}] : SignUpStyles.input}
                placeholder="비밀번호"
                value={userPassword}
                onChangeText={setUserPassword}
                secureTextEntry
                onBlur={handleBlur('password')}
            />
            {errorMessages.password && <Text style={SignUpStyles.errorMessage}>{errorMessages.password}</Text>}

            <TextInput
                style={errorMessages.passwordCheck ? [SignUpStyles.input, {borderColor: 'red'}] : SignUpStyles.input}
                placeholder="비밀번호 확인"
                value={userPasswordCheck}
                onChangeText={setUserPasswordCheck}
                secureTextEntry
                onBlur={handleBlur('passwordCheck')}
            />
            {errorMessages.passwordCheck && <Text style={SignUpStyles.errorMessage}>{errorMessages.passwordCheck}</Text>}

            <TextInput
                style={errorMessages.nickname ? [SignUpStyles.input, {borderColor: 'red'}] : SignUpStyles.input}
                placeholder="닉네임"
                value={userNickname}
                onChangeText={setUserNickname}
                onBlur={handleBlur('nickname')}
            />
            {errorMessages.nickname && <Text style={SignUpStyles.errorMessage}>{errorMessages.nickname}</Text>}

            <TextInput
                style={errorMessages.phoneNumber ? [SignUpStyles.input, {borderColor: 'red'}] : SignUpStyles.input}
                placeholder="전화번호"
                value={userPhoneNumber}
                onChangeText={setUserPhoneNumber}
                keyboardType="phone-pad"
                onBlur={handleBlur('phoneNumber')}
            />
            {errorMessages.phoneNumber && <Text style={SignUpStyles.errorMessage}>{errorMessages.phoneNumber}</Text>}

            <TouchableOpacity style={SignUpStyles.button} onPress={handleSubmit}>
                <Text style={SignUpStyles.buttonText}>가입하기</Text>
            </TouchableOpacity>

            {isSignUpSuccess && (
                <SignUpSuccessPopup
                    visible={isSignUpSuccess}
                    onClose={closeSignUpSuccessPopup}
                />
            )}
        </View>
    );
}

export default SignUpPage;
