import { api } from "../../../app/api";

export const communityWriteAPI = async (data) => {
  try {
    const response = await api.post(`community-posts`, data);
    console.log(response.data.result.postId);
    return response.data.result.postId;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};
