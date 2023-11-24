import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default MyCalendar = () => {
    const [markedDates, setMarkedDates] = useState({});

    // 가정: likedIPOs는 사용자가 좋아요를 누른 공모주 데이터 배열
    const likedIPOs = [
        { ipoName: 'CompanyA', date: '2023-10-15' },
        //... 다른 데이터
    ];

    useEffect(() => {
        const newMarkedDates = {};

        likedIPOs.forEach(ipo => {
            newMarkedDates[ipo.date] = { 
                selected: true, 
                marked: true, 
                selectedColor: 'blue',
                customStyles: {
                    container: {
                        backgroundColor: 'lightblue',
                    },
                    text: {
                        color: 'blue',
                        fontWeight: 'bold',
                    },
                },
            };
        });

        setMarkedDates(newMarkedDates);
    }, [likedIPOs]);

    return (
        <View>
            <Calendar 
                markedDates={markedDates}
                onDayPress={(day) => {
                    const ipoOnThisDay = likedIPOs.find(ipo => ipo.date === day.dateString);
                    if (ipoOnThisDay) {
                        alert(`공모주: ${ipoOnThisDay.ipoName}, 날짜: ${day.dateString}`);
                    }
                }}
            />
        </View>
    );
};
