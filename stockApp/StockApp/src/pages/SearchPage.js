import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TextInput, FlatList, TouchableOpacity, Text, Keyboard, Platform, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as IpoApi from '../API/IpoApi';
import * as BoardApi from '../API/BoardApi';
import useUserStore from '../UserInfo/UserStore';

const SearchPage = ({ route, navigation }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [recentSearches, setRecentSearches] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const inputRef = useRef();
    const { searchType } = route.params;

    const userInfo = useUserStore((state) => state.user);
    
    useEffect(() => {
        inputRef.current.focus();
        fetchRecentSearches();
    }, []);

    useEffect(() => {
        setIsSearching(false);
        setSearchResults([]);
    }, [searchTerm]);

    const fetchRecentSearches = async () => {
        try {
            let response;
            if (searchType === 'ipo') {
                response = await IpoApi.fetchRecentSearches();
            } else if (searchType === 'community') {
                response = await BoardApi.fetchRecentSearches();
            }
            if (response && response.data) {
                setRecentSearches(response.data);
            } else {
                console.error('Response or data is undefined:', response);
            }
        } catch (error) {
            console.error('Error fetching recent searches: ', error);
        }
    };

    const onSearch = async () => {
        if (!searchTerm.trim()) return;
        setIsSearching(true);
        try {
            const searchDto = {
                searchContent: searchTerm.trim(),
                userEmail: userInfo.userEmail,
            };
            let response;
            if (searchType === 'ipo' ){
                response = await IpoApi.searchIpo(searchDto);
            } else if (searchType === 'community') {
                response = await BoardApi.searchBoards(searchDto);
            }
            setSearchResults(response.data);
            await fetchRecentSearches();
        } catch (error) {
            console.error(`Error searching ${searchType}:`, error);
            setIsSearching(false);
        }
    };

    const getRecentSearches = async () => {
        try {
            await fetchRecentSearches();
        } catch (error) {
            console.error('Error fetching recent searches(여기):', error);
        }
    };

    const onRecentSearchTermClick = async (term) => {
        setSearchTerm(term);
        try {
            const searchDto = { searchContent: term };
            let response;
            if (searchType === 'ipo') {
                response = await IpoApi.searchIpo(searchDto);
            } else if (searchType === 'community') {
                response = await BoardApi.searchBoards(searchDto);
            }
            setSearchResults(response.data);
        } catch (error) {
            console.error(`Error fetching recent ${searchType}:`, error);
        }
    };

    const deleteRecentSearch = async (searchId) => {
        try {
            await BoardApi.deleteSearchesTerm(searchId);
            await getRecentSearches();
        } catch (error) {
            console.error('Error deleting recent search:', error);
        }
    };

    const renderSearchItem = ({ item }) => {
        if (searchType === 'ipo') {
            return (
                <TouchableOpacity onPress={() => navigation.navigate('IpoDetail', { ipoName: item.ipoName })} style={styles.searchResultItem}>
                    <View style={styles.resultItemContainer}>
                        <Text style={styles.ipoName}>{item.ipoName}</Text>
                        <Text style={styles.additionalInfo}>{item.additionalInfo}</Text>
                    </View>
                </TouchableOpacity>
            );
        } else if (searchType === 'community') {
            return (
                <TouchableOpacity onPress={() => navigation.navigate('BoardDetail', { boardId: item.boardId})} style={styles.searchResultItem}>
                    <View style={styles.resultItemContainer}>
                        <Text style={styles.boardTitle}>{item.boardTitle}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    };
    
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.searchHeader}>
                <Icon name="search" size={20} color="#000" style={styles.searchIcon} />
                <TextInput
                    ref={inputRef}
                    placeholder="검색"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    style={styles.searchInput}
                    returnKeyType="search"
                    onSubmitEditing={onSearch}
                    autoFocus={true}
                />
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelButton}>
                    <Text style={styles.cancelButtonText}>취소</Text>
                </TouchableOpacity>
            </View>
            {searchTerm.trim() === '' && !isSearching ? (
                <FlatList
                    data={recentSearches}
                    keyExtractor={(item) => item.searchId.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.recentSearchItem}>
                            <Text onPress={() => onRecentSearchTermClick(item.searchContent)}>
                                {item.searchContent}
                            </Text>
                            <TouchableOpacity onPress={() => deleteRecentSearch(item.searchId)}>
                            <Icon name="cancel" size={20} color="#000" />
                            </TouchableOpacity>
                        </View>
                    )}
                    style={styles.recentSearchList}
                />   
            ) : (
                <FlatList
                    data={searchResults}
                    keyExtractor={(item) => searchType === 'ipo' ? item.ipoName : item.boardId.toString()}
                    renderItem={renderSearchItem}
                />   
            )}
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        marginTop: 40,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
        margin: 10,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    cancelButton: {
        paddingHorizontal: 8,
    },
    cancelButtonText: {
        fontSize: 16,
        color: '#007bff',
    },
    recentSearchItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e0e0e0',
        backgroundColor: 'white'
    },
    resultItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15
    },
    ipoName: {
        fontSize: 16,
        fontWeight: '300'
    },
    additionalInfo: {
        fontSize: 14,
        color: '#777',
    },
    recentSearchList: {
        backgroundColor: '#fff',
    },
});

export default SearchPage;