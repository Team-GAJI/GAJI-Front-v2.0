import { api } from "../../../app/api";

export const studyDetailAPI = async (roomId) => {
  try {
    console.log(roomId);
    const response = await api.get(`study-recruit-posts/${roomId}`);
    console.log(response.data);
    return response.data.result;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};
