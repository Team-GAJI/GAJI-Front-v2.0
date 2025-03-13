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
    
      if (!state.weeksData[weekIndex]) {
        state.weeksData[weekIndex] = {
          basicInfo: { title: "", description: "" },
          tasks: [],
          studyPeriodStartDate: null,
          studyPeriodEndDate: null,
          assignments: [],
        };
      }
    
      // 기존 과제(assignmentId 있는 것)와 새로운 과제(assignmentId 없는 것) 구분 후 병합
      const existingAssignments = state.weeksData[weekIndex].assignments.filter(a => a.assignmentId);
      const newAssignments = weekData.assignments.filter(a => !a.assignmentId);
    
      state.weeksData[weekIndex] = {
        ...state.weeksData[weekIndex], 
        ...weekData,
        assignments: weekData.assignments,
        // assignments: [...existingAssignments, ...newAssignments], // 기존 과제 유지 + 새 과제 추가
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
