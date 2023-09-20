import axios from 'axios';
import { getToken, setToken, removeToken } from '../tokenManager';

const SERVER_URL = 'http://15.165.24.146:8080'; // 실제 API 서버의 기본 주소

async function makeRequest(method, endpoint, data = {}, token = null, isFile = false, skipTokenFetch = false) {
    try {
        const config = {
            method: method,
            url: `${SERVER_URL}${endpoint}`,
            data: data,
            headers: {}
        };

        //skipTokenFetch가 true가 아닐 때만 getToken을 호출
        if (!skipTokenFetch && !token) {
            token = await getToken();
        }

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        if (isFile) {
            const formData = new FormData();
            for (let key in data) {
                formData.append(key, data[key]);
            }
            config.data = formData;
            config.headers['Content-Type'] = 'multipart/form-data';
        }
        
        const response = await axios(config);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            await removeToken();
        }
        throw error;
    }
}

export const SignUpApi = (data) => {
    return makeRequest('post', '/api/auth/signUp', data, null, true, true);
};

export const SignInApi = async (data) => {
    const response = await makeRequest('post', '/api/auth/signIn', data);
    if (response && response.data && response.data.token) {
        await setToken(response.data.token);
        await setRefreshToken(response.data.refreshToken);  
    }
    return response;
};

export const getAccessTokenApi = (token) => {
    return makeRequest('post', '/api/auth/getAccess', {}, token);
};
