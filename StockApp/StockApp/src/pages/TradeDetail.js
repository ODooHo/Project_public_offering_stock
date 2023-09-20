import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const TradeDetail = () => {
  const [trades, setTrades] = useState([]);
  const [newTrade, setNewTrade] = useState({
    date: new Date(),
    stockName: '',
    tradeType: 'Buy',
    price: '',
    quantity: '',
    commission: '',
    notes: '',
  });

  const handleAddTrade = () => {
    setTrades(prevTrades => [...prevTrades, newTrade]);
    setNewTrade({
      date: new Date(),
      stockName: '',
      tradeType: 'Buy',
      price: '',
      quantity: '',
      commission: '',
      notes: '',
    });
  };

  const handleDeleteTrade = (index) => {
    setTrades(prevTrades => {
      const updatedTrades = [...prevTrades];
      updatedTrades.splice(index, 1);
      return updatedTrades;
    });
  };

  const toggleTradeType = (type) => {
    setNewTrade(prev => ({ ...prev, tradeType: type }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>공모주 매매일지</Text>

      <View style={styles.tradeInputRow}>
        <DateTimePicker
          style={styles.datePickerStyle}
          value={newTrade.date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            if (selectedDate) {
              setNewTrade(prev => ({ ...prev, date: selectedDate }));
            }
          }}
        />
        <TouchableOpacity
          style={[
            styles.tradeTypeButton,
            newTrade.tradeType === 'Buy' && styles.selectedTradeType
          ]}
          onPress={() => toggleTradeType('Buy')}
        >
          <Text>매수</Text>
        </TouchableOpacity>
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
          onChangeText={text => setNewTrade(prev => ({ ...prev, stockName: text }))}
        />
      </View>

      <View style={styles.tradeDetailRow}>
        <TextInput
          style={styles.input}
          placeholder="매매 가격"
          value={newTrade.price}
          onChangeText={text => setNewTrade(prev => ({ ...prev, price: text }))}
        />
        <Text>원</Text>
        <TextInput
          style={styles.quantityInput}
          placeholder="보유 주식 수량"
          value={newTrade.quantity}
          onChangeText={text => setNewTrade(prev => ({ ...prev, quantity: text }))}
        />
        <Text>주</Text>
        <TextInput
          style={styles.commissionInput}
          placeholder="거래 수수료"
          value={newTrade.commission}
          onChangeText={text => setNewTrade(prev => ({ ...prev, commission: text }))}
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
      <Text style={styles.tradeHeader}>매매일지 목록</Text>
      <FlatList
        data={trades}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.tradeItem}>
            <Text>날짜: {item.date.toLocaleDateString()}</Text>
            <Text>종목: {item.stockName}</Text>
            <Text>매매 유형: {item.tradeType}</Text>
            <Text>매매 가격: {item.price}</Text>
            <Text>보유 주식 수량: {item.quantity}</Text>
            <Text>거래 수수료: {item.commission}</Text>
            <Text>메모: {item.notes}</Text>
            <TouchableOpacity onPress={() => handleDeleteTrade(index)}>
              <Text style={styles.deleteButton}>삭제</Text>
            </TouchableOpacity>
          </View>
        )}
      />

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f6f6f6',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  tradeInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  datePickerStyle: {
    marginLeft: -10,
    marginRight: 10
  },
  tradeTypeButton: {
    marginHorizontal: 5,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4
  },
  selectedTradeType: {
    backgroundColor: '#eee'
  },
  stockNameInput: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginLeft: 10,
    paddingHorizontal: 12,
    borderRadius: 6
  },
  tradeHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#555',
  },
  tradeItem: {
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 6,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  deleteButton: {
    color: 'red',
    marginTop: 10,
    textAlign: 'right',
  },
  tradeDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 6,
    width: 100,
  },
  quantityInput: { 
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 6,
    width: 30, 
  },
  commissionInput: { 
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 6,
    width: 50,
  }
});

export { TradeDetail };
