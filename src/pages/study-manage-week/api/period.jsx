import { api } from "../../../app/api";

// 스터디 기한 API
export const periodAPI = async (roomId, week, periodInfo) => {
  try {
    console.log("보내는 데이터:", {
      startDate: periodInfo.studyPeriodStartDate,
      endDate: periodInfo.studyPeriodEndDate,
    });

    const response = await api.post(
      `/api/study-rooms/event/${roomId}/${week}/period`,
      {
        startDate: periodInfo.studyPeriodStartDate,
        endDate: periodInfo.studyPeriodEndDate,
      },
    );

    return response.data.result;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error.response || error);
    throw error;
  }
};
