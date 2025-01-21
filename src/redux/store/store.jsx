import { configureStore } from "@reduxjs/toolkit";
import communitySlice from "../slice/community/communitySlice";
import studyCreateSlice from "../slice/study/studyCreateSlice";
import communityWriteSlice from "../slice/community/communityWriteSlice";
import studyWeekReducer from "../slice/studymanageweek/studymanageweekSlice";

// Local Storage에 Redux 상태 저장  -> ...?
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (error) {
    console.error("Could not save state", error);
  }
};

// Local Storage에서 Redux 상태 불러오기  -> ...?
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Could not load state", error);
    return undefined;
  }
};

const preloadedState = loadFromLocalStorage();

export const store = configureStore({
  reducer: {
    community: communitySlice,
    studyCreate: studyCreateSlice,
    communityWrite: communityWriteSlice,
    studyWeek: studyWeekReducer,
  },
  preloadedState, // 로컬 스토리지에서 불러온 상태
});

// 상태가 변경될 때마다 로컬 스토리지에 저장
store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

// import { configureStore } from '@reduxjs/toolkit';
// import communitySlice from '../slice/community/communitySlice';
// import studyCreateSlice from '../slice/study/studyCreateSlice';
// import communityWriteSlice from '../slice/community/communityWriteSlice';
// import studyWeekReducer from '../slice/studymanageweek/studymanageweekSlice';

// // Local Storage에 Redux 상태 저장  -> ...?
// const saveToLocalStorage = (state) => {
// try {
// const serializedState = JSON.stringify(state);
// localStorage.setItem('reduxState', serializedState);
// } catch (error) {
// console.error('Could not save state', error);
// }
// };

// // Local Storage에서 Redux 상태 불러오기  -> ...?
// const loadFromLocalStorage = () => {
// try {
// const serializedState = localStorage.getItem('reduxState');
// if (serializedState === null) return undefined;
// return JSON.parse(serializedState);
// } catch (error) {
// console.error('Could not load state', error);
// return undefined;
// }
// };

// const preloadedState = loadFromLocalStorage();

// export const store = configureStore({
// reducer: {
// community: communitySlice,
// studyCreate: studyCreateSlice,
// communityWrite: communityWriteSlice,
// studyWeek: studyWeekReducer,
// },
// preloadedState, // 로컬 스토리지에서 불러온 상태
// });

// // 상태가 변경될 때마다 로컬 스토리지에 저장
// store.subscribe(() => {
// saveToLocalStorage(store.getState());
// });
