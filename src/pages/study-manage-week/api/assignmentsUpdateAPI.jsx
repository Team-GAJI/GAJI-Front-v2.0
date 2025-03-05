import { api } from "../../../app/api";

export const assignmentsUpdateAPI = async (assignmentsInfo, assignmentId) => {
  try {
    const response = await api.put(
      `/study-rooms/event/${assignmentId}/update`,
      {
        assignmentId:  assignmentsInfo.assignments,
        // bodyList: assignmentsInfo.assignments,
      },
    );
    return response.data.result;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};
