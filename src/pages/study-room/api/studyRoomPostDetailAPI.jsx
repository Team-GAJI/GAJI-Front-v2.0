import { api } from "../../../app/api";

export const studyRoomPostDetailAPI = async (postId) => {
  try {
    console.log(postId);
    const response = await api.get(`study-rooms/post/${postId}detail`);
    console.log(response.data);
    return response.data.result;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};
