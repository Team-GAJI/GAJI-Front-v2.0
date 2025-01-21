import React from "react";
import styled from "styled-components";
import CloseButton from "../../../assets/icons/community/closeButton.svg?react";

const StudyCreateLinkEmbed = ({ link, onRemove }) => {
  const handleLinkClick = () => {
    window.open(link, "_blank");
  };

  return (
    <PostWrapper onClick={() => handleLinkClick()}>
      <LeftWrapper></LeftWrapper>
      <RightWrapper>
        <TextWrapper>
          <Title>{link}</Title>
          <Content>{link}</Content>
        </TextWrapper>
        <StyledCloseButton
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        />
      </RightWrapper>
    </PostWrapper>
  );
};

export default StudyCreateLinkEmbed;

/* CSS */
const PostWrapper = styled.div`
  margin-right: 0.5em;
  margin-bottom: 0.5em;
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
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;

const Content = styled.div`
  color: #a2a3b2;
  font-size: 0.8125em;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;

const StyledCloseButton = styled(CloseButton)`
  margin: 0.3em 0.3em 0 0em;
  width: 1.4375em;
  height: 1.4375em;
  cursor: pointer;
`;
