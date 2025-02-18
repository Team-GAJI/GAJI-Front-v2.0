import { api } from "../../../app/api";

// 좋아요 추가
export const communityAddLike = async (postId) => {
  try {
    const response = await (`community-posts/${postId}/likes`);
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
export const communityRemoveLike = async (postId) => {
  try {
    const response = await api.delete(`community-posts/${postId}/likes`);
    return response.data;
  } catch (error) {
    console.error(
      "좋아요 취소 API 요청 중 오류 발생:",
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
};

// 북마크 추가
export const communityAddBookmark = async (postId) => {
  try {
    const response = await api.post(`community-posts/${postId}/bookmarks`);
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
export const communityRemoveBookmark = async (postId) => {
  try {
    const response = await api.delete(`community-posts/${postId}/bookmarks`);
    return response.data;
  } catch (error) {
    console.error(
      "북마크 제거 API 요청 중 오류 발생:",
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
};
