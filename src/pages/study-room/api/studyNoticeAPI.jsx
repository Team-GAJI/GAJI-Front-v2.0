import { api } from "../../../app/api";

export const studyNoticeAPI = async (roomId) => {
  try {
    const response = await api.get(
      `study-rooms/${roomId}/notices?lastNoticeId=0`,
    );

    return response.data.result;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};

export const studyFirstNoticeAPI = async (roomId) => {
  try {
    const response = await api.get(
      `study-rooms/${roomId}/notices?lastNoticeId=0&size=1`,
    );

    return response.data.result;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};
