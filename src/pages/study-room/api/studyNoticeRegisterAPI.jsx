import { api } from "../../../app/api";

export const studyNoticeRegisterAPI = async (roomId, data) => {
  try {
    const response = await api.post(`study-rooms/notices/${roomId}`, data);
    console.log(response.data);
    return response.data.result;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};
