import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { CheckNicknameDuplicationApi } from '../../API/AuthApi';
import SignUpStyles from '../../styleSheet/SignUpStyles';

const NicknameStep = ({ onSignUp, userNickname, setUserNickname }) => {
    const [nicknameError, setNicknameError] = useState('');
    const [isNicknameValid, setIsNicknameValid] = useState(false);

    const checkNicknameDuplication = async () => {
        if (!userNickname) {
            setNicknameError("닉네임을 입력하세요.");
            setIsNicknameValid(false);
            return;
        }

        try {
            const response = await CheckNicknameDuplicationApi(userNickname);
            if (!response.result) {
                setNicknameError("이미 사용 중인 닉네임입니다.");
                setIsNicknameValid(false);
            } else {
                setNicknameError("");
                setIsNicknameValid(true);
            }
        } catch (error) {
            Alert.alert('오류 발생', error.message || "알 수 없는 에러가 발생했습니다.");
            setIsNicknameValid(false);
        }
    };

    useEffect(() => {
        if (userNickname) {
            checkNicknameDuplication();
        }
    }, [userNickname]);

    return (
        <View>
            <TextInput
                style={nicknameError ? [SignUpStyles.input, {borderColor: 'red'}] : SignUpStyles.input}
                placeholder="닉네임"
                value={userNickname}
                onChangeText={setUserNickname}
            />
            {nicknameError && <Text style={SignUpStyles.errorMessage}>{nicknameError}</Text>}

            <TouchableOpacity 
                style={SignUpStyles.button}
                onPress={isNicknameValid ? onSignUp : null}
                disabled={!isNicknameValid}>
                <Text style={SignUpStyles.buttonText}>다음</Text>
            </TouchableOpacity>
        </View>
    );
};

export default NicknameStep;
