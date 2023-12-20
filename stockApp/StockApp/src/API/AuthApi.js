import axios from 'axios';
import { SERVER_URL, makeAuthenticatedRequest } from "../tokenManager";

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

// export const SignUpApi = async (data) => {
//     try {
//         return await makeAuthenticatedRequest('POST', '/api/uth/signUp', data);
//     } catch (error) {
//         console.error('Signup failed!', error);
//         throw error;
//     }
// };

export const SignUpApi = async (data) => {
    try {
        const response = await axios.post(`${SERVER_URL}/api/auth/signUp`, data);
        return response.data;
    } catch (error) {
        console.error('Signup failed!', error);
        throw error;
    }
};

export const SignInApi = async (data) => {
    try {
        const response = await axios.post(`${SERVER_URL}/api/auth/signIn`,data);
        return response.data;
    } catch (error) {
        console.error('로그인 실패:', error);
        throw error;
    }
};

// export const SignInApi = async (data) => {
//     try {
//         return await makeAuthenticatedRequest('POST', '/api/uth/signIn', data);
//     } catch (error) {
//         console.error('SignIn failed!', error);
//         throw error;
//     }
// };

// export const SignInApi = async (data) => {
//     const response = await makeRequest('post', '/api/auth/signIn', data);
//     if (response && response.data && response.data.token) {
//         await setToken(response.data.token);
//         await setRefreshToken(response.data.refreshToken);

//         // 액세스 토큰의 만료 시간 계산
//         const accessTokenExpiration = new Date(new Date().getTime() + response.data.tokenExprTIme);
//         console.log("액세스 토큰 만료 시간:", accessTokenExpiration);

//         // 리프레시 토큰의 만료 시간 계산
//         const refreshTokenExpiration = new Date(new Date().getTime() + response.data.refreshExprTime);
//         console.log("리프레시 토큰 만료 시간:", refreshTokenExpiration);
//         // console.log("토큰 정보:", response.data);
//     }
//     return response;
// };

export const CheckEmailDuplicationApi = async (userEmail) => {
    try {
        const response = await axios.post(`${SERVER_URL}/api/auth/signUp/emailCheck/${userEmail}`);
        return response.data;
    } catch (error) {
        console.error('이메일 중복 확인 실패:', error);
        throw error;
    }
};

// export const CheckEmailDuplicationApi = async (userEmail) => {
//     try {
//         const response = await makeRequest('POST', `/api/auth/signUp/emailCheck/${userEmail}`);
//         return response;
//     } catch (error) {
//         console.error("이메일 중복 확인 실패:", error);
//         throw error;
//     }
// };

export const CheckNicknameDuplicationApi = async (userNickname) => {
    try {
        const response = await axios.post(`${SERVER_URL}/api/auth/signUp/nicknameCheck/${userNickname}`);
        return response.data;
    } catch (error) {
        console.error('닉네임 중복 확인 실패:', error);
        throw error;
    }
};

// export const CheckNicknameDuplicationApi = async (userNickname) => {
//     try {
//         const response = await makeRequest('POST', `/api/auth/signUp/nicknameCheck/${userNickname}`);
//         return response;
//     } catch (error) {
//         console.error("닉네임 중복 확인 실패:", error);
//         throw error;
//     }
// };

export const LogoutApi = async () => {
    try {
        await makeAuthenticatedRequest('POST', '/api/auth/logout', { token });
        await removeToken();
        await removeRefreshToken();
    } catch (error) {
        console.error('로그아웃 에러:', error);
        throw error;
    }
};

// export const LogoutApi = async () => {
//     try {
//         const token = await getToken();
//         if (!token) {
//             throw new Error("No token available for logout");
//         }
//         await makeRequest('POST', '/api/auth/logout', { token });

//         await removeToken();
//         await removeRefreshToken();
//     } catch (error) {
//         console.error("로그아웃 에러:", error);
//         throw error;
//     }
// };

// export const getAccessTokenApi = async () => {
//     try {
//         const refreshToken = await getRefreshToken();
//         if (!refreshToken) {
//             throw new Error("저장된 리프레시 토큰이 없음!");
//         }
//         const response = await makeRequest('POST', '/api/auth/getAccess', { refreshToken: refreshToken });
//         if (response && response.accessToken) {
//             await setToken(response.accessToken);
//             if (response.refreshToken) {
//                 await setRefreshToken(response.refreshToken);
//             }
//             return response.accessToken;
//         } else {
//             throw new Error("새로운 토큰을 받아오는데 실패함!");
//         }
//     } catch (error) {
//         console.error("리프레시 토큰 사용 에러:", error);
//         await removeToken();
//         await removeRefreshToken();
//         throw error;
//     }
// };