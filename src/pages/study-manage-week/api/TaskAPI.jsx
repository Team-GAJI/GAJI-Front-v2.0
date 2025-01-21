import { api } from "../../../app/api";

// 스터디 주차별 정보 API
export const TaskAPI = async (roomId, week) => {
  try {
    const response = await api.get(
      `/api/study-rooms/events/${roomId}/${week}/weekly-info`,
    );
    console.log(roomId);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};
