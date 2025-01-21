import { api } from "../../../app/api";
// 스터디 주차
export const weekcountAPI = async (roomId) => {
  try {
    const response = await api.get(`/api/study-rooms/home/{roomId}`);
    console.log(roomId);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};
