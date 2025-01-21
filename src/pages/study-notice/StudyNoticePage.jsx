import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import Notices from "../study-room/ui/Notices";
import PageHeader from "../../components/common/PageHeader";
import { ContentWrapper60 } from "../../components/common/MediaWrapper";
import { studyNoticeAPI } from "../study-room/api/studyNoticeAPI"; // API 모듈에서 함수 임포트
import MobileWriteButton from "../../components/common/MobileWriteButton";

const StudyNoticePage = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [notices, setNotices] = useState([]);
  const location = useLocation();
  const roomId = location.state?.roomId || {};

  const handleNavigateToRegister = () => {
    console.log("트러블슈팅 글쓰기로 이동");
    navigate("/studynotice-register", { state: { roomId: roomId } });
  };

  const handleNavigateToTroubleshooting = () => {
    navigate("/troubleshooting", { state: { roomId: roomId } });
  };

  const handleNavigateToStudyRoom = () => {
    navigate("/studyroom", { state: { roomId: roomId } });
  };

  const moveToTop = (index) => {
    const updatedNotices = [...notices];
    const [selectedNotice] = updatedNotices.splice(index, 1);
    updatedNotices.unshift(selectedNotice);
    setNotices(updatedNotices);
  };

  const headerTitles = [
    "스터디 홈",
    "트러블 슈팅 게시판",
    "정보나눔 게시판",
    "채팅방",
  ];

  useEffect(() => {
    console.log(roomId);
    const fetchNotices = async () => {
      try {
        const fetchedNotices = await studyNoticeAPI(roomId);
        setNotices(fetchedNotices);
        console.log(notices);
      } catch (error) {
        console.error("공지사항을 불러오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchNotices();
  }, [roomId]);

  return (
    <>
      <PageHeader
        large={true}
        pageTitle="스터디룸 공지사항"
        headerTitles={headerTitles}
        activeButtonIndex={1}
        onButtonClick={(index) => {
          if (index === 0) handleNavigateToStudyRoom();
          if (index === 1) handleNavigateToTroubleshooting();
        }}
        changeColorOnClick={false}
        changeColorOnHover={true}
      />
      <ContentWrapper60>
        <ColumnWrapper>
          <Container>
            <Text>스터디명 공지사항</Text>
            <div onClick={() => handleNavigateToRegister()}>
              <MobileWriteButton />
            </div>
            <WritingButton onClick={() => handleNavigateToRegister()}>
              + 공지사항 작성
            </WritingButton>
          </Container>

          {notices.length > 0 ? (
            <NoticeSquareWrapper>
              <Notices
                notices={notices}
                onMoveToTop={moveToTop}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
              />
            </NoticeSquareWrapper>
          ) : (
            <NoNoticesText>공지사항이 없습니다.</NoNoticesText>
          )}
        </ColumnWrapper>
      </ContentWrapper60>
    </>
  );
};

export default StudyNoticePage;

const Text = styled.p`
  font-size: 1.2em;
  font-weight: 800;
  color: #8e59ff;
  margin-top: 0.625em;
  font-family: "NanumSquareNeo", sans-serif;
  width: 100%;
  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1.25em;
  border-bottom: 0.0625em solid #a2a3b2;
  padding-top: 0.625em;
  font-family: "NanumSquareNeo", sans-serif;

  @media (max-width: 768px) {
    margin-bottom: 1em;
    padding-top: 0.5em;
  }
`;

const WritingButton = styled.button`
  background-color: #8e59ff;
  border: 0.0625em solid #8e59ff;
  color: #fff;
  border-radius: 0.7em;
  font-weight: 700;
  width: 11.75em;
  height: 2.5em;
  margin-right: 0;
  font-family: "NanumSquareNeo", sans-serif;

  &:hover {
    background-color: #5548c8;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const NoticeSquareWrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(5, auto);
  gap: 0.625em;
  margin-bottom: 1.875em;
  font-family: "NanumSquareNeo", sans-serif;

  @media (max-width: 768px) {
    gap: 0.5em;
    margin-bottom: 1.5em;
  }
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625em;
  margin-top: 0.625em;
  margin-left: 1.25em;
  width: 100%;

  @media (max-width: 768px) {
    margin-top: 0.5em;
    margin-left: 0.5em;
    gap: 0.5em;
  }
`;

const NoNoticesText = styled.p`
  width: 100%;
  height: 100vh;
  font-size: 1em;
  color: #a2a3b2;
  font-weight: 700;
  text-align: center;
  margin-top: 2em;
  margin-bottom: 2em;
  font-family: "NanumSquareNeo", sans-serif;
`;
