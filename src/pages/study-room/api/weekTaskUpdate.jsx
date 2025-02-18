import { api } from "../../../app/api";

export const weekTaskUpdate = async (userAssignmentId) => {
  try {
    const response = await api.post(
      `study-rooms/main/assignment/${userAssignmentId}`,
    );

    return response;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};
