import axios from 'axios';

const SERVER_URL = 'http://localhost:4000'; //실제 API 서버의 기본 주소
// const SERVER_URL = 'http://15.165.24.146:8080';

export const getMyPageApi = async (token) => {
  try {
    const response = await axios.get(`${SERVER_URL}/api/myPage`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateMyPageApi = async (token, updatedProfile) => {
  try {
    const response = await axios.patch(`${SERVER_URL}/api/myPage/patchUser`, updatedProfile, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createTradeEntryApi = async (token, tradeEntryData) => {
  try {
    const response = await axios.post(`${SERVER_URL}/api/myPage/trade`, tradeEntryData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
