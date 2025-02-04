import React from "react";
import styled from "styled-components";
import NoticeAlarm from "../../../assets/icons/noticeRoom/NoticeAlarm.png";

const FirstNoticeSquare2 = ({ firstNotice }) => {
  return (
    <NoticeSquareWrapper>
      <p>{firstNotice}</p>
      <AlarmIcon src={NoticeAlarm} alt="공지" />
      <Text>
        {firstNotice === undefined ? "공지가 없습니다." : firstNotice}
      </Text>
    </NoticeSquareWrapper>
  );
};

export default FirstNoticeSquare2;

const NoticeSquareWrapper = styled.div`
  width: 100%;
  height: auto;
  border: 1px solid #8e59ff;
  border-radius: 0.5em;
  margin-bottom: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 1em;
  padding-right: 1em;
  gap: 1em;
  box-sizing: border-box;
`;

const Text = styled.p`
  height: auto;
  min-width: 100%;
  font-weight: 700;
  font-size: 1em;
  color: grey;

  @media (max-width: 768px) {
    font-size: 0.9em;
  }

  @media (max-width: 480px) {
    font-size: 0.8em;
  }
`;

const AlarmIcon = styled.img`
  width: 14px;
`;
