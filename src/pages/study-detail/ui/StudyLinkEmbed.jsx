import React from "react";
import styled from "styled-components";

const StudyLinkEmbed = ({ link }) => {
  const handleLinkClick = () => {
    window.open(link, "_blank");
  };

  return (
    <PostWrapper onClick={handleLinkClick}>
      <LeftWrapper></LeftWrapper>
      <RightWrapper>
        <TextWrapper>
          <Title>{link}</Title>
          <Content>{link}</Content>
        </TextWrapper>
      </RightWrapper>
    </PostWrapper>
  );
};

export default StudyLinkEmbed;

/* CSS */
const PostWrapper = styled.div`
  margin-right: 0.5em;
  border: 1.2px solid #8e59ff;
  border-radius: 10px;
  width: 17em;
  height: 5.4375em;
  display: flex;
  cursor: pointer;
`;

const LeftWrapper = styled.div`
  border-right: 1.2px solid #8e59ff;
  border-radius: 10px 0 0 10px;
  width: 4.4188em;
  background-color: #f4efff;
`;

const RightWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TextWrapper = styled.div`
  margin-left: 1em;
  width: 10em;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.div`
  margin-bottom: 0.8em;
  color: #161a3f;
  font-weight: 800;
  // 말줄임 처리
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;

const Content = styled.div`
  color: #a2a3b2;
  font-size: 0.8125em;
  font-weight: bold;
  // 말줄임 처리
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;
