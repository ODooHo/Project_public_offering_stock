import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'user_token';
const REFRESH_TOKEN_KEY = 'user_refresh_token';

export const SERVER_URL = 'http://15.165.24.146:8080';

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


// 토큰 갱신 및 에러 처리
const refreshTokenAndHandleError = async () => {
    try {
        const refreshToken = await getRefreshToken();
        if (!refreshToken) {
            throw new Error("No refresh token available");
        }
        const response = await axios.post(`${SERVER_URL}/api/auth/refresh`, { refreshToken });
        const { accessToken } = response.data;
        await setToken(accessToken);
        return accessToken;
    } catch (error) {
        // 에러 발생 시 로그아웃 처리
        await removeToken();
        await removeRefreshToken();
        throw error;
    }
};
  
const getAuthToken = async () => {
    const token = await getToken();
    if (token) {
        return `Bearer ${token}`;
    }
    return null;
};
  
export const makeAuthenticatedRequest = async (method, url, data = {}) => {
    try {
        const authToken = await getAuthToken();
        let response;
        if (method === 'GET') {
            response = await axios({
                method,
                url: `${SERVER_URL}${url}`,
                headers: { Authorization: authToken },
            });
        } else {
            response = await axios({
                method,
                url: `${SERVER_URL}${url}`,
                data,
                headers: { Authorization: authToken },
            });
        }
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            await refreshTokenAndHandleError();
            return makeAuthenticatedRequest(method, url, data);
        }
        throw error;
    }
};