import { api } from "../../../app/api";

export const studyCreateAPI = async (data) => {
  try {
    console.log(data);
    const response = await api.post(`study-recruit-posts`, data);
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};
