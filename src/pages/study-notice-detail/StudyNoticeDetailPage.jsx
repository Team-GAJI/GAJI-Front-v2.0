import React from "react";
import { useLocation } from "react-router-dom";
import { ContentWrapper60 } from "../../components/common/MediaWrapper";
import styled from "styled-components";
import DivisionLine from "../study-room/ui/DivisionLine";

const StudyNoticeDetailPage = () => {
  const location = useLocation();
  const noticeBody = location.state?.noticeBody ?? "";
  const noticeTitle = location.state?.noticeTitle ?? "";

  return (
    <ContentWrapper60>
      <NoticeWrapper>
        <Title>{noticeTitle}</Title>
        <DivisionLine />
        <NoticeContent>{noticeBody}</NoticeContent>
      </NoticeWrapper>
    </ContentWrapper60>
  );
};

export default StudyNoticeDetailPage;

const Title = styled.h1`
  font-size: 1.8em;
  font-weight: semibold;
  color: #000000;
  text-align: center;
  margin-bottom: 1em;
`;

const NoticeWrapper = styled.div`
  width: 100%;
  max-width: 800px;

  border-radius: 12px;
  padding: 4em 2em;
  margin: 4em 0em;
  border: 1px solid #8e59ff;

  @media (max-width: 768px) {
    width: 80%;
    margin: 4em 0em;
    padding: 2.5em 1.5em;
  }
`;

const NoticeContent = styled.p`
  font-size: 1.1em;
  line-height: 1.6;
  color: #000000;
  white-space: pre-line;
`;
