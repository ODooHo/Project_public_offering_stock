//매매일지 API
import axios from 'axios';
import useUserStore from '../UserInfo/UserStore';
import { getToken, getRefreshToken } from '../tokenManager';

const SERVER_URL = 'http://15.165.24.146:8080'; //실제 API 서버의 기본 주소

const getAuthToken = async () => {
    const token = await getToken();
    return { Authorization: `Bearer ${token}` };
};

const createTrade = async (tradeData) => {
    try {
      const headers = await getAuthToken();
      const response = await axios.post(`${SERVER_URL}/createTrade`, tradeData, { headers });
      return response.data;
    } catch (error) {
      console.error('매매 생성 오류:', error);
      throw error;
    }
};
  
const getTrades = async () => {
    try {
        const headers = await getAuthToken();
        const response = await axios.get(`${SERVER_URL}/getTrade`, { headers });
        return response.data;
    } catch (error) {
        console.error('매매 내역 가져오기 오류:', error);
        throw error;
    }
};
  
const deleteTrade = async (tradeId) => {
    try {
        const headers = await getAuthToken();
        const response = await axios.delete(`${SERVER_URL}/deleteTrade/${tradeId}`, { headers });
        return response.data;
    } catch (error) {
        console.error('매매 삭제 오류:', error);
        throw error;
    }
};
  
export const TradeApi = {
    createTrade,
    getTrades,
    deleteTrade,
};