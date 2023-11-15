// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
// import { SignUpApi, CheckEmailDuplicationApi, CheckNicknameDuplicationApi } from '../../API/AuthApi';
// import SignUpStyles from '../../styleSheet/SignUpStyles';


// const SignUpPage = ({ navigation }) => {
//     const [userEmail, setUserEmail] = useState('');
//     const [userPassword, setUserPassword] = useState('');
//     const [userPasswordCheck, setUserPasswordCheck] = useState('');
//     const [userNickname, setUserNickname] = useState('');
//     const [userPhoneNumber, setUserPhoneNumber] = useState('');
//     const [isEmailDuplicated, setIsEmailDuplicated] = useState(null);
//     const [emailChecked, setEmailChecked] = useState(false);
//     const [isNicknameDuplicated, setIsNicknameDuplicated] = useState(null);
//     const [errorMessages, setErrorMessages] = useState({
//         email: "",
//         password: "",
//         passwordCheck: "",
//         nickname: "",
//         phoneNumber: ""
//     });

//     const handleBlur = (field) => async () => {
//         let errors = { ...errorMessages };

//         switch(field) {
//             case 'email':
//                 errors.email = !userEmail.includes('@') || !userEmail.split('@')[1];
//                 break;
//             case 'password':
//                 if (!userPassword) errors.password = "비밀번호를 입력하세요.";
//                 else errors.password = ""; 
//                 // errors.password = !user
//                 break;
//             case 'passwordCheck':
//                 if (userPassword !== userPasswordCheck) errors.passwordCheck = "비밀번호가 일치하지 않습니다!";
//                 else errors.passwordCheck = ""; 
//                 // errors.passwordCheck = userPassword !== userPasswordCheck;
//                 break;
//             case 'nickname':
//                 // if (!userNickname) errors.nickname = "닉네임을 입력하세요.";
//                 // else errors.nickname = ""; 
//                 errors.nickname = !userNickname;
//                 break;
//             case 'phoneNumber':
//                 // if (!userPhoneNumber) errors.phoneNumber = "전화번호를 입력하세요.";
//                 // else errors.phoneNumber = ""; 
//                 errors.phoneNumber = !userPhoneNumber;
//                 break;
//             default:
//                 break;
//         }

//         setErrorMessages(errors);
//     };

//     const checkEmailDuplication = async () => {
//         try {
//             if (!userEmail.includes('@') || userEmail.split('@')[1].length === 0) {
//                 setErrorMessages({ ...errorMessages, email: "유효한 이메일을 입력해주세요." });
//                 return;
//             }

//             const response = await CheckEmailDuplicationApi(userEmail);

//             if (!response.result) {
//                 setErrorMessages({ ...errorMessages, email: "중복된 이메일입니다!" });
//                 setIsEmailDuplicated(true);
//                 setEmailChecked(false);
//             } else {
//                 setErrorMessages({ ...errorMessages, email: "사용 가능한 이메일입니다!" });
//                 setIsEmailDuplicated(false);
//                 setEmailChecked(true);
//             }
//         } catch (error) {
//             Alert.alert('오류 발생', error.message || "알 수 없는 에러가 발생했습니다.");
//         }
//     };

//     const checkNicknameDuplication = async () => {
//         try {
//             const response = await CheckNicknameDuplicationApi(userNickname);
//             if (!response.result) {
//                 setErrorMessages({ ...errorMessages, nickname: "사용자가 존재합니다." });
//                 setIsNicknameDuplicated(true);
//             } else {
//                 setErrorMessages({ ...errorMessages, nickname: "사용 가능한 닉네임입니다!" });
//                 setIsNicknameDuplicated(false);
//             }
//         } catch (error) {
//             Alert.alert('오류 발생', error.message || "알 수 없는 에러가 발생했습니다.");
//         }
//     };

//     useEffect(() => {
//         if (userNickname) {
//             checkNicknameDuplication();
//         }
//     }, [userNickname]);

//     const handleSubmit = async () => {
//         let errors = {};
            
//         if (!userEmail || !userEmail.includes('@')) errors.email = true;
//         if (!userPassword) errors.password = true;
//         if (userPassword !== userPasswordCheck) errors.passwordCheck = true;
//         if (!userNickname) errors.nickname = "닉네임을 입력하세요.";
//         if (!userPhoneNumber) errors.phoneNumber = "전화번호를 입력하세요.";
//         if (!emailChecked) errors.email = "이메일 중복 확인을 해주세요.";
        
//         setErrorMessages(errors);

//         if (Object.keys(errors).length) return;

//         const jsonData = {
//             userEmail: userEmail,
//             userPassword,
//             userNickname,
//             userPhoneNumber,
//             userProfile: "default.jpg"
//         };
//         console.log(jsonData)

//         try {
//             const response = await SignUpApi(jsonData);
//             console.log(response);

//             if (!response.result) {
//                 Alert.alert('회원가입 실패', response.message);
//                 return;
//             }

//             Alert.alert('회원가입 성공', '회원가입이 성공적으로 완료되었습니다!', [{
//                 text: '확인',
//                 onPress: () => navigation.navigate('SignIn')
//             }]);
//         } catch (error) {
//             Alert.alert('회원가입 실패', error.message || "알 수 없는 에러가 발생했습니다.");
//         }
//     };

//     return (
//         <View style={SignUpStyles.container}>
//             <View style={SignUpStyles.imageContainer}>
//                 <Image
                    // source={require('StockApp/src/assets/default.jpg')}
