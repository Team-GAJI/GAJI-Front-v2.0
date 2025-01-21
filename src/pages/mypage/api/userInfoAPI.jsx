import { api } from "../../../app/api";

export const userInfoAPI = async () => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await api.get(`users/${userId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};
