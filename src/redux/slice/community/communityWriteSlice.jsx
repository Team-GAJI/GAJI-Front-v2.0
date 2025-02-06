import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  body: "",
  thumbnailUrl: "",
  type: "",
  hashtagList: [],
  category: "",
};

const communityWriteSlice = createSlice({
  name: "communityWrite",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setBody: (state, action) => {
      state.body = action.payload;
    },
    setThumbnailUrl: (state, action) => {
      state.thumbnailUrl = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setHashtagList: (state, action) => {
      state.hashtagList = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    resetPostCreate: () => initialState,
  },
});

export const {
  setTitle,
  setBody,
  setThumbnailUrl,
  setType,
  setHashtagList,
  setCategory,
  resetPostCreate,
} = communityWriteSlice.actions;

export default communityWriteSlice.reducer;
