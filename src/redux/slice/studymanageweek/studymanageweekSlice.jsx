import { createSlice } from "@reduxjs/toolkit";

// studyWeekSlice.js
const initialState = {
  weeksData: [],
  taskData: [],
  periodDate: [],
  assignmentsDate: [],
};

const studyWeekSlice = createSlice({
  name: "studyWeek",
  initialState,
  reducers: {
    setWeekData: (state, action) => {
      const { weekIndex, weekData } = action.payload;

      // 주차 데이터 초기화
      if (!state.weeksData[weekIndex]) {
        state.weeksData[weekIndex] = {
          basicInfo: { name: "", description: "" },
          tasks: [],
          studyPeriodStartDate: null,
          studyPeriodEndDate: null,
          assignments: [], // 초기값
        };
      }

      // 주차 데이터 업데이트
      state.weeksData[weekIndex] = {
        ...state.weeksData[weekIndex], // 기존 데이터 유지
        ...weekData, // 새로운 데이터로 업데이트
        assignments:
          weekData.assignments || state.weeksData[weekIndex].assignments,
      };
    },

    deleteWeekData: (state, action) => {
      const { weekIndex } = action.payload;
      state.weeksData.splice(weekIndex, 1); // 주차 삭제
    },
  },
});

export const { setWeekData, deleteWeekData } = studyWeekSlice.actions;
export default studyWeekSlice.reducer;
