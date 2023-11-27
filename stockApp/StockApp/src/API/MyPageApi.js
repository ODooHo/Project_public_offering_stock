import axios from 'axios';
import { getToken } from '../tokenManager';

const SERVER_URL = 'http://15.165.24.146:8080';

const getAuthToken = async () => {
  const token = await getToken();
  if (token) {
      return `Bearer ${token}`;
  }
  return null;
};

export const getProfileImageApi = async () => {
  const authToken = await getAuthToken();
  try {
    const response = await axios.get(`${SERVER_URL}/api/myPage/profile`, {
      responseType: 'blob',
      headers: {
        Authorization: authToken,
      },
    });
    if (response.status === 200 && response.data) {
      const urlCreator = window.URL || window.webkitURL;
      const imageUrl = urlCreator.createObjectURL(response.data);
      console.log("dlalwl URL:", imageUrl);
      return imageUrl;
    } else {
      console.log(`Response status: ${response.status}`);
      return null;
    }
    // const urlCreator = window.URL || window.webkitURL;
    // const imageUrl = urlCreator.createObjectURL(response.data);
    // console.log('한 번 보자:', imageUrl);
    // return imageUrl;
    // return response.data;
  } catch (error) {
    console.error('사용자 프로필 불러오기 에러 (MyPageApi.js)');
    throw error;
  }
};

// 회원 정보 수정
export const updateMyPageApi = async (nickname, imageUri) => {
  const authToken = await getAuthToken();
  if(!authToken){
    throw new Error('Authentication token is not available');
  }

  const formData = new FormData();
  formData.append('userNickname', nickname);

  if(imageUri) {
    formData.append('userProfile', {
      uri: imageUri,
      type: 'image/jpeg', // 또는 imageUri의 타입에 따라 변경
      name: 'profile.jpg',
    });
  }

  try {
    const response = await axios.patch(`${SERVER_URL}/api/myPage/patchUser`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: authToken,
      },
    });

    console.log("회원 정보 수정:", response.data);
    return response.data;
  } catch (error) {
    console.error('사용자 프로필 업데이트 실패:', error);
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
