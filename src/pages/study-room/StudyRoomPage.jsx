import React, { useState, useMemo } from "react";
import styled from "styled-components";
import WeekCurriculum from "../study-room/ui/WeekCurriculum";
import { useNavigate, useLocation } from "react-router-dom";
import MobileManageButton from "../../components/common/MobileManageButton";
import SideBar from "./ui/SideBar";
import backGroundUrl from "../../assets/images/mypage/mypageBackground.png";
import { useEffect } from "react";
import { studyFirstNoticeAPI } from "./api/studyNoticeAPI";
import FirstNoticeSquare2 from "./ui/FirstNoticeSquare2";

const StudyRoomPage = () => {
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const [firstNotice, setFirstNotice] = useState();

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

  useEffect(() => {
    const noticeData = studyFirstNoticeAPI(roomId);
    if (noticeData) setFirstNotice(noticeData);
  }, []);
  return (
    <>
      <Header>
        <StudyName>{studyInfo.name}</StudyName>
      </Header>
      <SideBar
        studyInfo={studyInfo}
        roomId={roomId}
        week={weekCount}
        setCurrentWeek={setCurrentWeek}
      />
      <ContentWrapper>
        <MainContent>
          <FirstNoticeSquare2 notice={firstNotice} />
          <WeekCurriculum
            studyInfo={studyInfo}
            roomId={roomId}
            week={currentWeek}
          />
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

const MainContent = styled.div`
  flex: 1;
  padding: 1.25em;
  color: #000;
  display: flex;
  flex-direction: column;
`;

const StudyName = styled.p`
  font-size: 2em;
  color: #8e59ff;
  font-weight: 800;
  width: 100%;
  text-align: center;
`;

const Header = styled.div`
  display: flex;
  z-index: 2;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10em;
  gap: 1em;
  background-color: #fbfaff;
  background-image: url(${backGroundUrl});
  @media (max-width: 768px) {
    margin-bottom: ${({ $large }) => ($large ? "3em" : "0em")};
  }
`;
