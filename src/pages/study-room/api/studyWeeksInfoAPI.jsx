import { api } from "../../../app/api";

export const studyWeeksInfoAPI = async (roomId) => {
  try {
    const response = await api.get(`study-recruit-posts/${roomId}`);

    return response.data.result.writerId;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};
