// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
// import { Calendar } from 'react-native-calendars';
// import { getFavoriteIpo } from '../API/IpoApi';
// import { useNavigation } from '@react-navigation/native';
// import useUserStore from '../UserInfo/UserStore';

// const CalendarPage = () => {
//     const [markedDates, setMarkedDates] = useState({});
//     const [selectedEvent, setSelectedEvent] = useState(null);
//     const userInfo = useUserStore((state) => state.user);


//     useEffect(() => {
//         const loadFavoriteIpoEvents = async () => {
//             try {
//                 let favoriteIpoList = await getFavoriteIpo();
//                 if (favoriteIpoList && typeof favoriteIpoList === 'object' && favoriteIpoList.data) {
//                     favoriteIpoList = favoriteIpoList.data;
//                 } else if (typeof favoriteIpoList === 'string') {
//                     favoriteIpoList = JSON.parse(favoriteIpoList);
//                 }
//                 if (!Array.isArray(favoriteIpoList)) {
//                     console.error('favoriteIpoList is not an array:', favoriteIpoList);
//                     return;
//                 }
//                 const events = favoriteIpoList.reduce((acc, favoriteIpo) => {
//                     if (!favoriteIpo.date || !favoriteIpo.ipoName) {
//                         console.warn('Invalid IPO data:', favoriteIpo);
//                         return acc;
//                     }
//                     const dates = favoriteIpo.date.match(/\d{4}\.\d{2}\.\d{2}/g);
//                     if (!dates || dates.length < 2) {
//                         console.warn('Failed to parse endDate from ipoDetail.date:', favoriteIpo.date);
//                         return acc;
//                     }
//                     const endDateString = dates[1].replace(/\./g, '-');
//                     acc[endDateString] = {
//                         ipoName: favoriteIpo.ipoName,
//                         date: favoriteIpo.date,
//                         customStyles: {
//                             container: {
//                                 backgroundColor: 'blue',
//                                 borderRadius: 10,
//                             },
//                             text: {
//                                 color: 'white',
//                                 fontWeight: 'bold',
//                             },
//                         },
//                         text: '청약',
//                     };
//                     return acc;
//                 }, {});
                
//                 setMarkedDates((prevEvents) => ({ ...prevEvents, ...events }));
//             } catch (error) {
//                 console.error('Error loading favorite IPO events', error);
//                 Alert.alert('Error', 'Failed to load favorite IPO events');
//             }
//         };
//         loadFavoriteIpoEvents();
//     }, []);


//     const navigation = useNavigation();

//     const onDayPress = (day) => {
//         console.log('Selected day', day);
//         const selectedDate = markedDates[day.dateString];
//         if (selectedDate) {
//             setSelectedEvent({
//                 name: selectedDate.ipoName,
//                 date: selectedDate.date,
//             });
//         } else {
//             setSelectedEvent(null);
//         }
//     };

//     const goToIpoDetail = () => {
//         if (selectedEvent) {
//             navigation.navigate('IpoDetail', { ipoName: selectedEvent.name });
//         }
//     };

//     const DayComponent = ({ date, state, marking }) => {
//         let dayContainerStyle = {...styles.dayContainer};
//         let dayTextStyle = {...styles.dayText, color: state === 'disabled' ? 'gray' : 'black'};
//         let markingLabel = null;

//         if (marking?.text === '청약') {
//             markingLabel = (
//                 <View style={styles.markingLabelContainer}>
//                     <Text style={styles.markingLabelText}>{marking.text}</Text>
//                 </View>
//             );
//         }

//         return (
//             <TouchableOpacity onPress={() => onDayPress(date)} style={dayContainerStyle}>
//                 <Text style={dayTextStyle}>{date.day}</Text>
//                 {markingLabel}
//             </TouchableOpacity>
//         )
//     };

