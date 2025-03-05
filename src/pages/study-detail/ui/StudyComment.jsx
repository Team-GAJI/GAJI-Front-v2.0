import React from "react";
import styled from "styled-components";
import ReplyIcon from "../../../assets/icons/community/reply.svg?react";
import normalProfileImg from "../../../assets/images/community/userProfile.png";

const StudyComment = ({ key, writer, content, time }) => {
  // 유저 이름 앞 글자 따오기
  const getFirstChar = (writer) => {
    return writer && writer.trim().length > 0 ? writer.trim()[0] : "u";
  };

  return (
    <CommentWrapper key={key}>
      <WriterWrapper>
        <UserProfile>{getFirstChar(writer)}</UserProfile>
        <UserName>{writer}</UserName>
        <RelativeTime>{time}</RelativeTime>
      </WriterWrapper>
      <Content>{content}</Content>
      {/* <ReplyWrapper>
        <StyledReplyIcon />
        <ReplyText>답글달기</ReplyText>
      </ReplyWrapper> */}
    </CommentWrapper>
  );
};

export default StudyComment;

/* CSS */
const CommentWrapper = styled.div`
  margin: 2.5em 0;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const WriterWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const UserProfile = styled.div`
  border-radius: 30px;
  margin-right: 0.5em;
  width: 1.75em;
  height: 1.75em;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  background-color: #8e59ff;
  color: white;
  font-size: 1.5em;
  cursor: pointer;
`;

const UserName = styled.div`
  margin-right: 0.8em;
  color: #8e59ff;
  font-weight: 800;
`;

const RelativeTime = styled.div`
  color: #a2a3b2;
  font-size: 0.8125em;
  font-weight: bold;
`;

const Content = styled.div`
  margin: 1em 0;
  width: 100%;
  color: #161a3f;
  font-weight: bold;
`;

// const ReplyWrapper = styled.div`
//   width: 5em;
//   display: flex;
//   align-items: center;
//   cursor: pointer;
// `;

// const StyledReplyIcon = styled(ReplyIcon)`
//   margin-right: 0.5em;
//   width: 1.2em;
//   height: 1.2em;
// `;

// const ReplyText = styled.div`
//   color: #a2a3b2;
//   font-size: 0.8125em;
//   font-weight: bold;
// `;
