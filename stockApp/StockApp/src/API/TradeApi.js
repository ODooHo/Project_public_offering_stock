import axios from 'axios';
import { getToken, getRefreshToken } from '../tokenManager';

const SERVER_URL = 'http://15.165.24.146:8080'; //실제 API 서버의 기본 주소

const getAuthToken = async () => {
    const token = await getToken();
    if (token) {
        return `Bearer ${token}`;
    }
    return null;
};

export const getTrades = async () => {
    try {
        const authToken = await getAuthToken();
        const response = await axios.get(`${SERVER_URL}/api/myPage/trade/getTrade`, {
            headers: {
                'Authorization': authToken
            }
        });
        console.log("매매일지결과", response.data);
        return response.data;
    } catch (error) {
        console.error('매매 내역 가져오기 오류:', error);
        throw error;
    }
};

export const createTrade = async (tradeData) => {
    try {
        const authToken = await getAuthToken();
        const response = await axios.post(`${SERVER_URL}/api/myPage/trade/createTrade`, tradeData, {
            headers: {
                'Authorization': authToken
            }
        });
        console.log("매매 생성", tradeData);
        return response.data;
    } catch (error) {
        console.error('매매 생성 오류:', error);
        throw error;
    }
};

// export const deleteTrade = async (tradeId) => {
//     try {
//         const authToken = await getAuthToken();
//         const response = await axios.delete(`${SERVER_URL}/api/myPage/trade/deleteTrade/${tradeId}`, {
//             headers: {
//                 'Authorization': authToken
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error('매매 삭제 오류:', error);
//         throw error;
//     }
// };

export const deleteTrade = async (tradeId) => {
    try {
        const authToken = await getAuthToken();
        if (authToken) {
            const response = await axios.delete(
                `${SERVER_URL}/api/myPage/trade/deleteTrade/${tradeId}`,
                {
                    headers: {
                        Authorization: authToken,
                    },
                }
            );
            console.log(response.data)
            return response.data;
        } else {
            console.error('토큰이 없습니다.');
            throw new Error('토큰이 없습니다.');
        }
    } catch (error) {
        console.error('매매일지 삭제 오류:', error);
        throw error;
    }
};