import "./App.css";
import { Routes, Route } from "react-router-dom";

import MainLayOut from "../components/layout/MainLayOut";
import MyPage from "../pages/mypage/MyPage";
import LoginPage from "../pages/login/LoginPage";
import MainPage from "../pages/main/MainPage";

import StudyMainPage from "../pages/study/StudyMainPage";
import StudyDetailPage from "../pages/study-detail/StudyDetailPage";
import StudyCreatePage from "../pages/study-create/StudyCreatePage";

import StudyManageWeekPage from "../pages/study-manage-week/StudyManageWeekPage";

import StudyNoticePage from "../pages/study-notice/StudyNoticePage";
import StudyNoticeWritePage from "../pages/study-notice-write/StudyNoticeWritePage";

import StudyOverviewPage from "../pages/study-overview/StudyOverviewPage";
import StudyRoomPage from "../pages/study-room/StudyRoomPage";

import CommunityPage from "../pages/community/CommunityPage";
import CommunityDetailPage from "../pages/community-detail/CommunityDetailPage";
import CommunityWritePage from "../pages/community-write/CommunityWritePage";
import KakaoRedirect from "../pages/login/KakaoRedirect";
import StudyNoticeDetailPage from "../pages/study-notice-detail/StudyNoticeDetailPage";

function App() {
  return (
    <Routes>
      {/* 로그인 페이지 라우트 */}
      <Route exact path="/login" element={<LoginPage />} />
      <Route exact path="/redirect" element={<KakaoRedirect />} />
      {/* 메인 레이아웃이 적용되는 라우트 그룹 */}
      <Route element={<MainLayOut />}>
        {/* 모든 하위 라우트에 메인 레이아웃이 적용됩니다 */}

        {/* 메인페이지 라우트 */}
        <Route exact path="/" element={<MainPage />} />

        {/* 마이페이지 라우트 */}
        <Route exact path="/mypage" element={<MyPage />} />

        {/* Study 관련 라우트 */}
        <Route exact path="/study" element={<StudyMainPage />} />
        <Route exact path="/study/create" element={<StudyCreatePage />} />
        <Route exact path="/study/detail" element={<StudyDetailPage />} />

        <Route
          exact
          path="/study/manage-week"
          element={<StudyManageWeekPage />}
        />
        <Route exact path="/study/notice" element={<StudyNoticePage />} />
        <Route
          exact
          path="/study/notice/write"
          element={<StudyNoticeWritePage />}
        />
        <Route
          exat
          path="/study/notice/detail"
          element={<StudyNoticeDetailPage />}
        />
        <Route exact path="/study/overview" element={<StudyOverviewPage />} />
        <Route exact path="/study/room" element={<StudyRoomPage />} />

        {/* Community 관련 라우트 */}
        <Route exact path="/community" element={<CommunityPage />} />
        <Route
          exact
          path="/community/detail"
          element={<CommunityDetailPage />}
        />
        <Route exact path="/community/write" element={<CommunityWritePage />} />
      </Route>
    </Routes>
  );
}

export default App;
