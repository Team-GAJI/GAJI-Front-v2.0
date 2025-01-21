import React from "react";
import styled from "styled-components";
import ProfileImg from "../../../assets/images/community/writerProfile.png";
import SendMessageIcon from "../../../assets/icons/community/sendMessage.svg?react";

const PostWriterInfo = ({ nickName }) => {
  return (
    <ProfileWrapper>
      {/* 프로필 */}
      <ProfileDetailWrapper>
        <StyledProfileImg src={ProfileImg} alt="writer profile" />
        <TextWrapper>
          <WriterName>{nickName}</WriterName>
          <WriterGrade>Gold Member</WriterGrade>
          <Relativetime>
            마지막활동 | 1시간 전
            {/* <Cricle userActiveColor={userActiveColor}/>{userActive}  */}
          </Relativetime>
        </TextWrapper>
      </ProfileDetailWrapper>
      {/* 쪽지 */}
      <SendMessageWrapper>
        <SendMessageButton>
          <StyledSendMessageIcon />
        </SendMessageButton>
        <SendMessageText>쪽지 보내기</SendMessageText>
      </SendMessageWrapper>
    </ProfileWrapper>
  );
};

PostWriterInfo.displayName = "PostWriterInfo";

export default PostWriterInfo;

/* CSS */
const ProfileWrapper = styled.div`
  border-radius: 10px;
  width: 40.1875em;
  height: 10.375em;
  background-color: white;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0.25em 1.25em rgba(22, 26, 63, 0.2);
`;

const ProfileDetailWrapper = styled.div`
  margin: 1em;
  display: flex;
`;

const StyledProfileImg = styled.img`
  width: 8.625em;
  height: 8.5625em;
`;

const TextWrapper = styled.div`
  margin-left: 1.7em;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const WriterName = styled.div`
  color: #8e59ff;
  font-size: 1.25em;
  font-weight: 800;
`;

const WriterGrade = styled.div`
  margin: 0.8em 0 0.8em 0;
  border-radius: 10px;
  width: 7.8125em;
  height: 1.5625em;
  line-height: 1.5625em;
  text-align: center;
  background-color: #8e59ff;
  color: white;
`;

const Relativetime = styled.div`
  color: #a2a3b2;
`;

const SendMessageWrapper = styled.div`
  margin: 1.16875em 3em 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const SendMessageButton = styled.div`
  border-radius: 10px;
  width: 5.625em;
  height: 2.5em;
  justify-content: center;
  background-color: #8e50ff;
  cursor: pointer;
`;

const StyledSendMessageIcon = styled(SendMessageIcon)`
  margin: 0.5em;
  width: 1.5em;
  height: 1.5em;
`;

const SendMessageText = styled.div`
  margin: 0.7em;
  color: #a2a3b2;
  font-size: 0.6875em;
  font-weight: bold;
`;

// const Cricle = styled.div`
//     width : 0.75em;
//     height : 0.75em;
//     border-radius : 100%;
//     background-color: ${(props) => props.userActiveColor};
// `;
