import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import SignUpStyles from '../../styleSheet/SignUpStyles';

const PasswordStep = ({ onNext, userPassword, setUserPassword, userPasswordCheck, setUserPasswordCheck }) => {
    const [passwordError, setPasswordError] = useState('');
    const [passwordCheckError, setPasswordCheckError] = useState('');

    const validatePassword = () => {
        if (!userPassword) {
            setPasswordError("비밀번호를 입력하세요.");
            return false;
        }

        if (userPassword !== userPasswordCheck) {
            setPasswordCheckError("비밀번호가 일치하지 않습니다!");
            return false;
        }

        setPasswordError('');
        setPasswordCheckError('');
        return true;
    };

    const handleNext = () => {
        if (validatePassword()) {
            onNext();
        }
    };

    return (
        <View>
            <TextInput
                style={passwordError ? [SignUpStyles.input, {borderColor: 'red'}] : SignUpStyles.input}
                placeholder="비밀번호"
                value={userPassword}
                onChangeText={setUserPassword}
                secureTextEntry
            />
            {passwordError && <Text style={SignUpStyles.errorMessage}>{passwordError}</Text>}

            <TextInput
                style={passwordCheckError ? [SignUpStyles.input, {borderColor: 'red'}] : SignUpStyles.input}
                placeholder="비밀번호 확인"
                value={userPasswordCheck}
                onChangeText={setUserPasswordCheck}
                secureTextEntry
            />
            {passwordCheckError && <Text style={SignUpStyles.errorMessage}>{passwordCheckError}</Text>}

            <TouchableOpacity style={SignUpStyles.button} onPress={handleNext}>
                <Text style={SignUpStyles.buttonText}>다음</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PasswordStep;
