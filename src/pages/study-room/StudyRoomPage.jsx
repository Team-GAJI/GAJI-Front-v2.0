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
import { studyRoomPostDetailAPI } from "./api/studyRoomPostDetailAPI";

const StudyRoomPage = () => {
  const location = useLocation();
  const data = location.state?.data || {};
  const roomId = useMemo(
    () => location.state?.roomId || {},
    [location.state?.roomId],
  );
  const studyInfo = data;

  const [isWriter, setIsWriter] = useState(false);
  const [firstNotice, setFirstNotice] = useState();
  const [currentWeek, setCurrentWeek] = useState(0);

  const navigate = useNavigate();
  const handleNotice = () => {
    navigate("/study/notice", {
      state: { roomId, isWriter, studyName: studyInfo.name },
    });
  };
  const handleManageClick = () => {
    navigate("/study/manage", { state: { roomId, week: currentWeek + 1 } });
  };

  useEffect(() => {
    if (!roomId) return;

    const fetchData = async () => {
      try {
        const writerId = await studyRoomPostDetailAPI(roomId);
        const userId = localStorage.getItem("userId");

        if (writerId === Number(userId)) {
          setIsWriter(true);
        }
        // TODO : currentWeek update 코드

        const noticeData = await studyFirstNoticeAPI(roomId);
        if (noticeData) setFirstNotice(noticeData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [roomId]);

  return (
    <>
      <Header>
        <StudyName>{studyInfo.name}</StudyName>
        <StudyDate>
          {studyInfo.startDay} ~ {studyInfo.endDay}
        </StudyDate>
      </Header>
      <SideBar
        studyInfo={studyInfo}
        roomId={roomId}
        week={currentWeek + 1}
        isWriter={isWriter}
        setCurrentWeek={setCurrentWeek}
      />
      <ContentWrapper>
        <MainContent>
          <RowWrapper>
            <FirstNoticeSquare2 notice={firstNotice} />
            <NoticeMoreButton onClick={handleNotice}>더보기</NoticeMoreButton>
          </RowWrapper>
          <WeekCurriculum
            studyInfo={studyInfo}
            roomId={roomId}
            week={currentWeek}
          />
        </MainContent>
      </ContentWrapper>
      <div onClick={handleManageClick}>
        {isWriter && <MobileManageButton />}
      </div>
    </>
  );
};

export default StudyRoomPage;

const NoticeMoreButton = styled.div`
  cursor: pointer;
  background-color: #8e59ff;
  color: white;
  font-weight: 600;
  font-size: 13px;
  text-align: center;
  border-radius: 16px;
  padding: 0.5em 1.25em;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
`;

const RowWrapper = styled.div`
  margin-bottom: 2em;
  display: flex;
  gap: 1em;
  align-items: center;
`;
const StudyDate = styled.span`
  margin-top: -1em;
  color: grey;
`;

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

  background-color: #fbfaff;
  background-image: url(${backGroundUrl});
  @media (max-width: 768px) {
    margin-bottom: ${({ $large }) => ($large ? "3em" : "0em")};
  }
`;
