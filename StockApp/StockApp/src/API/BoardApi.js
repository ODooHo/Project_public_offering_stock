import axios from 'axios';
import { getToken } from '../tokenManager';

const SERVER_URL = 'http://localhost:4000'; //실제 API 서버의 기본 주소
// const SERVER_URL = 'http://15.165.24.146:8080';
const USE_MOCK_DATA = true;  //이 값을 false로 설정하면 실제 API 호출

const MOCK_DATA = {
    boardList: [
        {
            boardId: 1,
            boardTitle: "공모주 청약, 놓치면 큰일나요!",
            author: "FinanceGeek",
            date: "2023-09-12"
        },
        {
            boardId: 2,
            boardTitle: "내일 청약 시작하는 공모주 리뷰",
            author: "StockMaster",
            date: "2023-09-11"
        },
        {
            boardId: 3,
            boardTitle: "공모주 청약 팁 공유합니다",
            author: "IPOlover",
            date: "2023-09-10"
        },
        // ... 기타 다른 게시글 데이터 추가 가능 ...
    ],
    boardDetail: [
        {
            boardId: 1,
            boardTitle: "공모주 청약, 놓치면 큰일나요!",
            boardContent: "최근에 공모주 청약에 성공하면 대박날 확률이 높아요. 특히 이번 달에 나올 공모주 중에서는...",
            boardImage: "FinanceGeek.jpg",
            boardWriterEmail: "financegeek@email.com",
            boardWriterProfile: "Finance Enthusiast",
            boardWriterNickname: "FinanceGeek",
            boardWriteDate: "2023-09-12",
            boardClickCount: 345,
            boardLikeCount: 120,
            boardCommentCount: 27
        },
        {
            boardId: 2,
            boardTitle: "내일 청약 시작하는 공모주 리뷰",
            boardContent: "내일 시작하는 청약에 대한 리뷰입니다...",
            boardImage: "Ohdoohooo.jpg",
            boardWriterEmail: "oooodooohoooo@email.com",
            boardWriterProfile: "hoooodoooooo",
            boardWriterNickname: "hihodo",
            boardWriteDate: "2023-08-23",
            boardClickCount: 942,
            boardLikeCount: 90,
            boardCommentCount: 25
        },
        {
            boardId: 3,
            boardTitle: "공모주 청약 팁 공유합니다",
            boardContent: "공모주 청약에 대한 다양한 팁을 공유합니다...",
            boardImage: "haemin.jpg",
            boardWriterEmail: "hammmm@email.com",
            boardWriterProfile: "hyemin",
            boardWriterNickname: "hamming",
            boardWriteDate: "2023-04-26",
            boardClickCount: 222,
            boardLikeCount: 290,
            boardCommentCount: 45
        }
    ],
    boardComments: [
        {
            id: 1,
            boardId: 1,
            content: "정말 유용한 정보네요! 감사합니다.",
            author: "StockBeginner",
            date: "2023-09-12"
        },
        {
            id: 2,
            boardId: 1,
            content: "저도 이번에 청약 넣어보려고요. 기대되네요.",
            author: "FutureRich",
            date: "2023-09-12"
        },
        {
            id: 3,
            boardId: 2,
            content: "리뷰 감사합니다! 도움이 많이 됐어요.",
            author: "Thanks01",
            date: "2023-09-11"
        },
        {
            id: 4,
            boardId: 3,
            content: "팁 잘 받아갑니다! 공유 감사합니다.",
            author: "TipTaker",
            date: "2023-09-10"
        }
    ]
};

// boardImage 이름 변환 함수
function convertImageName(email) {
  return email + '.jpg';
}

async function makeRequest(method, endpoint, data = {}) {
    const config = {
        method: method,
        url: `${SERVER_URL}${endpoint}`,
        data: data,
        headers: {}
    };

    const token = await getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error('API 요청 중 에러가 발생했습니다:', error);
        throw error;
    }
}

export const fetchBoardList = () => {
    if (USE_MOCK_DATA) {
        return Promise.resolve(MOCK_DATA.boardList);
    }
    return makeRequest('get', '/api/community/board/list');
};

export const fetchBoardDetail = (boardId) => {
    if (USE_MOCK_DATA) {
        const detail = MOCK_DATA.boardDetail.find(detail => detail.boardId === boardId);
        if (!detail.boardImage) {
            detail.boardImage = convertImageName(detail.boardWriterEmail);
        }
        return Promise.resolve(detail);
    }
    return makeRequest('get', `/api/community/board/${boardId}`);
};


// export const fetchBoardDetail = (boardId) => {
//     if (USE_MOCK_DATA) {
//         const detail = { ...MOCK_DATA.boardDetail };
//         if (!detail.boardImage) {
//             detail.boardImage = convertImageName(detail.boardWriterEmail); // 이미지 이름 변환 로직 추가
//         }
//         return Promise.resolve(detail);
//         // return Promise.resolve(MOCK_DATA.boardDetail);
//     }
//     return makeRequest('get', `/api/community/board/${boardId}`);
// };

export const fetchBoardComments = (boardId) => {
    if (USE_MOCK_DATA) {
        const comments = MOCK_DATA.boardComments.filter(comment => comment.boardId === boardId);
        return Promise.resolve(comments);
    }
    return makeRequest('get', `/api/community/board/${boardId}/comment`);
};

// export const fetchBoardComments = (boardId) => {
//     if (USE_MOCK_DATA) {
//         return Promise.resolve(MOCK_DATA.boardComments);
//     }
//     return makeRequest('get', `/api/community/board/${boardId}/comment`);
// };
