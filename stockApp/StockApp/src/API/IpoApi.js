import axios from "axios";
import { getToken } from "../tokenManager";

const SERVER_URL = 'http://15.165.24.146:8080';

const getAuthToken = async () => {
    const token = await getToken();
    if (token) {
        // console.log("가져온 토큰:",token);
        return `Bearer ${token}`;
    }
    return null;
};

export const fetchIpoList = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/api/stock/list`);
    console.log("공모주정보", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetchin IPO list:', error);
    throw error;
  }
};

export async function fetchIpoDetail(ipoName) {
  try {
    console.log(`Fetching IPO details for: ${ipoName}`); // 로그 추가
    const response = await axios.get(`${SERVER_URL}/api/stock/${ipoName}`);
    // const response = await axios.get(`${SERVER_URL}/api/stock/detail/${stockId}`);
    console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching detail for IPO ${ipoName}:`, error);
    throw error;
  }
};

//관심
export const addFavoriteIpo = async (ipoName, userEmail) => {
  try {
    console.log("Add IPO with name(API):", ipoName);
    const token = await getAuthToken();
    const response = await axios.post(`${SERVER_URL}/api/stock/addFavor`, {
      ipoName,
      userEmail
    }, {
      headers: {
        'Authorization': token
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding IPO to favorites(IpoApi):', error);
    throw error;
  }
};

export const deleteFavoriteIpo = async (ipoName) => {
  try {
    console.log("Removing IPO with name(API):", ipoName);
    const response = await axios.delete(`${SERVER_URL}/api/stock/${ipoName}/deleteFavor`, {
      headers: {
        'Authorization': await getAuthToken()
      }
    });
    console.log("Deleted IPO response:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error response from server:', error.response);
    throw error;
  }
};

export const getFavoriteIpo = async () => {
  try {
    const token = await getAuthToken();
    const response = await axios.get(`${SERVER_URL}/api/stock/getFavor`, {
      headers: {
        'Authorization': token
      }
    });
    console.log("관심종목리스트:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching favorite IPOs:', error);
    throw error;
  }
};

//검색
export const searchIpo = async (searchDto) => {
  try {
    const response = await axios.post(`${SERVER_URL}/api/search/stock`, searchDto);
    console.log("공모주 검색:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error searching IPO:', error);
    throw error;
  }
};

export const fetchRecentSearches = async () => {
  try {
    const autoken = await getAuthToken();
    const response = await axios.get(`${SERVER_URL}/api/search/stock`, {
      headers: {
        'Authorization': autoken
      }
    });
    console.log("최근 검색어(공모주):", response.data);
    return response.data;
  } catch (error) {
    console.error("최근 검색어(공모주)를 가져오는 중 오류 발생:", error);
    throw error;
  }
};