//     return (
//         <View style={{ flex: 1 }}>
//             <Calendar
//                 markedDates={markedDates}
//                 onDayPress={onDayPress}
//                 markingType={'custom'}
//                 style={styles.calendarStyle}
//                 dayComponent={DayComponent}
//             />
//             {selectedEvent && (
//                 <TouchableOpacity style={styles.eventInfo} onPress={goToIpoDetail}>
//                 <Text style={styles.eventText}>{selectedEvent.name}</Text>
//                 <Text style={styles.eventText}>{selectedEvent.date}</Text>
//                 </TouchableOpacity>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     calendarStyle: {
//         marginTop: 20,
//         height: undefined,
//         width: '100%'
//     },
//     dayContainer: {
//         paddingVertical: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: 50,
//         width: '100%',
//         marginBottom: 30,
//         marginTop: -25,
//     },
//     dayText: {
//         fontSize: 12,
//         color: 'black',
//     },
//     markingLabelContainer:{
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         right: 0,
//         height: 15,
//         paddingHorizontal: 15,
//         justifyContent: 'center',
//         backgroundColor: 'skyblue',
//         borderRadius: 5,
//     },
//     markingLabelText: {
//         textAlign: 'center',
//         color: 'white',
//         fontWeight: '400',
//         fontSize: 11,
//     },
//     eventInfo: {
//         padding: 16,
//         backgroundColor: '#ffffff',
//         marginHorizontal: 10,
//         borderRadius: 10,
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25, // 그림자 투명도
//         shadowRadius: 3.84, // 그림자 블러 반경
//         // elevation: 5, // 안드로이드에서 그림자 효과를 위해
//         marginTop: 10, // 달력과의 상단 여백
//         borderTopWidth: 0, // 상단 테두리 제거
//         // borderTopWidth: 1,
//         // borderTopColor: '#e0e0e0',
//     },
//     eventText: {
//         fontSize: 16, // 폰트 크기 증가
//         fontWeight: '400', // 폰트 굵기
//         color: '#333', // 진한 글씨색
//         // marginBottom: 5, // 텍스트 간의 하단 여백
//     },
// });

// export default CalendarPage;




// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
// import { Calendar } from 'react-native-calendars';
// import { getFavoriteIpo } from '../API/IpoApi';
// import { useNavigation } from '@react-navigation/native';
// import useUserStore from '../UserInfo/UserStore';

// const CalendarPage = () => {
//     const [markedDates, setMarkedDates] = useState({});
//     const [selectedEvent, setSelectedEvent] = useState(null);
//     const userInfo = useUserStore((state) => state.user);
//     const navigation = useNavigation();

//     const loadFavoriteIpoEvents = async () => {
//         try {
//             let favoriteIpoList = await getFavoriteIpo();
//             if (favoriteIpoList && typeof favoriteIpoList === 'object' && favoriteIpoList.data) {
//                 favoriteIpoList = favoriteIpoList.data;
//             } else if (typeof favoriteIpoList === 'string') {
//                 favoriteIpoList = JSON.parse(favoriteIpoList);
//             }
//             if (!Array.isArray(favoriteIpoList)) {
//                 console.error('favoriteIpoList is not an array:', favoriteIpoList);
//                 return;
//             }
//             const events = favoriteIpoList.reduce((acc, favoriteIpo) => {
//                 if (!favoriteIpo.date || !favoriteIpo.ipoName) {
//                     console.warn('Invalid IPO data:', favoriteIpo);
//                     return acc;
//                 }
//                 const dates = favoriteIpo.date.match(/\d{4}\.\d{2}\.\d{2}/g);
//                 if (!dates || dates.length < 2) {
//                     console.warn('Failed to parse endDate from ipoDetail.date:', favoriteIpo.date);
//                     return acc;
//                 }
//                 const endDateString = dates[1].replace(/\./g, '-');
//                 acc[endDateString] = {
//                     ipoName: favoriteIpo.ipoName,
//                     date: favoriteIpo.date,
//                     customStyles: {
//                         container: {
//                             backgroundColor: 'blue',
//                             borderRadius: 10,
//                         },
//                         text: {
//                             color: 'white',
//                             fontWeight: 'bold',
//                         },
//                     },
//                     text: '청약',
//                 };
//                 return acc;
//             }, {});
            
//             setMarkedDates((prevEvents) => ({ ...prevEvents, ...events }));
//         } catch (error) {
//             console.error('Error loading favorite IPO events', error);
//             Alert.alert('Error', 'Failed to load favorite IPO events');
//         }
//     };

