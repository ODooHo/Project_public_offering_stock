import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { CheckEmailDuplicationApi } from '../../API/AuthApi';
import SignUpStyles from '../../styleSheet/SignUpStyles';

const EmailStep = ({ onNext, userEmail, setUserEmail }) => {
    const [emailError, setEmailError] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);

    const validateEmail = (email) => {
        return email.includes('@') && email.split('@')[1];
    };

    const checkEmailDuplication = async () => {
        if (!validateEmail(userEmail)) {
            setEmailError("유효한 이메일을 입력해주세요.");
            setIsEmailValid(false);
            return;
        }

        try {
            const response = await CheckEmailDuplicationApi(userEmail);
            if (!response.result) {
                setEmailError("중복된 이메일입니다!");
                setIsEmailValid(false);
            } else {
                setEmailError("사용 가능한 이메일입니다!");
                setIsEmailValid(true);
            }
        } catch (error) {
            Alert.alert('오류 발생', error.message || "알 수 없는 에러가 발생했습니다.");
            setIsEmailValid(false);
        }
    };

    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <TextInput
                    style={emailError ? [SignUpStyles.emailInput, {borderColor: 'red'}] : SignUpStyles.emailInput}
                    placeholder="이메일"
                    value={userEmail}
                    onChangeText={setUserEmail}
                    keyboardType="email-address"
                />
                <TouchableOpacity onPress={checkEmailDuplication}>
                    <Text style={{color: 'blue'}}>중복 확인</Text>
                </TouchableOpacity>
            </View>
            {emailError && <Text style={SignUpStyles.errorMessage}>{emailError}</Text>}
            <TouchableOpacity style={SignUpStyles.button} onPress={() => isEmailValid && onNext()} disabled={!isEmailValid}>
                <Text style={SignUpStyles.buttonText}>다음</Text>
            </TouchableOpacity>
        </View>
    );
};

export default EmailStep;
