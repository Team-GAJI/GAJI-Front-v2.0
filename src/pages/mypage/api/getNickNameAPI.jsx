import { api } from "../../../app/api";

export const getNickNameAPI = async (nickName) => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await api.put(`users/nicknames/${userId}`, {
      nickname: nickName,
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};
