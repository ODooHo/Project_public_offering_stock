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
        const response = await axios.get(`${SERVER_URL}/api/community/board/${boardId}/image`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetchin BoardImage:', error);
        throw error;
    }
};


export const createBoard = async (formData, token) => {
    try {
        const authToken = await getAuthToken();

        if (authToken) {
            const response = await axios.post(
                `${SERVER_URL}/api/community/board/writeBoard`,
                formData,
                {
                    headers: {
                        Authorization: authToken,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log("작성된 글 API:", response.data);
            return response.data;
        } else {
            console.error('토큰이 없습니다.');
            throw new Error('토큰이 없습니다.');
        }
    } catch (error) {
        console.error('Error creating board:', error);
        throw error;
    }
};

export const editBoard = async (boardId, boardData, token) => {
    try {
        console.log('수정된 정보:', boardData);
        const response = await axios.patch(
            `${SERVER_URL}/api/community/board/edit/${boardId}`,
            boardData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error editing board:', error);
        throw error;
    }
};

export const deleteBoard = async (boardId) => {
    try {
        const authToken = await getAuthToken();
        if (authToken) {
            const response = await axios.delete(
                `${SERVER_URL}/api/community/board/delete/${boardId}`,
                {
                    headers: {
                        Authorization: authToken,
                    },
                }
            );
            console.log(response.data)
            return response.data;
        } else {
            console.error('토큰이 없습니다.');
            throw new Error('토큰이 없습니다.');
        }
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
        const authToken = await getAuthToken();
        const response = await axios.get(`${SERVER_URL}/api/search/community`, {
            headers: {
                'Authorization': authToken,
            },
        });
        console.log("최근 검색어(커뮤니티):", response.data);
        return response.data;
    } catch (error) {
        console.error("최근 검색어(커뮤니티)를 가져오는 중 오류 발생:", error);
        throw error;
    }
};

export const deleteSearchesTerm = async (searchId) => {
    try {
        const response = await axios.delete(`${SERVER_URL}/api/search/${searchId}/delete`);
        console.log("최근 검색어 삭제:", response.data);
        return response.data;
    } catch (error) {
        console.error("최근 검색어를 삭제하는 중 오류 발생:", error);
        throw error;
    }
};

//좋아요
export const addLike = async (likeDto) => {
    try {
        const response = await axios.post(`${SERVER_URL}/api/community/board/${likeDto.boardId}/likes/add`, likeDto);
        return response.data;
    } catch (error) {
        console.error('Error adding like:', error);
        throw error;
    }
};

export const deleteLike = async (boardId, userEmail) => {
    try {
        const response = await axios.delete(`${SERVER_URL}/api/community/board/${boardId}/likes/delete/${userEmail}`);
        return response.data;
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


//댓글
export const createComment = async (boardId, commentData) => {
    try {
        const authToken = await getAuthToken();
        if (authToken) {
            const response = await axios.post(
                `${SERVER_URL}/api/community/board/${boardId}/writeComment`,
                commentData,
                {
                    headers: {
                        Authorization: authToken,
                    },
                }
            );
            console.log(response.data)
            return response.data;
        } else {
            console.error('토큰이 없습니다.');
            throw new Error('토큰이 없습니다.');
        }
    } catch (error) {
        console.error('Error creating comment:', error);
        throw error;
    }
};

export const deleteComment = async (boardId, commentId) => {
    try {
        const authToken = await getAuthToken();
        if (authToken) {
            const response = await axios.delete(
                `${SERVER_URL}/api/community/board/${boardId}/delete/${commentId}`,
                {
                    headers: {
                        Authorization: authToken,
                    },
                }
            );
            console.log("댓글삭제 API:", response.data)
            return response.data;
        } else {
            console.error('토큰이 없습니다.');
            throw new Error('토큰이 없습니다.');
        }
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
};

export const editComment = async (boardId, commentId, commentData) => {
    try {
        const authToken = await getAuthToken();

        if (authToken) {
            const response = await axios.patch(
                `${SERVER_URL}/api/community/board/${boardId}/edit/${commentId}`,
                commentData,
                {
                    headers: {
                        Authorization: authToken,
                    },
                }
            );
            console.log(response.data)
            return response.data;
        } else {
            console.error('토큰이 없습니다.');
            throw new Error('토큰이 없습니다.');
        }
    } catch (error) {
        if (error.response){
            console.error('Server Response:', error.response);
        } else if (error.request){
            console.error('No response received:', error.request);
        } else {
            console.error('Error:', error.message);
        }
        // console.error('Error editing comment:', error);
        throw error;
    }
};
  
export const fetchBoardComments = async (boardId) => {
    try {
        const response = await axios.get(`${SERVER_URL}/api/community/board/${boardId}/comment`);
        console.log(response.data)
        return response.data;
      } catch (error) {
        console.error('Error fetchin Comments:', error);
        throw error;
      }
};