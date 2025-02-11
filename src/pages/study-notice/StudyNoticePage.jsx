import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import NoticeList from "./ui/NoticeList";
import { ContentWrapper60 } from "../../components/common/MediaWrapper";
import { studyNoticeAPI } from "../study-room/api/studyNoticeAPI"; // API 모듈에서 함수 임포트
import MobileWriteButton from "../../components/common/MobileWriteButton";

const StudyNoticePage = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [notices, setNotices] = useState();
  const location = useLocation();
  const roomId = location.state?.roomId ?? null;
  const isWriter = location.state?.isWriter ?? false;
  const studyName = location.state?.studyName ?? "";

  const handleNavigateToRegister = () => {
    navigate("/study/notice/write", {
      state: { roomId, studyName },
    });
  };

  const moveToTop = (index) => {
    const updatedNotices = [...notices];
    const [selectedNotice] = updatedNotices.splice(index, 1);
    updatedNotices.unshift(selectedNotice);
    setNotices(updatedNotices);
  };

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const noticeData = await studyNoticeAPI(roomId);
        setNotices(noticeData);
      } catch (error) {
        console.error("공지사항을 불러오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchNotices();
  }, [roomId]);

  return (
    <>
      <ContentWrapper60>
        <ColumnWrapper>
          <Container>
            <Text>{studyName} 공지사항</Text>
            {isWriter && (
              <>
                <div onClick={() => handleNavigateToRegister()}>
                  <MobileWriteButton />
                </div>
                <WritingButton onClick={() => handleNavigateToRegister()}>
                  + 공지사항 작성
                </WritingButton>
              </>
            )}
          </Container>

          {notices && notices.length > 0 ? (
            <NoticeList
              notices={notices}
              onMoveToTop={moveToTop}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
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
  cursor: pointer;
  @media (max-width: 768px) {
    display: none;
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
