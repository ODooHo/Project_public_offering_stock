import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'user_token';
const REFRESH_TOKEN_KEY = 'user_refresh_token';


export const setToken = async (token) => {
    try {
        await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (e) {
        console.error("Failed to save the token to storage");
    }
}

export const getToken = async () => {
    try {
        return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (e) {
        console.error("Failed to fetch the token from storage");
    }
}

export const removeToken = async () => {
    try {
        await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (e) {
        console.error("Failed to remove the token from storage");
    }
}

export const setRefreshToken = async (token) => {
    try {
        await AsyncStorage.setItem(REFRESH_TOKEN_KEY, token);
    } catch (e) {
        console.error("Failed to save the refresh token to storage");
    }
}

export const getRefreshToken = async () => {
    try {
        return await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
    } catch (e) {
        console.error("Failed to fetch the refresh token from storage");
    }
}

export const removeRefreshToken = async () => {
    try {
        await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
    } catch (e) {
        console.error("Failed to remove the refresh token from storage");
    }
}

