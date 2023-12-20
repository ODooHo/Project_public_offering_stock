import { SERVER_URL, makeAuthenticatedRequest, getAuthToken } from "../tokenManager";

//프로필 사진 가져오기
export const getProfileImageApi = async () => {
  try {
    const responseBlob = await makeAuthenticatedRequest('GET', '/api/myPage/profile', null, 'blob');
    if (responseBlob) {
      const urlCreator = window.URL || window.webkitURL;
      const imageUrl = urlCreator.createObjectURL(responseBlob);
      console.log("프로필 이미지 URL:", imageUrl);
      return imageUrl;
    } else {
      console.log("No image data received");
      return null;
    }
  } catch (error) {
    console.error('사용자 프로필 불러오기 에러 (MyPageApi.js)');
    throw error;
  }
};

// //회원 정보 수정
// export const updateMyPageApi = async (nickname, imageUri) => {
//   const formData = new FormData();
//   formData.append('userNickname', nickname);

//   if (imageUri) {
//     console.log('imageUri:', imageUri);

//     // 여기서는 imageUri가 이미 문자열이라고 가정합니다.
//     formData.append('userProfile', {
//       uri: imageUri,
//       type: 'image/jpeg',
//       name: 'profile.jpg',
//     });

//     try {
//       const response = await makeAuthenticatedRequest('PATCH', '/api/myPage/patchUser', formData);
//       console.log("회원 정보 수정:", response);
//       return response;
//     } catch (error) {
//       console.error('사용자 프로필 업데이트 실패:', error);
//       throw error;
//     }
//   } else {
//     console.log('No imageUri provided');
//   }
// };

export const updateMyPageApi = async (nickname, imageUri) => {
  const formData = new FormData();
  // console.log("닉네임이랑 사진", imageUri);
  formData.append('userNickname', nickname);

  if (imageUri) {
    formData.append('userProfile', {
      uri: imageUri,
      type: 'image/jpg',
      name: 'profile.jpg',
    });

    try {
      const response = await fetch(`${SERVER_URL}/api/myPage/patchUser`, {
        method: 'PATCH',
        body: formData,
        headers: {
          'Authorization': await getAuthToken(),
        },
      });

      console.log("보낸 데이터", response);
      
      const responseData = await response.json();
      console.log("회원 정보 수정 응답:", responseData);
      return responseData;
    } catch (error) {
      console.error('사용자 프로필 업데이트 실패:', error);
      throw error;
    }
  } else {
    console.log('No imageUri provided');
  }
};
