import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const TradeDetail = () => {
  const [trades, setTrades] = useState([]);
  const [newTrade, setNewTrade] = useState({
    date: '',
    stockName: '',
    tradeType: 'Buy',
    price: '',
    quantity: '',
    commission: '',
    notes: '',
  });

  const handleAddTrade = () => {
    setTrades([...trades, newTrade]);
    setNewTrade({
      date: '',
      stockName: '',
      tradeType: 'Buy',
      price: '',
      quantity: '',
      commission: '',
      notes: '',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>공모주 매매일지</Text>

      {/* 입력 폼 */}
      <TextInput
        style={styles.input}
        placeholder="날짜 (YYYY-MM-DD)"
        value={newTrade.date}
        onChangeText={(text) => setNewTrade({ ...newTrade, date: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="종목 이름"
        value={newTrade.stockName}
        onChangeText={(text) => setNewTrade({ ...newTrade, stockName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="매매 유형 (Buy 또는 Sell)"
        value={newTrade.tradeType}
        onChangeText={(text) => setNewTrade({ ...newTrade, tradeType: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="매매 가격"
        value={newTrade.price}
        onChangeText={(text) => setNewTrade({ ...newTrade, price: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="보유 주식 수량"
        value={newTrade.quantity}
        onChangeText={(text) => setNewTrade({ ...newTrade, quantity: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="거래 수수료"
        value={newTrade.commission}
        onChangeText={(text) => setNewTrade({ ...newTrade, commission: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="기타 메모"
        value={newTrade.notes}
        onChangeText={(text) => setNewTrade({ ...newTrade, notes: text })}
      />

      <Button title="매매일지 추가" onPress={handleAddTrade} />

      {/* 매매일지 목록 */}
      <Text style={styles.tradeHeader}>매매일지 목록</Text>
      <FlatList
        data={trades}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.tradeItem}>
            <Text>날짜: {item.date}</Text>
            <Text>종목: {item.stockName}</Text>
            <Text>매매 유형: {item.tradeType}</Text>
            <Text>매매 가격: {item.price}</Text>
            <Text>보유 주식 수량: {item.quantity}</Text>
            <Text>거래 수수료: {item.commission}</Text>
            <Text>메모: {item.notes}</Text>
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
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  tradeHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  tradeItem: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
});

export { TradeDetail };
