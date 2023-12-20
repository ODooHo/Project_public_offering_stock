import axios from 'axios';
import { SERVER_URL, makeAuthenticatedRequest, getAuthToken } from "../tokenManager";


export const fetchBoardList = async () => {
    try {
        const response = await axios.get(`${SERVER_URL}/api/community/board/list`);
        return response.data;
    } catch (error) {
        console.error('Error fetchin Board list:', error);
        throw error;
    }
};

export const fetchBoardDetail = async (boardId) => {
    try {
        const response = await axios.get(`${SERVER_URL}/api/community/board/${boardId}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetchin BoardDetail:', error);
        throw error;
    }
};

export const fetchBoardImage = async (boardId) => {
    try {
        const response = await axios.get(`${SERVER_URL}/api/community/board/${boardId}/image`, {
            responseType: 'blob'
        });
        const urlCreator = window.URL || window.webkitURL;
        const imageUrl = urlCreator.createObjectURL(response.data);
        return imageUrl;
    } catch (error) {
        console.error('Error fetching Board Image:', error);
        throw error;
    }
};

// export const createBoard = async (formData) => {
//     try {
//         return await makeAuthenticatedRequest('POST', `/api/community/board/writeBoard`, formData);
//     } catch (error) {
//         console.error('Error creating board:', error);
//         throw error;
//     }
// };
export const createBoard = async (formData) => {
    try {
        const response = await fetch(`${SERVER_URL}/api/community/board/writeBoard`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': await getAuthToken(),
                // 'Content-Type': 'multipart/form-data'는 설정하지 않습니다.
            },
        });

        const responseData = await response.json();
        console.log('Server Response:', responseData);
        return responseData;
    } catch (error) {
        console.error('Error creating board:', error);
        throw error;
    }
};

// export const editBoard = async (boardId, boardData) => {
//     try {
//         console.log('수정된 정보:', boardData);
//         return await makeAuthenticatedRequest('PATCH', `/api/community/board/edit/${boardId}`, boardData);
//     } catch (error) {
//         console.error('Error editing board:', error);
//         throw error;
//     }
// };
export const editBoard = async (boardId, boardData) => {
    try {
        console.log('Sending edit request for board ID:', boardId);
        const response = await fetch(`${SERVER_URL}/api/community/board/edit/${boardId}`, {
            method: 'PATCH',
            body: JSON.stringify(boardData), // 수정된 데이터를 JSON 문자열로 변환하여 요청 본문에 포함
            headers: {
                'Content-Type': 'application/json', // JSON 형식으로 요청
                'Authorization': await getAuthToken(), // 인증 토큰을 가져와서 헤더에 추가
            },
        });
        console.log('Edit request sent. Awaiting response...');
        return response;
    } catch (error) {
        console.error('Error editing board:', error);
        throw error;
    }
};


export const deleteBoard = async (boardId) => {
    try {
        return await makeAuthenticatedRequest('DELETE', `/api/community/board/delete/${boardId}`);
    } catch (error) {
        console.error('Error deleting board:', error);
        throw error;
    }
};

//검색
export const searchBoards = async (serachDto) => {
    try {
        const response = await axios.post(`${SERVER_URL}/api/search/community`, serachDto);
        console.log("커뮤니티 검색:", response.data);
        return response.data;
    } catch (error) {
        console.error('게시판 검색 중 오류 발생:', error);
        throw error;
    }
};

export const fetchRecentSearches = async () => {
    try {
        return await makeAuthenticatedRequest('GET', '/api/search/community');
    } catch (error) {
        console.error('Error deleting board:', error);
        throw error;
    }
};

export const deleteSearchesTerm = async (searchId) => {
    try {
        return await makeAuthenticatedRequest('DELETE', `/api/search/${searchId}/delete`);
    } catch (error) {
        console.error('Error deleting board:', error);
        throw error;
    }
};

//좋아요 (문제 없음)
export const addLike = async (likeDto) => {
    try {
        return await makeAuthenticatedRequest('POST', `/api/community/board/${likeDto.boardId}/likes/add`, likeDto);
    } catch (error) {
        console.error('Error add like:', error);
        throw error;
    }
};

export const deleteLike = async (boardId) => {
    try {
        return await makeAuthenticatedRequest('DELETE', `/api/community/board/${boardId}/likes/delete`);
    } catch (error) {
        console.error('Error deleting like:', error);
        throw error;
    }
};

export const getLikeCount = async (boardId) => {
    const response = await axios.get(`${SERVER_URL}/api/community/board/${boardId}/likes/get/count`);
    console.log("좋아요 개수:", response.data);
    return response.data;
};


//댓글 (문제 없음)
export const fetchBoardComments = async (boardId) => {
    try {
        const response = await axios.get(`${SERVER_URL}/api/community/board/${boardId}/comment`);
        return response.data;
      } catch (error) {
        console.error('Error fetchin Comments:', error);
        throw error;
      }
};

export const createComment = async (boardId, commentData) => {
    try {
        return await makeAuthenticatedRequest('POST', `/api/community/board/${boardId}/writeComment`, commentData);
    } catch (error) {
        console.error('Error creating comment:', error);
        throw error;
    }
};

export const deleteComment = async (boardId, commentId) => {
    try {
        return await makeAuthenticatedRequest('DELETE', `/api/community/board/${boardId}/delete/${commentId}`);
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
};

export const editComment = async (boardId, commentId, commentData) => {
    try {
        return await makeAuthenticatedRequest('PATCH', `/api/community/board/${boardId}/edit/${commentId}`, commentData);
    } catch (error) {
        console.error('Error editing comment:', error);
        throw error;
    }
};