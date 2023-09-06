import axios from 'axios';
import { getToken, setToken, removeToken } from '../tokenManager';


const SERVER_URL = 'http://15.165.24.146:8080'; // 실제 API 서버의 기본 주소

// function makeRequest(method, endpoint, data = {}, token = null) {
//   try {
//       const config = {
//           method: method,
//           url: `${SERVER_URL}${endpoint}`,
//           data: data,
//           headers: {}
//       };

//       if (token) {
//           config.headers.Authorization = `Bearer ${token}`;
//       }

//       return axios(config).then(response => response.data);
//   } catch (error) {
//       throw error;
//   }
// }

async function makeRequest(method, endpoint, data = {}, token = null, isFile = false) {
  try {
      const config = {
          method: method,
          url: `${SERVER_URL}${endpoint}`,
          data: data,
          headers: {}
      };

      if (!token) {
        token = await getToken();
      }

      if (token) {
        config.headers.Authorization  = `Bearer ${token}`;
      }

      if (isFile) {
          const formData = new FormData();
          for (let key in data) {
              formData.append(key, data[key]);
          }
          config.data = formData;
          config.headers['Content-Type'] = 'multipart/form-data';
      }
      
      const response = await axios(config);
      return response.data;
      // return axios(config).then(response => response.data);
  } catch (error) {
      if (error.response && error.response.status === 401){
        await removeToken();
      }
      throw error;
  }
}

export const signUpApi = (data) => {
  return makeRequest('post', '/api/auth/signUp', data, null, true);
};

export const signInApi = async (data) => {
  const response = await makeRequest('post', '/api/auth/signIn', data);
  if (response && response.token) {
      await setToken(response.token);
  }
  return response;
};

// export const signInApi = (data) => {
//   return makeRequest('post', '/api/auth/signIn', data);
// };

export const getAccessTokenApi = (token) => {
  return makeRequest('post', '/api/auth/getAccess', {}, token);
};
