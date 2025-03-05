import { api } from "../../../app/api";

export const assignmentsAPI = async (roomId, weeks, assignmentsInfo) => {
  try {
    const response = await api.post(
      `/study-rooms/assignments/${roomId}/${weeks}`,
      {
        bodyList: assignmentsInfo.assignments,
      },
    );
    return response.data.result;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};
