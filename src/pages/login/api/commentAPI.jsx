import { api } from "../../../app/api";

// 스터디 댓글 작성
export const studyWriteCommentAPI = async (roomId, body) => {
  try {
    const response = await api.post(
      `study-recruit-posts/${roomId}/comments`,
      body,
    );
    console.log(response);
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};

// 스터디 댓글 목록
export const studyViewCommentAPI = async (roomId) => {
  try {
    console.log(roomId);
    const response = await api.get(`study-recruit-posts/${roomId}/comments`);
    console.log(response.data);
    return response.data.result.commentList;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};

// 커뮤니티 댓글 작성
export const communityWriteCommentAPI = async (postId, body) => {
  try {
    const response = await api.post(`community-posts/${postId}/comments`, body);
    console.log(response);
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};

// 커뮤니티 댓글 목록
export const communityViewCommentAPI = async (postId) => {
  try {
    console.log(postId);
    const response = await api.get(`community-posts/${postId}/comments`);
    console.log(response.data);
    return response.data.result.commentList;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};
