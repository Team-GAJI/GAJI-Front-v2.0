import { api } from "../../../app/api";

export const studyRecruitAPI = async (roomId) => {
  try {
    const response = await api.post(`study-recruit-posts/${roomId}`);
    console.log(response);
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};
