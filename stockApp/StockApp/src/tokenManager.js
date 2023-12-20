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

export const getAuthToken = async () => {
    const token = await getToken();
    if (token) {
        return `Bearer ${token}`;
    }
    return null;
};

export const makeAuthenticatedRequest = async (method, url, data = {}, responseType = 'json') => {
    let headers = { 'Authorization': await getAuthToken() };
    let authToken = await getAuthToken();
    let isFormData = data instanceof FormData;
    // console.log("지금 사용하는 토큰:", authToken);

    // FormData가 아닐 경우에만 'Content-Type'을 'application/json'으로 설정합니다.
    if (!isFormData) {
        headers['Content-Type'] = 'application/json';
    }

    const axiosConfig = {
        method,
        url: `${SERVER_URL}${url}`,
        headers: headers,
        data: (method !== 'GET') ? data : undefined,
        responseType: responseType,
    };

    try {
        console.log('요청 정보:', axiosConfig);
        // return await axios(axiosConfig).then(res => res.data);
        return await axios(axiosConfig).then(res => {
            console.log('응답 데이터:', res.data); // 응답 데이터를 콘솔에 출력
            return res.data;
        });
    } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // 토큰 만료 처리
            const refreshToken = await getRefreshToken();
            if (!refreshToken) {
                throw new Error("리프레시 토큰 없음. 다시 로그인 필요.");
            }

            // 토큰 재발급 요청 (refreshToken 헤더 사용)
            const tokenResponse = await axios({
                method: 'POST',
                url: `${SERVER_URL}/api/auth/getAccess`,
                headers: { 'refreshToken': refreshToken }
            }).then(res => res.data);
            console.log("토큰 재발급 응답:", tokenResponse);

            const newAccessToken = tokenResponse.data.token;
            console.log("새로 받은 액세스 토큰:", newAccessToken);

            if (newAccessToken) {
                await setToken(newAccessToken);
                // 새 토큰으로 재시도
                headers['Authorization'] = `Bearer ${newAccessToken}`;
                return await axios({
                    method,
                    url: `${SERVER_URL}${url}`,
                    headers: headers,
                    data: (method !== 'GET') ? data : undefined,
                    responseType: responseType,
                }).then(res => res.data);
            } else {
                throw new Error("Failed to refresh token.");
            }
        } else {
            throw error;
        }
    }
};

// export const makeAuthenticatedRequest = async (method, url, data = {}, responseType = 'json') => {
//     const headers = {};
//     let authToken = await getAuthToken();
//     console.log("지금 사용하는 토큰:", authToken);

//     if (authToken) {
//         headers['Authorization'] = authToken;
//     }

//     if (data instanceof FormData) {
//         headers['Content-Type'] = 'multipart/form-data';
//     } else {
//         headers['Content-Type'] = 'application/json';
//     }

//     const axiosConfig = {
//         method,
//         url: `${SERVER_URL}${url}`,
//         headers: headers,
//         data: (method !== 'GET') ? data : undefined,
//         responseType: responseType,
//     };

//     if (data instanceof FormData) {
//         axiosConfig.transformRequest = (data, headers) => {
//             return data;
//         };
//     }

//     try {
//         return await axios(axiosConfig).then(res => res.data);
//     } catch (error) {
//         if (error.response && (error.response.status === 401 || error.response.status === 403)) {
//             // 토큰 만료 처리
//             const refreshToken = await getRefreshToken();
//             if (!refreshToken) {
//                 throw new Error("리프레시 토큰 없음. 다시 로그인 필요.");
//             }

//             // 토큰 재발급 요청 (refreshToken 헤더 사용)
//             const tokenResponse = await axios({
//                 method: 'POST',
//                 url: `${SERVER_URL}/api/auth/getAccess`,
//                 headers: { 'refreshToken': refreshToken }
//             }).then(res => res.data);
//             console.log("토큰 재발급 응답:", tokenResponse); // 서버 응답 로그 출력

//             const newAccessToken = tokenResponse.data.token;
//             console.log("새로 받은 액세스 토큰:", newAccessToken);

//             if (newAccessToken) {
//                 await setToken(newAccessToken);
//                 // 새 토큰으로 재시도
//                 headers['Authorization'] = `Bearer ${newAccessToken}`;
//                 return await axios({
//                     method,
//                     url: `${SERVER_URL}${url}`,
//                     headers: headers,
//                     data: (method !== 'GET') ? data : undefined,
//                     responseType: responseType,
//                 }).then(res => res.data);
//             } else {
//                 throw new Error("Failed to refresh token.");
//             }
//         } else {
//             throw error;
//         }
//     }
// };

// export const makeAuthenticatedRequest = async (method, url, data = {}, responseType = 'json') => {
//     const headers = new Headers();
//     headers.append('Authorization', await getAuthToken());

//     if (!(data instanceof FormData)) {
//         headers.append('Content-Type', 'application/json');
//         data = JSON.stringify(data);
//     }

//     const requestOptions = {
//         method: method,
//         headers: headers,
//         body: method !== 'GET' ? data : null,
//     };

//     const fullUrl = `${SERVER_URL}${url}`;

//     try {
//         const response = await fetch(fullUrl, requestOptions);
//         const result = await response.json();

//         if (!response.ok) {
//             // Handle HTTP errors
//             throw new Error(result.message || 'Server error');
//         }

//         return result;
//     } catch (error) {
//         console.error('Request failed:', error);
//         if (error.response && (error.response.status === 401 || error.response.status === 403)) {
//             // 토큰 만료 처리
//             const refreshToken = await getRefreshToken();
//             if (!refreshToken) {
//                 throw new Error("리프레시 토큰 없음. 다시 로그인 필요.");
//             }

//             // 토큰 재발급 요청 (refreshToken 헤더 사용)
//             const tokenResponse = await axios({
//                 method: 'POST',
//                 url: `${SERVER_URL}/api/auth/getAccess`,
//                 headers: { 'refreshToken': refreshToken }
//             }).then(res => res.data);
//             console.log("토큰 재발급 응답:", tokenResponse); // 서버 응답 로그 출력

//             const newAccessToken = tokenResponse.data.token;
//             console.log("새로 받은 액세스 토큰:", newAccessToken);

//             if (newAccessToken) {
//                 await setToken(newAccessToken);
//                 // 새 토큰으로 재시도
//                 headers['Authorization'] = `Bearer ${newAccessToken}`;
//                 return await axios({
//                     method,
//                     url: `${SERVER_URL}${url}`,
//                     headers: headers,
//                     data: (method !== 'GET') ? data : undefined,
//                     responseType: responseType,
//                 }).then(res => res.data);
//             } else {
//                 throw new Error("Failed to refresh token.");
//             }
//         } else {
//             throw error;
//         }
//     }
// };