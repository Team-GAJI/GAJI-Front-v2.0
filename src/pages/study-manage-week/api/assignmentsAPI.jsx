// import { api } from "../../../app/api";

// export const assignmentsAPI = async (roomId, weeks, assignmentsInfo) => {
//   try {
//     const response = await api.post(
//       `/study-rooms/assignments/${roomId}/${weeks}`,
//       {
//         bodyList: Array.isArray(assignmentsInfo.bodyList)
//           ? assignmentsInfo.bodyList.map(a => (typeof a === "string" ? a : a.name)) 
//           : [],
//       }
//     );
//     console.log("서버 응답:", response.data);

//     return response.data.result;
//   } catch (error) {
//     console.error("API 요청 중 오류 발생:", error);
//     throw error;
//   }
// };

import { api } from "../../../app/api";

export const assignmentsAPI = async (roomId, weeks, assignmentsInfo) => {
  const formattedAssignments = assignmentsInfo.bodyList
    .filter((a) => typeof a === "string" || (a && a.name))
    .map((a) => (typeof a === "string" ? a : a.name));

  try {
    const response = await api.post(
      `/study-rooms/assignments/${roomId}/${weeks}`,
      { bodyList: formattedAssignments }
    );

    return response.data.result;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error.response?.data || error);
    throw error;
  }
};
