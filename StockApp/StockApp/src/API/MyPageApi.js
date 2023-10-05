import axios from 'axios';

const SERVER_URL = 'http://localhost:4000'; //실제 API 서버의 기본 주소
// const SERVER_URL = 'http://15.165.24.146:8080';

//회원 정보 가져오기
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

// 회원 정보 수정
export const updateProfileImage = async (token, form) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `${SERVER_URL}/api/profile/image`,
      data: form,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update profile image:', error);
    throw error;
  }
};

// 매매일지
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
