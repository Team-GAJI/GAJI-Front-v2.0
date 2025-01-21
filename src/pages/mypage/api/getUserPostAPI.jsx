import { api } from "../../../app/api";

export const getUserPostAPI = async (userId, type, cursorDate, size = 10) => {
  try {
    const response = await api.get(`users/posts/${userId}`, {
      params: {
        type: type,
        cursorDate: cursorDate, // 문자열 형식의 날짜
        size: size,
      },
    });

    console.log("API 응답:", response);
    return response.data.result;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error.message);
    throw error;
  }
};
