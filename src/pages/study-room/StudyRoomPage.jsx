import React, { useState, useMemo } from "react";
import styled from "styled-components";
import PageHeader from "../../components/common/PageHeader";
import StudySummary from "../study-room/ui/StudySummary";
import WeekCurriculum from "../study-room/ui/WeekCurriculum";
import StudyPostList from "../study-room/ui/StudyPostList";
import { useNavigate, useLocation } from "react-router-dom";
import MobileManageButton from "../../components/common/MobileManageButton";
import SideBar from "./ui/SideBar";

const StudyRoomPage = () => {
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);

  const location = useLocation();
  const data = location.state?.data || {};

  const roomId = useMemo(
    () => location.state?.roomId || {},
    [location.state?.roomId],
  );
  const studyInfo = data;
  const navigate = useNavigate();

  function calculateWeeks(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const totalDays = Math.round(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    );
    const totalWeeks = Math.ceil((totalDays + 1) / 7);

    return totalWeeks;
  }

  const weekCount = calculateWeeks(studyInfo.startDay, studyInfo.endDay);
  const [currentWeek, setCurrentWeek] = useState(weekCount);

  const headerTitles = [
    "스터디 홈",
    "트러블 슈팅 게시판",
    "정보나눔 게시판",
    "채팅방",
  ];
  const handleHeaderButtonClick = (index) => {
    setActiveButtonIndex(index);
    if (index === 0) {
      navigate("/study/room", { state: { roomId: roomId } });
    } else if (index === 1) {
      navigate("/study/trouble", { state: { roomId: roomId } });
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <PageHeader
        large={true}
        pageTitle="스터디룸"
        headerTitles={headerTitles}
        activeButtonIndex={activeButtonIndex}
        onButtonClick={handleHeaderButtonClick}
        changeColorOnClick={true}
        changeColorOnHover={true}
      />
      <SideBar
        studyInfo={studyInfo}
        roomId={roomId}
        week={weekCount}
        setCurrentWeek={setCurrentWeek}
      />
      <ContentWrapper>
        <MainContent>
          <StudySummary studyInfo={studyInfo} roomId={roomId} />
          <DivisionLine2 />
          <WeekCurriculum
            studyInfo={studyInfo}
            roomId={roomId}
            week={currentWeek}
          />
          <DivisionLine2 />
          <StudyPostList roomId={roomId} />
        </MainContent>
      </ContentWrapper>
      <div
        onClick={() =>
          navigate("/study/manage", {
            state: { roomId: roomId, week: weekCount },
          })
        }
      >
        <MobileManageButton />
      </div>
    </>
  );
};

export default StudyRoomPage;

const ContentWrapper = styled.div`
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  gap: 4em;

  @media (max-width: 1199px) {
    width: 70%;
  }
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const DivisionLine2 = styled.div`
  border-top: 0.1125em solid #8e59ff;
  margin: 2.125em 0px;
  width: 100%;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 1.25em;
  color: #000;
  display: flex;
  flex-direction: column;
`;
