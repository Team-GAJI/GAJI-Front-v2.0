import { api } from "../../../app/api";

export const studyRoomWriteAPI = async (roomId, data) => {
  try {
    const response = await api.post(`study-rooms/post/${roomId}`, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};
