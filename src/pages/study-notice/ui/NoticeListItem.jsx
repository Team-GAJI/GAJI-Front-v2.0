import React, { useState } from "react";
import styled from "styled-components";
import userProfile from "../../../assets/images/community/userProfile.png";
import CheckTooltip from "../../study-room/ui/CheckTooltip";
import { useNavigate } from "react-router-dom";

const NoticeListItem = ({ notice }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const navigte = useNavigate();
  const handleDetail = () => {
    navigte("/study/notice/detail", {
      state: { noticeContent: notice.content },
    });
  };
  return (
    <NoticeListItemWrapper onClick={handleDetail}>
      <ColumnWrapper>
        <InputWrapper>
          <NoticeTitle>{notice.title}</NoticeTitle>
        </InputWrapper>

        <Container1>
          <User src={userProfile} alt="User Icon" />
          <Text4>{notice.authorName}</Text4>
          <Text3>{notice.timeSincePosted}</Text3>
          <CheckButton>
            <span>확인</span>
            <span>{notice.confirmCount}</span>
            <CheckTooltip
              users={
                [
                  // "user1023",
                  // "user2045",
                  // "user3098",
                  // "user4567",
                  // "user5678",
                ]
              }
              visible={tooltipVisible}
            />
          </CheckButton>
        </Container1>
      </ColumnWrapper>
    </NoticeListItemWrapper>
  );
};

export default NoticeListItem;

const NoticeListItemWrapper = styled.div`
  width: 100%;
  height: auto;
  border: 1px solid #8e59ff;
  border-radius: 1.25em;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 1.25em;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1em;
    border-radius: 1em;
  }

  @media (max-width: 480px) {
    padding: 0.75em;
  }
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3em;
  width: 100%;
  margin-top: 0.2em;
  margin-left: 0.2em;

  @media (max-width: 768px) {
    margin-left: 0;
    gap: 0.25em;
  }

  @media (max-width: 480px) {
    margin-top: 0.1em;
    margin-left: 0.1em;
    gap: 0.2em;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  margin-bottom: -1.25em;

  @media (max-width: 768px) {
    margin-bottom: -1em;
  }

  @media (max-width: 480px) {
    margin-bottom: -0.75em;
  }
`;

const NoticeTitle = styled.p`
  height: auto;
  font-weight: 800;
  font-size: 1em;
  line-height: 1.4em;

  @media (max-width: 768px) {
    font-size: 0.9em;

    line-height: 1.2em;
  }
`;

const Container1 = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 0.625em;
  width: 100%;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    padding-bottom: 0.5em;
  }

  @media (max-width: 480px) {
    padding-bottom: 0.4em;
  }
`;

const User = styled.img`
  width: 2.25em;
  height: 2.25em;
  font-size: 0.5em;
  color: #fff;
  font-weight: 500;
  align-items: center;
  justify-content: center;
  margin-left: 0.625em;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 2em;
    height: 2em;
    margin-left: 0.5em;
  }

  @media (max-width: 480px) {
    width: 1.75em;
    height: 1.75em;
    margin-left: 0.4em;
  }
`;

const Text3 = styled.p`
  height: auto;
  font-weight: 600;
  font-size: 0.5em;
  color: #a2a3b2;
  padding: 0.8125em;
  flex-shrink: 0;

  @media (max-width: 768px) {
    font-size: 0.45em;
    padding: 0.5em;
  }

  @media (max-width: 480px) {
    font-size: 0.4em;
    padding: 0.4em;
  }
`;

const Text4 = styled.p`
  height: auto;
  font-weight: 600;
  font-size: 0.5em;
  color: #a2a3b2;
  padding: 0.8125em;
  margin-left: 0.625em;
  flex-shrink: 0;

  @media (max-width: 768px) {
    font-size: 0.45em;
    padding: 0.5em;
    margin-left: 0.5em;
  }

  @media (max-width: 480px) {
    font-size: 0.4em;
    padding: 0.4em;
    margin-left: 0.4em;
  }
`;

const CheckButton = styled.button`
  width: 5em;
  height: 2.5em;
  background-color: #fff;
  border: 0.0625em solid #8e59ff;
  border-radius: 0.5em;
  color: #8e59ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.625em;
  margin-left: auto;
  flex-shrink: 0;
  position: relative;

  @media (max-width: 768px) {
    width: 4.5em;
    height: 2em;
    font-size: 0.75em;
  }

  @media (max-width: 480px) {
    width: 4em;
    height: 1.75em;
    font-size: 0.7em;
  }
`;