//     useEffect(() => {
//         const unsubscribe = navigation.addListener('focus', loadFavoriteIpoEvents);
//         return unsubscribe;
//     }, [navigation, loadFavoriteIpoEvents]);

//     const onDayPress = (day) => {
//         console.log('Selected day', day);
//         const selectedDate = markedDates[day.dateString];
//         if (selectedDate) {
//             setSelectedEvent({
//                 name: selectedDate.ipoName,
//                 date: selectedDate.date,
//             });
//         } else {
//             setSelectedEvent(null);
//         }
//     };

//     const goToIpoDetail = () => {
//         if (selectedEvent) {
//             navigation.navigate('IpoDetail', { ipoName: selectedEvent.name });
//         }
//     };

//     const DayComponent = ({ date, state, marking }) => {
//         let dayContainerStyle = {...styles.dayContainer};
//         let dayTextStyle = {...styles.dayText, color: state === 'disabled' ? 'gray' : 'black'};
//         let markingLabel = null;

//         if (marking?.text === '청약') {
//             markingLabel = (
//                 <View style={styles.markingLabelContainer}>
//                     <Text style={styles.markingLabelText}>{marking.text}</Text>
//                 </View>
//             );
//         }

//         return (
//             <TouchableOpacity onPress={() => onDayPress(date)} style={dayContainerStyle}>
//                 <Text style={dayTextStyle}>{date.day}</Text>
//                 {markingLabel}
//             </TouchableOpacity>
//         )
//     };

//     return (
//         <View style={{ flex: 1 }}>
//             <Calendar
//                 markedDates={markedDates}
//                 onDayPress={onDayPress}
//                 markingType={'custom'}
//                 style={styles.calendarStyle}
//                 dayComponent={DayComponent}
//             />
//             {selectedEvent && (
//                 <TouchableOpacity style={styles.eventInfo} onPress={goToIpoDetail}>
//                 <Text style={styles.eventText}>{selectedEvent.name}</Text>
//                 <Text style={styles.eventText}>{selectedEvent.date}</Text>
//                 </TouchableOpacity>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     calendarStyle: {
//         marginTop: 20,
//         height: undefined,
//         width: '100%'
//     },
//     dayContainer: {
//         paddingVertical: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: 50,
//         width: '100%',
//         marginBottom: 30,
//         marginTop: -25,
//     },
//     dayText: {
//         fontSize: 12,
//         color: 'black',
//     },
//     markingLabelContainer:{
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         right: 0,
//         height: 15,
//         paddingHorizontal: 15,
//         justifyContent: 'center',
//         backgroundColor: 'skyblue',
//         borderRadius: 5,
//     },
//     markingLabelText: {
//         textAlign: 'center',
//         color: 'white',
//         fontWeight: '400',
//         fontSize: 11,
//     },
//     eventInfo: {
//         padding: 16,
//         backgroundColor: '#ffffff',
//         marginHorizontal: 10,
//         borderRadius: 10,
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25, // 그림자 투명도
//         shadowRadius: 3.84, // 그림자 블러 반경
//         // elevation: 5, // 안드로이드에서 그림자 효과를 위해
//         marginTop: 10, // 달력과의 상단 여백
//         borderTopWidth: 0, // 상단 테두리 제거
//     },
//     eventText: {
//         fontSize: 16, // 폰트 크기 증가
//         fontWeight: '400', // 폰트 굵기
//         color: '#333', // 진한 글씨색
//     },
// });

// export default CalendarPage;






import React, { useState, useEffect, memo } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { getFavoriteIpo } from '../API/IpoApi';
import { useNavigation } from '@react-navigation/native';
import useUserStore from '../UserInfo/UserStore';

const DayComponent = memo(({ date, state, marking, onPress }) => {
    let dayContainerStyle = {...styles.dayContainer};
    let dayTextStyle = {...styles.dayText, color: state === 'disabled' ? 'gray' : 'black'};
    let markingLabel = null;

    if (marking?.text === '청약') {
        markingLabel = (
            <View style={styles.markingLabelContainer}>
                <Text style={styles.markingLabelText}>{marking.text}</Text>
            </View>
        );
    }

    return (
        <TouchableOpacity onPress={() => onPress(date)} style={dayContainerStyle}>
            <Text style={dayTextStyle}>{date.day}</Text>
            {markingLabel}
        </TouchableOpacity>
    );
});

