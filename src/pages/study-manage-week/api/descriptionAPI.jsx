import { api } from "../../../app/api";

// 스터디 설명 API
export const descriptionAPI = async (roomId, week, weekInfo) => {
  try {
    const response = await api.post(
      `/api/study-rooms/event/${roomId}/${week}/description`,
      {
        name: weekInfo.name,
        description: weekInfo.description,
      },
    );
    console.log(weekInfo.name);
    console.log("서버 응답:", response.data);
    return response.data.result;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};
