import { api } from "../../../app/api";

export const studyRoomPostPreviewAPI = async (roomId) => {
  try {
    const response = await api.get(`study-rooms/home/post/${roomId}`);
    console.log(response.data.resul);
    return response.data.result;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};
