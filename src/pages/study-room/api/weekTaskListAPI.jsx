import { api } from "../../../app/api";

export const weekTaskListAPI = async (roomId, weeks) => {
  try {
    const response = await api.get(`study-rooms/${roomId}/${weeks}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};
