import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { getTrades, createTrade, deleteTrade } from '../API/TradeApi';
import DateTimePicker from '@react-native-community/datetimepicker';
import MonthPicker from 'react-native-month-year-picker';
import { Swipeable } from 'react-native-gesture-handler';
import useUserStore from '../UserInfo/UserStore';

const TradeDetail = () => {
  const [trades, setTrades] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const userInfo = useUserStore((state) => state.user);
  const [newTrade, setNewTrade] = useState({
    tradeDate: new Date(),
    tradeName: '',
    tradeType: 'Buy',
    tradePrice: '',
    tradeQuantity: '',
    tradeFee: '',
    notes: '',
  });

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await getTrades();
        if (response && response.data) {
          setTrades(response.data);
        }
      } catch (error) {
        console.error('매매 내역 가져오기 오류:', error);
      }
    };
    fetchTrades();
  }, []);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleAddTrade = async () => {
    const tradeData = {
      userEmail: userInfo.userEmail,
      tradeDate: newTrade.tradeDate.toISOString().split('T')[0], // 날짜를 LocalDate 형식으로 변환
      tradeName: newTrade.tradeName,
      tradeType: newTrade.tradeType,
      tradePrice: isNaN(parseInt(newTrade.tradePrice)) ? 0 : parseInt(newTrade.tradePrice),
      tradeQuantity: isNaN(parseInt(newTrade.tradeQuantity)) ? 0 : parseInt(newTrade.tradeQuantity),
      tradeFee: isNaN(parseInt(newTrade.tradeFee)) ? 0 : parseInt(newTrade.tradeFee),
      memo: newTrade.notes,
    };
    try {
      const response = await createTrade(tradeData);
      setTrades(prevTrades => [...prevTrades, response]);
      setNewTrade({
        tradeDate: new Date(),
        tradeName: '',
        tradeType: 'Buy',
        tradePrice: '',
        tradeQuantity: '',
        tradeFee: '',
        notes: '',
      });
    } catch (error) {
      console.error('매매 추가 오류:', error);
    }
  };

  const handleDeleteTrade = async (tradeId) => {
    try {
      await deleteTrade(tradeId);
      setTrades(prevTrades => prevTrades.filter(trade => trade.tradeId !== tradeId));
    } catch (error) {
      console.error('매매 삭제 오류:', error);
    }
  };

  const toggleTradeType = (type) => {
    setNewTrade(prev => ({ ...prev, tradeType: type }));
  };

  const TableHeader = () => (
    <View style={styles.headerRow}>
      <Text style={styles.headerCell}>날짜</Text>
      <Text style={styles.headerCell}>종목명</Text>
      <Text style={styles.headerCell}>매매유형</Text>
      <Text style={styles.headerCell}>매매가격</Text>
      <Text style={styles.headerCell}>수량</Text>
      <Text style={styles.headerCell}>수수료</Text>
      <Text style={styles.headerCell}>메모</Text>
    </View>
  );

  const renderRightActions = (progress, dragX, onSwipeableRightOpen) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });
  
    return (
      <TouchableOpacity
        onPress={onSwipeableRightOpen}
        style={{
          flex: 1,
          backgroundColor: 'lightcoral',
          justifyContent: 'flex-end',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <Animated.Text
          style={{
            color: 'white',
            paddingHorizontal: 20,
            fontWeight: '600',
            transform: [{ translateX: trans }],
          }}
        >
          삭제
        </Animated.Text>
      </TouchableOpacity>
    );
  };

  const showMonthPicker = () => {
    setShowPicker(true);
  };

  const onValueChange = (event, newDate) => {
    setShowPicker(false);
    if (newDate) {
      setDate(newDate);
      setSelectedMonth(newDate);
    }
  };

  const renderItem = ({ item }) => (
    <Swipeable renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, () => handleDeleteTrade(item.tradeId))}>
      <View style={styles.row}>
        {/* <Text style={styles.cell} numberOfLines={1}>{item.tradeDate}</Text> */}
        <Text style={styles.cell}>{item.tradeDate}</Text>
        <Text style={styles.cell}>{item.tradeName}</Text>
        {/* <Text style={styles.cell}>{item.tradeType}</Text> */}
        <Text style={styles.cell}>{item.tradePrice}</Text>
        <Text style={styles.cell}>{item.tradeQuantity}</Text>
        <Text style={styles.cell}>{item.tradeFee}</Text>
        <Text style={styles.cell}>{item.memo}</Text>
        {/* <Text>날짜: {item.tradeDate ? new Date(item.tradeDate).toLocaleDateString() : 'N/A'}</Text>
        <Text>종목: {item.tradeName}</Text>
        <Text>매매 유형: {item.tradeType}</Text>
        <Text>매매 가격: {item.tradePrice}</Text>
        <Text>보유 주식 수량: {item.tradeQuantity}</Text>
        <Text>거래 수수료: {item.tradeFee}</Text>
        <Text>메모: {item.memo}</Text> */}
        {/* <TouchableOpacity onPress={() => handleDeleteTrade(item.tradeId)}>
          <Text style={styles.deleteButton}>삭제</Text>
        </TouchableOpacity> */}
      </View>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleFormVisibility} style={styles.toggleButton}>
        <Text style={styles.toggleButtonText}>{isFormVisible ? '매매일지 숨기기' : '매매일지 작성'}</Text>
      </TouchableOpacity>
      {/* <Button title='매매일지 작성' onPress={toggleFormVisibility} /> */}
      {isFormVisible && (
        <View>
          <View style={styles.tradeInputRow}>
            <DateTimePicker
              style={styles.datePickerStyle}
              value={newTrade.tradeDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                if (selectedDate) {
                  setNewTrade(prev => ({ ...prev, tradeDate: selectedDate }));
                }
              }}
            />
            <TouchableOpacity
              style={[
                styles.tradeTypeButton,
                newTrade.tradeType === 'Sell' && styles.selectedTradeType
              ]}
              onPress={() => toggleTradeType('Sell')}
            >
              <Text>매도</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.stockNameInput}
              placeholder="종목 이름"
              value={newTrade.stockName}
              onChangeText={text => setNewTrade(prev => ({ ...prev, tradeName: text }))}
            />
          </View>
          <View style={styles.tradeDetailRow}>
            <TextInput
              style={styles.input}
              placeholder="매매 가격"
              value={newTrade.price}
              onChangeText={text => setNewTrade(prev => ({ ...prev, tradePrice: text }))}
            />
            <Text>원</Text>
            <TextInput
              style={styles.quantityInput}
              placeholder="보유 주식 수량"
              value={newTrade.quantity}
              onChangeText={text => setNewTrade(prev => ({ ...prev, tradeQuantity: text }))}
            />
            <Text>주</Text>
            <TextInput
              style={styles.commissionInput}
              placeholder="거래 수수료"
              value={newTrade.commission}
              onChangeText={text => setNewTrade(prev => ({ ...prev, tradeFee: text }))}
            />
            <Text>원</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="기타 메모"
            value={newTrade.notes}
            onChangeText={text => setNewTrade(prev => ({ ...prev, notes: text }))}
          />
        <Button title="매매일지 추가" onPress={handleAddTrade} />
        </View>
      )}
      <Text style={styles.tradeHeader}>매매일지 목록</Text>
      <Button title="월 선택" onPress={showMonthPicker} />
      {showPicker && (
        <MonthPicker
          onChange={onValueChange}
          value={date}
          minimumDate={new Date(2020, 0)}
          maximumDate={new Date(2050, 5)}
          locale="ko"
        />
      )}
      <FlatList
        data={trades.filter(item => {
          const tradeDate = new Date(item.tradeDate);
          return tradeDate.getMonth() === selectedMonth.getMonth() && tradeDate.getFullYear() === selectedMonth.getFullYear();
        })}
        // data={trades}
        keyExtractor={item => String(item.tradeId)}
        renderItem={renderItem}
        ListHeaderComponent={TableHeader}
      />
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  tradeInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8,
  },
  datePickerStyle: {
    flex: 1,
    padding: 8,
  },
  tradeTypeButton: {
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 10,
    // marginHorizontal: 5,
    borderColor: '#4eadeb',
    borderWidth: 1,
  },
  selectedTradeType: {
    backgroundColor: '#2e81b7',
  },
  stockNameInput: {
    flex: 1,
    margin: 8,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
  },
  tradeHeader: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 20,
    color: '#555',
  },
  tradeItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 6,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    elevation: 3,
  },
  // deleteButton: {
  //   color: '#ff4d4d',
  //   fontWeight: '400',
  //   textAlign: 'right',
  // },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80, // 슬라이드 영역의 너비를 설정합니다.
    // 기타 스타일 속성
  },
  tradeDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginHorizontal: 8,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
  },
  quantityInput: { 
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 6,
    width: '20%', 
  },
  commissionInput: { 
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 6,
    width: '25%',
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#5cb85c',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 10,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f4',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  // headerRow: {
  //   flexDirection: 'row',
  //   backgroundColor: '#f4f4f4', // 헤더의 배경색을 설정하여 구분을 줍니다.
  //   borderBottomWidth: 2,
  //   borderBottomColor: '#000',
  // },
  headerCell: {
    // 각 헤더 셀에 대한 flex 값 조정
    flex: 2, // 날짜
    flex: 3, // 종목명
    flex: 2, // 매매유형
    flex: 3, // 매매가격
    flex: 2, // 수량
    flex: 2, // 수수료
    flex: 3, // 메모
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  // headerCell: {
  //   width: 50,
  //   // flex: 1,
  //   fontSize: 13,
  //   fontWeight: '500',
  //   padding: 10,
  //   textAlign: 'center',
  // },
  cell: {
    flex: 1, // 모든 셀에 동일한 flex 값을 부여합니다.
    margin: 3,
    textAlign: 'center', // 텍스트를 중앙에 정렬합니다.
  },
  rightAction: {
    // 스타일 속성들을 정의합니다.
    backgroundColor: 'red',
    justifyContent: 'center',
    // 기타 스타일 속성들...
  },
  actionText: {
    color: 'white',
    // 기타 텍스트 스타일 속성들...
  },
});

export { TradeDetail };
