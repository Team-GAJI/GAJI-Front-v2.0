import { api } from "../../../app/api";

export const studyInfoAPI = async (roomId) => {
  try {
    const response = await api.get(`study-rooms/home/${roomId}`);
    console.log(`studyInfoAPI 요청 성공:`, response.data.result);
    return response.data.result;
  } catch (error) {
    console.error(`API 요청 중 오류 발생 (roomId: ${roomId}):`, error);
    throw error;
  }
};

// {
//   "name": "AI를 이용한 이미지 생성",
//   "startDay": "2024-08-26",
//   "endDay": "2024-08-31",
//   "recruitStartDay": "2024-08-15",
//   "recruitEndDay": "2024-08-24",
//   "daysLeftForRecruit": 0,
//   "applicantCount": 0
// }

//"materialList": []
//"description": "string"
//"studyCategory" : "string"
