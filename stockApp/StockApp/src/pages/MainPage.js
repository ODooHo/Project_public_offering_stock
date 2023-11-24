import React, { useState } from 'react';
import { ScrollView, View, Text, Button, TextInput, StyleSheet, RefreshControl } from 'react-native';

function MainPage({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    // 새로고침 로직을 추가해야 한다
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
    {/* <View style={styles.container}> */}

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>IPOHub</Text>
        <TextInput style={styles.searchBox} placeholder="Search..." />
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Upcoming IPOs</Text>
        <View style={styles.companyList}>
          {/* Example company items */}
          {["Company A", "Company B", "Company C"].map(company => (
            <Text style={styles.companyItem} key={company}>{company}</Text>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Recommended IPOs</Text>
        <View style={styles.companyList}>
          {["Company D", "Company E", "Company F"].map(company => (
            <Text style={styles.companyItem} key={company}>{company}</Text>
          ))}
        </View>

        <Text style={styles.sectionTitle}>IPO News & Updates</Text>
        {["News 1", "News 2", "News 3"].map(news => (
          <Text style={styles.newsItem} key={news}>{news}</Text>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Site Map</Text>
        <Text>Contact</Text>
        <Text>Terms of Service</Text>
        <Text>Privacy Policy</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#333"
  },
  searchBox: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff"
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: "#444"
  },
  companyList: {
    marginBottom: 20
  },
  companyItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10
  },
  newsItem: {
    marginBottom: 10,
    fontSize: 16,
    color: "#666"
  },
  footer: {
    paddingVertical: 10
  }
});

export default MainPage;
