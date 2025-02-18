import { api } from "../../../app/api";

export const communityStatusAPI = async (postId) => {
  try {
    console.log(postId);
    const response = await api.put(`community-posts/${postId}/status`);
    const result = response.data.result;
    console.log(result);
    return result;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};
