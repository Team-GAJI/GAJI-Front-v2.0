import { api } from "../../../app/api";

// 스터디 설명 API
// export const descriptionAPI = async (roomId, week, weekInfo) => {
//   try {
//     const response = await api.post(
//       `/study-rooms/event/${roomId}/${week}/description`,
//       {
//         title: weekInfo.name,
//         description: weekInfo.description,
//       },
//     );
//     console.log(weekInfo.name);
//     console.log("서버 응답:", response.data);
//     return response.data.result;
//   } catch (error) {
//     console.error("API 요청 중 오류 발생:", error);
//     throw error;
//   }
// };

export const descriptionAPI = async (roomId, weeks, weekInfo) => {
  try {
    // 로그로 값 확인
    console.log("roomId:", roomId);
    console.log("week:", weeks);
    console.log("weekInfo:", weekInfo);
    const response = await api.post(
      `/study-rooms/event/${roomId}/${weeks}/description`,
      {
        title: weekInfo.title,
        description: weekInfo.description,
      },
    );
    console.log("서버 응답:", response.data);
    return response.data.result;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error.response ? error.response.data : error);
    throw error;
  }
};
