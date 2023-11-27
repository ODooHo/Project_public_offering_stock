// import axios from 'axios';
// import { getToken, setToken, removeToken, setRefreshToken, getRefreshToken } from '../tokenManager';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const SERVER_URL = 'http://15.165.24.146:8080'; //실제 API 서버의 기본 주소

// async function makeRequest(method, endpoint, data = {}, token = null, skipTokenFetch = false) {
//     try {
//         const config = {
//             method: method,
//             url: `${SERVER_URL}${endpoint}`,
//             data: data,
//             headers: {}
//         };

//         //skipTokenFetch가 true가 아닐 때만 getToken을 호출
//         if (!skipTokenFetch && !token) {
//             token = await getToken();
//         }

//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
        
//         const response = await axios(config);
//         return response.data;
//     } catch (error) {
//         console.error("API Request Error:", error.response.data);  // 에러 발생 시 서버 응답 본문 출력

//         if (error.response && error.response.status === 401) {
//             await removeToken();
//         }
//         throw error;
//     }
// }

// export const SignUpApi = async (data) => {
//   try {
//     const response = await makeRequest('POST', '/api/auth/signUp', data, null, true);
//     return response;
//   } catch (error) {
//     throw new Error("Signup failed!");
//   }
// };

// export const CheckEmailDuplicationApi = async (userEmail) => {
//     try {
//         const response = await makeRequest('POST', `/api/auth/signUp/emailCheck/${userEmail}`);
//         return response;
//     } catch (error) {
//         console.error("이메일 중복 확인 실패:", error);
//         throw error;
//     }
// };

// export const CheckNicknameDuplicationApi = async (userNickname) => {
//     try {
//         const response = await makeRequest('POST', `/api/auth/signUp/nicknameCheck/${userNickname}`);
//         return response;
//     } catch (error) {
//         console.error("닉네임 중복 확인 실패:", error);
//         throw error;
//     }
// };

// // export const SignInApi = async (data) => {
// //     const response = await makeRequest('post', '/api/auth/signIn', data);
// //     if (response && response.data && response.data.token) {
// //         await setToken(response.data.token);
// //         await setRefreshToken(response.data.refreshToken);  
// //     }
// //     return response;
// // };

// export const SignInApi = async (data) => {
//     try {
//         const response = await makeRequest('POST', '/api/auth/signIn', data);
//         if (response && response.token) {
//             console.log("Received Token: ", response.token); // 받은 토큰 값 출력
//             await setToken(response.token);
//             await setRefreshToken(response.refreshToken);  
//             return response; // 응답 객체 전체 반환
//         } else {
//             console.error("로그인 실패: 토큰이 응답에 없습니다.");
//             throw new Error("Token is missing in the response");
//         }
//     } catch (error) {
//         console.error("로그인 에러:", error);
//         throw error;
//     }
// };


// // export const getAccessTokenApi = async (token) => {
// //     const refreshToken = await getRefreshToken();
// //     return makeRequest('post', '/api/auth/getAccess', {refreshToken}, token);
// // };

// export const getAccessTokenApi = (token) => {
//     return makeRequest('post', '/api/auth/getAccess', {}, token);
// };

// export const LogoutApi = async () => {
//     const token = await getToken();
//     return makeRequest('POST', '/api/auth/logout', { token });
// };

import axios from 'axios';
import { getToken, setToken, removeToken, setRefreshToken } from '../tokenManager';

const SERVER_URL = 'http://15.165.24.146:8080'; //실제 API 서버의 기본 주소

async function makeRequest(method, endpoint, data = {}, token = null, skipTokenFetch = false) {
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
        
        const response = await axios(config);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            await removeToken();
        }
        throw error;
    }
}

export const SignUpApi = async (data) => {
  try {
    const response = await makeRequest('POST', '/api/auth/signUp', data, null, true);
    return response;
  } catch (error) {
    throw new Error("Signup failed!");
  }
};

export const SignInApi = async (data) => {
    const response = await makeRequest('post', '/api/auth/signIn', data);
    if (response && response.data && response.data.token) {
        await setToken(response.data.token);
        await setRefreshToken(response.data.refreshToken);  
    }
    return response;
};

export const CheckEmailDuplicationApi = async (userEmail) => {
    try {
        const response = await makeRequest('POST', `/api/auth/signUp/emailCheck/${userEmail}`);
        return response;
    } catch (error) {
        console.error("이메일 중복 확인 실패:", error);
        throw error;
    }
};

export const CheckNicknameDuplicationApi = async (userNickname) => {
    try {
        const response = await makeRequest('POST', `/api/auth/signUp/nicknameCheck/${userNickname}`);
        return response;
    } catch (error) {
        console.error("닉네임 중복 확인 실패:", error);
        throw error;
    }
};

export const getAccessTokenApi = (token) => {
    return makeRequest('post', '/api/auth/getAccess', {}, token);
};