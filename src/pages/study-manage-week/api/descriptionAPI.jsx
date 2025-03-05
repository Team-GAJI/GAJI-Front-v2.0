import { api } from "../../../app/api";


export const descriptionAPI = async (roomId, weeks, weekInfo) => {
  try {
  //weeks가 0이면 저장이 X -> 0이면 1로 바꿈
    const validWeeks = weeks === 0 ? 1 : weeks;

    console.log("roomId:", roomId);
    console.log("weeks:", validWeeks);
    console.log("weekInfo:", weekInfo);

    const response = await api.post(
      `/study-rooms/event/${roomId}/${validWeeks}/description`,
      {
        title: weekInfo.title,
        description: weekInfo.description,
      }
    );

    console.log("서버 응답:", response.data);
    return response.data.result;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error.response ? error.response.data : error);
    throw error;
  }
};