//                     style={SignUpStyles.profileImage}
//                 />
//             </View>
//             <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
//                 <TextInput
//                     style={errorMessages.email ? [SignUpStyles.emailInput, {borderColor: 'red'}] : SignUpStyles.emailInput}
//                     placeholder="이메일"
//                     value={userEmail}
//                     onChangeText={setUserEmail}
//                     keyboardType="email-address"
//                     onBlur={handleBlur('email')}
//                 />
//                 <TouchableOpacity onPress={checkEmailDuplication}>
//                     <Text style={{color: 'blue'}}>중복 확인</Text>
//                 </TouchableOpacity>
//             </View>
//             {errorMessages.email && <Text style={SignUpStyles.errorMessage}>{errorMessages.email}</Text>}

//             <TextInput
//                 style={errorMessages.password ? [SignUpStyles.input, {borderColor: 'red'}] : SignUpStyles.input}
//                 placeholder="비밀번호"
//                 value={userPassword}
//                 onChangeText={setUserPassword}
//                 secureTextEntry
//                 onBlur={handleBlur('password')}
//             />
//             {errorMessages.password && <Text style={SignUpStyles.errorMessage}>{errorMessages.password}</Text>}

//             <TextInput
//                 style={errorMessages.passwordCheck ? [SignUpStyles.input, {borderColor: 'red'}] : SignUpStyles.input}
//                 placeholder="비밀번호 확인"
//                 value={userPasswordCheck}
//                 onChangeText={setUserPasswordCheck}
//                 secureTextEntry
//                 onBlur={handleBlur('passwordCheck')}
//             />
//             {errorMessages.passwordCheck && <Text style={SignUpStyles.errorMessage}>{errorMessages.passwordCheck}</Text>}

//             <TextInput
//                 style={errorMessages.nickname ? [SignUpStyles.input, {borderColor: 'red'}] : SignUpStyles.input}
//                 placeholder="닉네임"
//                 value={userNickname}
//                 onChangeText={setUserNickname}
//                 onBlur={handleBlur('nickname')}
//             />
//             {errorMessages.nickname && <Text style={SignUpStyles.errorMessage} color={isNicknameDuplicated ? 'red' : 'black'}>{errorMessages.nickname}</Text>}

//             <TextInput
//                 style={errorMessages.phoneNumber ? [SignUpStyles.input, {borderColor: 'red'}] : SignUpStyles.input}
//                 placeholder="전화번호"
//                 value={userPhoneNumber}
//                 onChangeText={setUserPhoneNumber}
//                 keyboardType="phone-pad"
//                 onBlur={handleBlur('phoneNumber')}
//             />
//             {errorMessages.phoneNumber && <Text style={SignUpStyles.errorMessage}>{errorMessages.phoneNumber}</Text>}
//             <TouchableOpacity style={SignUpStyles.button} onPress={handleSubmit}>
//                 <Text style={SignUpStyles.buttonText}>가입하기</Text>
//             </TouchableOpacity>
//         </View>
//     );
// }

// export default SignUpPage;


import React, { useState } from 'react';
import { View, Alert, Image } from 'react-native';
import { SignUpApi } from '../../API/AuthApi';
import SignUpStyles from '../../styleSheet/SignUpStyles';

import EmailStep from './EmailStep'; // 가정한 경로
import PasswordStep from './PasswordStep'; // 가정한 경로
import PhoneNumberStep from './PhoneNumberStep'; // 가정한 경로
import NicknameStep from './NicknameStep'; // 가정한 경로

const SignUpPage = ({ navigation }) => {
    const [currentStep, setCurrentStep] = useState('email');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPasswordCheck, setUserPasswordCheck] = useState('');
    const [userNickname, setUserNickname] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState('');

    const handleNextStep = (nextStep) => {
        setCurrentStep(nextStep);
    };

    const handleSignUp = async () => {
        const signUpData = {
            userEmail,
            userPassword,
            userNickname,
            userPhoneNumber,
            userProfile: "default.jpg"
        };

        try {
            const response = await SignUpApi(signUpData);
            if (response.result) {
                Alert.alert('회원가입 성공', '회원가입이 성공적으로 완료되었습니다!', [{
                    text: '확인',
                    onPress: () => navigation.navigate('SignIn')
                }]);
            } else {
                Alert.alert('회원가입 실패', response.message);
            }
        } catch (error) {
            Alert.alert('회원가입 실패', error.message || "알 수 없는 에러가 발생했습니다.");
        }
    };

    return (
        <View style={SignUpStyles.container}>
            <View style={SignUpStyles.imageContainer}>
                <Image source={require('../../assets/default.jpg')} style={SignUpStyles.profileImage} />
            </View>
            {currentStep === 'email' && <EmailStep onNext={() => handleNextStep('password')} userEmail={userEmail} setUserEmail={setUserEmail} />}
            {currentStep === 'password' && <PasswordStep onNext={() => handleNextStep('phoneNumber')} userPassword={userPassword} setUserPassword={setUserPassword} userPasswordCheck={userPasswordCheck} setUserPasswordCheck={setUserPasswordCheck} />}
            {currentStep === 'phoneNumber' && <PhoneNumberStep onNext={() => handleNextStep('nickname')} userPhoneNumber={userPhoneNumber} setUserPhoneNumber={setUserPhoneNumber} />}
            {currentStep === 'nickname' && <NicknameStep onSignUp={handleSignUp} userNickname={userNickname} setUserNickname={setUserNickname} />}
        </View>
    );
};

export default SignUpPage;
