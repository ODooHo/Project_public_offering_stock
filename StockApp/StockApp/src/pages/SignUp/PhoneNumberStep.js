import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import SignUpStyles from '../../styleSheet/SignUpStyles';

const PhoneNumberStep = ({ onNext, userPhoneNumber, setUserPhoneNumber }) => {
    const [phoneNumberError, setPhoneNumberError] = useState('');

    const validatePhoneNumber = () => {
        // 전화번호의 유효성을 검사하는 로직
        // 여기서는 예시를 위해 간단한 검사만 수행
        if (!userPhoneNumber) {
            setPhoneNumberError("전화번호를 입력하세요.");
            return false;
        }

        setPhoneNumberError('');
        return true;
    };

    const handleNext = () => {
        if (validatePhoneNumber()) {
            onNext();
        }
    };

    

    return (
        <View>
            <TextInput
                style={phoneNumberError ? [SignUpStyles.input, {borderColor: 'red'}] : SignUpStyles.input}
                placeholder="전화번호"
                value={userPhoneNumber}
                onChangeText={setUserPhoneNumber}
                keyboardType="phone-pad"
            />
            {phoneNumberError && <Text style={SignUpStyles.errorMessage}>{phoneNumberError}</Text>}

            <TouchableOpacity style={SignUpStyles.button} onPress={handleNext}>
                <Text style={SignUpStyles.buttonText}>다음</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PhoneNumberStep;
