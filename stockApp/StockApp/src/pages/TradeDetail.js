import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { getTrades, createTrade, deleteTrade } from '../API/TradeApi';
import { calculateTotalProfitRate } from './TradeProfit';
import DateTimePicker from '@react-native-community/datetimepicker';
import MonthPicker from 'react-native-month-year-picker';
import { Swipeable } from 'react-native-gesture-handler';
import useUserStore from '../UserInfo/UserStore';

const TradeDetail = () => {
  const [trades, setTrades] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [monthLabel, setMonthLabel] = useState('');
  const [monthlyProfitRate, setMonthlyProfitRate] = useState(null);
  const userInfo = useUserStore((state) => state.user);
  const [newTrade, setNewTrade] = useState({
    tradeDate: new Date(),
    tradeName: '',
    buyPrice: 'null',
    sellPrice: 'null',
    tradeQuantity: 'null',
    tradeFee: 'null',
    memo: '',
  });

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await getTrades();
        if (response && response.data) {
          setTrades(response.data);
          console.log("매매일지", response.data);
        }
      } catch (error) {
        console.error('매매 내역 가져오기 오류:', error);
      }
    };
    
    fetchTrades();
  }, []);

  useEffect(() => {
    const monthlyTrades = trades.filter(item => {
      const tradeDate = new Date(item.tradeDate);
      return tradeDate.getMonth() === selectedMonth?.getMonth() &&
             tradeDate.getFullYear() === selectedMonth?.getFullYear();
    });
    const monthlyProfit = calculateTotalProfitRate(monthlyTrades);
    setMonthlyProfitRate(monthlyProfit);
  }, [selectedMonth, trades]);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleAddTrade = async () => {
    const tradeData = {
      userEmail: userInfo.userEmail,
      tradeDate: newTrade.tradeDate.toISOString().split('T')[0], // 날짜를 LocalDate 형식으로 변환
      tradeName: newTrade.tradeName,
      buyPrice: isNaN(parseInt(newTrade.buyPrice)) ? 0 : parseInt(newTrade.buyPrice),
      sellPrice: isNaN(parseInt(newTrade.sellPrice)) ? 0 : parseInt(newTrade.sellPrice),
      tradeQuantity: isNaN(parseInt(newTrade.tradeQuantity)) ? 0 : parseInt(newTrade.tradeQuantity),
      tradeFee: isNaN(parseInt(newTrade.tradeFee)) ? 0 : parseInt(newTrade.tradeFee),
      memo: newTrade.memo,
    };

    // 데이터 로그에 출력
    console.log('추가할 매매일지 데이터:', tradeData);

    try {
      const response = await createTrade(tradeData);
      setTrades(prevTrades => [...prevTrades, response]);
      setNewTrade({
        tradeDate: new Date(),
        tradeName: '',
        buyPrice: '',
        sellPrice: '',
        tradeQuantity: '',
        tradeFee: '',
        memo: '',
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

  const renderRightActions = (progress, dragX, onSwipeableRightOpen) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity onPress={onSwipeableRightOpen} style={{ flex: 1, backgroundColor: 'lightcoral', justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row', }}>
        <Animated.Text style={{ color: 'white', paddingHorizontal: 20, fontWeight: '600', transform: [{ translateX: trans }], }}>삭제</Animated.Text>
      </TouchableOpacity>
    );
  };

  const TableHeader = () => (
    <View style={styles.headerRow}>
      <Text style={styles.dateHeaderCell}>날짜</Text>
      <Text style={styles.nameHeaderCell}>종목명</Text>
      <Text style={styles.priceHeaderCell}>매매가격</Text>
      <Text style={styles.quantityHeaderCell}>수량</Text>
      <Text style={styles.feeHeaderCell}>수수료</Text>
      <Text style={styles.memoHeaderCell}>메모</Text>
    </View>
  );

  const filteredTrades = selectedMonth
    ? trades.filter(item => {
        const tradeDate = new Date(item.tradeDate);
        return (
          tradeDate.getMonth() === selectedMonth.getMonth() &&
          tradeDate.getFullYear() === selectedMonth.getFullYear()
        );
      })
    : trades;

  const showMonthPicker = () => {
    setShowPicker(true);
  };

  const onValueChange = (event, newDate) => {
    setShowPicker(false);
    if (newDate) {
      setDate(newDate);
      setSelectedMonth(newDate);
      const monthYear = newDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' });
      setMonthLabel(monthYear);

      // const monthlyTrades = trades.filter(item => {
      //   const tradeDate = new Date(item.tradeDate);
      //   return tradeDate.getMonth() === newDate.getMonth() &&
      //          tradeDate.getFullYear() === newDate.getFullYear();
      // });
      // const monthlyProfit = calculateTotalProfitRate(monthlyTrades);
      // setMonthlyProfitRate(monthlyProfit);
    }
  };
  
  const MaxLengthText = ({ content='', maxLength, style }) => {
    const firstPart = content.slice(0, maxLength);
    const secondPart = content.slice(maxLength);
    return (
      <View>
        <Text style={style}>{firstPart}</Text>
        {secondPart.length > 0 && <Text style={style}>{secondPart}</Text>}
      </View>
    );
  };

  const ListFooter = () => {
    const displayedProfitRate = selectedMonth
    ? calculateTotalProfitRate(filteredTrades)
    : calculateTotalProfitRate(trades);

    return (
      <View style={styles.footerRow}>
        <Text style={styles.footerCell}>총 수익률:</Text>
        <Text style={styles.footerCell}>{displayedProfitRate}%</Text>
        {/* <Text style={styles.footerCell}>{monthlyProfitRate ?? '0.00'}%</Text> */}
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <Swipeable renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, () => handleDeleteTrade(item.tradeId))}>
      <View style={styles.row}>
        <Text style={styles.dateCell}>{item.tradeDate}</Text>
        <MaxLengthText content={item.tradeName} maxLength={5} style={styles.nameCell}/>
        <Text style={styles.priceCell}>{item.sellPrice}</Text>
        <Text style={styles.quantityCell}>{item.tradeQuantity}</Text>
        <Text style={styles.feeCell}>{item.tradeFee}</Text>
        <Text style={styles.memoCell}>{item.memo}</Text>
      </View>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleFormVisibility} style={styles.toggleButton}>
        <Text style={styles.toggleButtonText}>{isFormVisible ? '매매일지 숨기기' : '매매일지 작성'}</Text>
      </TouchableOpacity>
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
            <TextInput
              style={styles.stockNameInput}
              placeholder="종목 이름"
              value={newTrade.tradeName}
              onChangeText={text => setNewTrade(prev => ({ ...prev, tradeName: text }))}
            />
            <TextInput
              style={styles.input}
              placeholder="공모가"
              value={newTrade.price}
              onChangeText={text => setNewTrade(prev => ({ ...prev, buyPrice: text }))}
            />
            <Text>원</Text>
          </View>
          <View style={styles.tradeDetailRow}>
            <TextInput
              style={styles.input}
              placeholder="매도가"
              value={newTrade.price}
              onChangeText={text => setNewTrade(prev => ({ ...prev, sellPrice: text }))}
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
            value={newTrade.memo}
            onChangeText={text => setNewTrade(prev => ({ ...prev, memo: text }))}
          />
        <Button title="매매일지 추가" onPress={handleAddTrade} />
        </View>
      )}
      <View style={styles.tradeHeaderRow}>
        <Text style={styles.tradeHeader}>매매일지 목록</Text>
        <TouchableOpacity onPress={showMonthPicker} style={styles.tradeHeaderSelectDate}>
          <Text style={styles.tradeHeaderSelectDateText}>{monthLabel || "월 선택"}</Text>
        </TouchableOpacity>
      </View>
      {showPicker && (
        <MonthPicker
          onChange={onValueChange}
          value={date}
          minimumDate={new Date(2000, 1)}
          maximumDate={new Date(2050, 5)}
          locale="ko"
        />
      )}
      <FlatList
        data={filteredTrades}
        // data={trades.filter(item => {
        //   const tradeDate = new Date(item.tradeDate);
        //   return tradeDate.getMonth() === selectedMonth.getMonth() && tradeDate.getFullYear() === selectedMonth.getFullYear();
        // })}
        keyExtractor={item => String(item.tradeId)}
        renderItem={renderItem}
        ListHeaderComponent={TableHeader}
        ListFooterComponent={() => <ListFooter profitRate={monthlyProfitRate} />}
        // ListFooterComponent={ListFooter}
        // ListFooterComponent={<ListFooter profitRate={monthlyProfitRate} />}
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
    color: '#555',
  },
  tradeHeaderSelectDate: {
    backgroundColor: '#4eadeb',
    borderRadius: 5,
    padding: 5,
    marginRight: -5,
  },
  tradeHeaderSelectDateText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '300',
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
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
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
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f4',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    height: 50,
  },
  dateHeaderCell: {
    fontWeight: '400',
    marginTop: 18,
    textAlign: 'center',
    width: 46,
    marginLeft: 1,
  },
  nameHeaderCell: {
    marginLeft: 6,
    fontWeight: '400',
    marginTop: 18,
    textAlign: 'center',
    width: 75,
  },
  priceHeaderCell: {
    marginLeft: 0.5,
    fontWeight: '400',
    marginTop: 18,
    textAlign: 'center',
    width: 70
  },
  quantityHeaderCell: {
    marginLeft: -10,
    fontWeight: '400',
    marginTop: 18,
    textAlign: 'center',
    width: 45
  },
  feeHeaderCell: {
    fontWeight: '400',
    marginTop: 18,
    textAlign: 'center',
    width: 55
  },
  memoHeaderCell: {
    fontWeight: '400',
    marginTop: 18,
    textAlign: 'center',
    width: 55
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 10,
  },
  dateCell: {
    margin: 1,
    textAlign: 'center',
    marginLeft: -8,
    width: 45,
    fontWeight: '300',
  },
  nameCell: {
    margin: 1,
    textAlign: 'center',
    marginLeft: 7,
    width: 75,
    fontWeight: '400',
  },
  priceCell: {
    margin: 1,
    textAlign: 'center',
    marginLeft: 10,
    width: 45,
    fontWeight: '300',
  },
  quantityCell: {
    margin: 1,
    textAlign: 'center',
    marginLeft: 10,
    width: 30,
    fontWeight: '300',
  },
  feeCell: {
    margin: 1,
    textAlign: 'center',
    marginLeft: 10,
    width: 45,
    fontWeight: '300',
  },
  memoCell: {
    margin: 1,
    textAlign: 'center',
    marginLeft: 10,
    fontWeight: '300',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    borderTopWidth: 2,
    borderTopColor: '#000',
  },
  footerCell: {
    textAlign: 'right',
    marginRight: 10,
    fontWeight: 'bold',
  },
  rightAction: {
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
  },
  tradeHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  // toggleButton: {

  // },
  toggleButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#555',
    marginLeft: 10,
  },
});

export { TradeDetail };
