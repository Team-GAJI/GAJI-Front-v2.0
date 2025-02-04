import { api } from "../../../app/api";

export const getSetUserId = async () => {
  try {
    const response = await api.get("users/");
    console.log(response.data);
    const userId = response.data.result.userId;
    localStorage.setItem("userId", userId);
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};
