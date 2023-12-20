import { SERVER_URL, makeAuthenticatedRequest } from "../tokenManager";

export const getTrades = async () => {
    try {
        return await makeAuthenticatedRequest('GET', `/api/myPage/trade/getTrade`);
    } catch (error) {
        console.error('매매 내역 가져오기 오류:', error);
        throw error;
    }
};


export const createTrade = async (tradeData) => {
    try {
        return await makeAuthenticatedRequest('POST', `/api/myPage/trade/createTrade`, tradeData);
    } catch (error) {
        console.error('매매 생성 오류:', error);
        throw error;
    }
};