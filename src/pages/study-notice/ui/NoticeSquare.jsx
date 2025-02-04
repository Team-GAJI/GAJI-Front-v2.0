import React, { useState } from "react";
import styled from "styled-components";
import NoticeAlarm from "../../../assets/icons/noticeRoom/NoticeAlarm.png";
import userProfile from "../../../assets/images/community/userProfile.png";
import CheckTooltip from "../../study-room/ui/CheckTooltip";

const NoticeSquare = ({
  notice,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onMoveToTop,
}) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  return (
    <NoticeSquareWrapper
      isHovered={isHovered}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <ColumnWrapper>
        <InputWrapper>
          <AlarmIcon
            src={NoticeAlarm}
            alt="공지"
            isHovered={isHovered}
            onClick={onMoveToTop}
          />
          <Text1 isHovered={isHovered}>{notice.text1}</Text1>
        </InputWrapper>
        <Text2>{notice.text2}</Text2>
        <Container1>
          <User src={userProfile} alt="User Icon" />
          <Text4>{notice.user}</Text4>
          <Text3>{notice.time}</Text3>
          <CheckButton
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span>확인</span>
            <span>{notice.checks}</span>
            <CheckTooltip
              users={[
                "user1023",
                "user2045",
                "user3098",
                "user4567",
                "user5678",
              ]}
              visible={tooltipVisible}
            />
          </CheckButton>
        </Container1>
      </ColumnWrapper>
    </NoticeSquareWrapper>
  );
};

export default NoticeSquare;

const NoticeSquareWrapper = styled.div`
  width: 100%;
  height: auto;
  border: 0.1em solid ${(props) => (props.isHovered ? "#8E59FF" : "#ccc")};
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

const Text1 = styled.p`
  padding-left: ${(props) => (props.isHovered ? "2.5em" : "0.5em")};
  height: auto;
  font-weight: 800;
  font-size: 1em;
  line-height: 1.4em;
  box-sizing: border-box;

  @media (max-width: 768px) {
    font-size: 0.9em;
    padding-left: ${(props) => (props.isHovered ? "2em" : "0.5em")};
    line-height: 1.2em;
  }

  @media (max-width: 480px) {
    font-size: 0.8em;
    padding-left: ${(props) => (props.isHovered ? "1.5em" : "0.5em")};
    line-height: 1.1em;
  }
`;

const AlarmIcon = styled.img`
  position: absolute;
  left: 0.625em;
  top: 50%;
  transform: translateY(-50%);
  width: 0.9375em;
  height: auto;
  cursor: pointer;
  display: ${(props) => (props.isHovered ? "block" : "none")};

  @media (max-width: 768px) {
    width: 0.8em;
  }

  @media (max-width: 480px) {
    width: 0.7em;
  }
`;

const Text2 = styled.p`
  height: auto;
  font-weight: 600;
  font-size: 0.8em;
  color: #697077;
  padding: 0.8125em 0;
  margin-top: 0;
  line-height: 1.4em;
  box-sizing: border-box;

  @media (max-width: 768px) {
    font-size: 0.75em;
    padding: 0.5em 0;
    line-height: 1.2em;
  }

  @media (max-width: 480px) {
    font-size: 0.7em;
    padding: 0.4em 0;
    line-height: 1.1em;
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
  box-sizing: border-box;

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
  box-sizing: border-box;

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
  box-sizing: border-box;

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
  box-sizing: border-box;

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
