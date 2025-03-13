import { api } from "../../../app/api";

export const ongoingStudyListAPI = async (size = 10) => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await api.get(`/users/rooms/${userId}`, {
      params: { type: "ONGOING", size },
    });
    console.log(response.data.result.roomList);
    return response.data.result.roomList;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};

export const endedStudyListAPI = async (size = 10) => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await api.get(`/users/rooms/${userId}`, {
      params: { type: "ENDED", size },
    });
    console.log(response.data.result.roomList);
    return response.data.result.roomList;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};
