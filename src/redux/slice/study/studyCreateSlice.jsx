import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  description: "",
  thumbnailUrl: "",
  materialList: [],
  recruitStartDay: "",
  recruitEndDay: "",
  studyStartDay: "",
  studyEndDay: "",
  peopleLimited: true,
  peopleMaximum: 1,
  category: "",
  privateCheck: true,
};

const studyCreateSlice = createSlice({
  name: "studyCreate",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setThumbnailUrl: (state, action) => {
      state.thumbnailUrl = action.payload;
    },
    setMaterialList: (state, action) => {
      state.materialList = action.payload;
    },
    setRecruitStartDay: (state, action) => {
      state.recruitStartDay = action.payload;
    },
    setRecruitEndDay: (state, action) => {
      state.recruitEndDay = action.payload;
    },
    setStudyStartDay: (state, action) => {
      state.studyStartDay = action.payload;
    },
    setStudyEndDay: (state, action) => {
      state.studyEndDay = action.payload;
    },
    setPeopleLimited: (state, action) => {
      state.peopleLimited = action.payload;
    },
    setPeopleMaximum: (state, action) => {
      state.peopleMaximum = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setPrivate: (state, action) => {
      state.privateCheck = action.payload;
    },
  },
});

export const {
  setName,
  setDescription,
  setThumbnailUrl,
  setMaterialList,
  setRecruitStartDay,
  setRecruitEndDay,
  setStudyStartDay,
  setStudyEndDay,
  setPeopleLimited,
  setPeopleMaximum,
  setCategory,
  setPrivate,
} = studyCreateSlice.actions;

export default studyCreateSlice.reducer;