const CalendarPage = () => {
    const [markedDates, setMarkedDates] = useState({});
    const [selectedEvent, setSelectedEvent] = useState(null);
    const userInfo = useUserStore((state) => state.user);
    const navigation = useNavigation();

    const loadFavoriteIpoEvents = async () => {
        try {
            let favoriteIpoList = await getFavoriteIpo();
            if (favoriteIpoList && typeof favoriteIpoList === 'object' && favoriteIpoList.data) {
                favoriteIpoList = favoriteIpoList.data;
            } else if (typeof favoriteIpoList === 'string') {
                favoriteIpoList = JSON.parse(favoriteIpoList);
            }
            if (!Array.isArray(favoriteIpoList)) {
                console.error('favoriteIpoList is not an array:', favoriteIpoList);
                return;
            }
            const events = favoriteIpoList.reduce((acc, favoriteIpo) => {
                if (!favoriteIpo.date || !favoriteIpo.ipoName) {
                    console.warn('Invalid IPO data:', favoriteIpo);
                    return acc;
                }
                const dates = favoriteIpo.date.match(/\d{4}\.\d{2}\.\d{2}/g);
                if (!dates || dates.length < 2) {
                    console.warn('Failed to parse endDate from ipoDetail.date:', favoriteIpo.date);
                    return acc;
                }
                const endDateString = dates[1].replace(/\./g, '-');
                acc[endDateString] = {
                    ipoName: favoriteIpo.ipoName,
                    date: favoriteIpo.date,
                    customStyles: {
                        container: {
                            backgroundColor: 'blue',
                            borderRadius: 10,
                        },
                        text: {
                            color: 'white',
                            fontWeight: 'bold',
                        },
                    },
                    text: '청약',
                };
                return acc;
            }, {});
            
            setMarkedDates((prevEvents) => ({ ...prevEvents, ...events }));
        } catch (error) {
            console.error('Error loading favorite IPO events', error);
            Alert.alert('Error', 'Failed to load favorite IPO events');
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', loadFavoriteIpoEvents);
        return unsubscribe;
    }, [navigation, loadFavoriteIpoEvents]);

    const onDayPress = (day) => {
        console.log('Selected day', day);
        const selectedDate = markedDates[day.dateString];
        if (selectedDate) {
            setSelectedEvent({
                name: selectedDate.ipoName,
                date: selectedDate.date,
            });
        } else {
            setSelectedEvent(null);
        }
    };

    const goToIpoDetail = () => {
        if (selectedEvent) {
            navigation.navigate('IpoDetail', { ipoName: selectedEvent.name });
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Calendar
                markedDates={markedDates}
                onDayPress={onDayPress}
                markingType={'custom'}
                style={styles.calendarStyle}
                dayComponent={(props) => <DayComponent {...props} onPress={onDayPress} />}
            />
            {selectedEvent && (
                <TouchableOpacity style={styles.eventInfo} onPress={goToIpoDetail}>
                    <Text style={styles.eventText}>{selectedEvent.name}</Text>
                    <Text style={styles.eventText}>{selectedEvent.date}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    calendarStyle: {
        marginTop: 20,
        height: undefined,
        width: '100%'
    },
    dayContainer: {
        paddingVertical: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: '100%',
        marginBottom: 30,
        marginTop: -25,
    },
    dayText: {
        fontSize: 12,
        color: 'black',
    },
    markingLabelContainer:{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 15,
        paddingHorizontal: 15,
        justifyContent: 'center',
        backgroundColor: 'skyblue',
        borderRadius: 5,
    },
    markingLabelText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '400',
        fontSize: 11,
    },
    eventInfo: {
        padding: 16,
        backgroundColor: '#ffffff',
        marginHorizontal: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginTop: 10,
        borderTopWidth: 0,
    },
    eventText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#333',
    },
});

export default CalendarPage;
