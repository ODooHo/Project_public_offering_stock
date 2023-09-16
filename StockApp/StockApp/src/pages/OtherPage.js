import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const EmailInput = () => {
    const [email, setEmail] = useState('');
    const [domain, setDomain] = useState('');
    const [isCustomDomain, setIsCustomDomain] = useState(false);

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="이메일"
                style={{ width: 100, borderWidth: 1, borderColor: 'grey' }}
            />
            <Text>@</Text>
            <TextInput
                value={domain}
                onChangeText={setDomain}
                placeholder="도메인"
                editable={isCustomDomain}
                style={{ width: 100, borderWidth: 1, borderColor: 'grey' }}
            />
            <DropDownPicker
                items={[
                    { label: 'google.com', value: 'google.com' },
                    { label: 'naver.com', value: 'naver.com' },
                    { label: '사용자 입력', value: 'custom' },
                ]}
                defaultValue={domain}
                containerStyle={{ height: 40, width: 150 }}
                style={{ backgroundColor: '#fafafa' }}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
                onChangeItem={item => {
                    if (item.value === 'custom') {
                        setIsCustomDomain(true);
                    } else {
                        setDomain(item.value);
                        setIsCustomDomain(false);
                    }
                }}
            />
        </View>
    );
}

export default EmailInput;
