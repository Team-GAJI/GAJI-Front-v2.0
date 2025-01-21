import { api } from "../../../app/api";

// 북마크 추가
export const studyAddBookmark = async (roomId) => {
  try {
    const response = await api.post(`study-recruit-posts/${roomId}/bookmarks`);
    return response.data;
  } catch (error) {
    console.error(
      "북마크 API 요청 중 오류 발생:",
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
};

// 북마크 제거
export const studyRemoveBookmark = async (roomId) => {
  try {
    const response = await api.delete(
      `study-recruit-posts/${roomId}/bookmarks`,
    );
    return response.data;
  } catch (error) {
    console.error(
      "북마크 제거 API 요청 중 오류 발생:",
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
};

// 좋아요 추가
export const studyAddLike = async (roomId) => {
  try {
    const response = await api.post(`study-recruit-posts/${roomId}/likes`);
    return response.data;
  } catch (error) {
    console.error(
      "좋아요 API 요청 중 오류 발생:",
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
};

// 좋아요 취소
export const studyRemoveLike = async (roomId) => {
  try {
    const response = await api.delete(`study-recruit-posts/${roomId}/likes`);
    return response.data;
  } catch (error) {
    console.error(
      "좋아요 취소 API 요청 중 오류 발생:",
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
};
