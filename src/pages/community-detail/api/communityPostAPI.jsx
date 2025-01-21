import { api } from "../../../app/api";

export const communityPostAPI = async (postId) => {
  try {
    console.log(postId);
    const response = await api.get(`community-posts/${postId}`);
    console.log(response.data);
    return response.data.result;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};
