import axios from "axios";
import { SERVER_URL, makeAuthenticatedRequest } from "../tokenManager";

export const fetchIpoList = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/api/stock/list`);
    return response.data;
  } catch (error) {
    console.error('Error fetchin IPO list:', error);
    throw error;
  }
};

export async function fetchIpoDetail(ipoName) {
  try {
    console.log(`종목 상세 정보 가져오기: ${ipoName}`);
    const response = await axios.get(`${SERVER_URL}/api/stock/${ipoName}`);
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
    return await makeAuthenticatedRequest('POST', `/api/stock/addFavor`, { ipoName, userEmail });
  } catch (error) {
    console.error('Error adding IPO to favorites(IpoApi):', error);
    throw error;
  }
};

export const deleteFavoriteIpo = async (ipoName) => {
  try {
    return await makeAuthenticatedRequest('DELETE', `/api/stock/${ipoName}/deleteFavor`);
  } catch (error) {
    console.error('Error deleting favorite IPO:', error);
    throw error;
  }
};

export const getFavoriteIpo = async () => {
  try {
    return await makeAuthenticatedRequest('GET', '/api/stock/getFavor');
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
    return await makeAuthenticatedRequest('GET', '/api/search/stock');
  } catch (error) {
    console.error("Error fetching recent searches:", error);
    throw error;
  }
};