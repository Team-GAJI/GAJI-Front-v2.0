import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { communityPostAPI } from "../../community-detail/api/communityPostAPI";
import ThumbnailLogo from "../../../assets/logos/ThumbnailLogo.svg?react";

const HotPostPreview = ({ key, postId, title, background, tags }) => {
  // useNavigate
  const navigate = useNavigate();

  // 게시글 상세보기 버튼
  const handleSubmit = async () => {
    try {
      const postDetail = await communityPostAPI(postId);
      console.log(postDetail);
      navigate(`/community/detail/${postId}`);
    } catch (error) {
      console.error("스터디 생성 중 오류 발생:", error);
      // 필요에 따라 오류 처리 로직을 추가할 수 있습니다.
    }
  };

  // 기본 썸네일 기능
  const backgroundImage = background;

  return (
    <PostWrapper key={key} onClick={() => handleSubmit()}>
      <Background background={backgroundImage}>
        <StyledThumbnailLogo background={backgroundImage} />
      </Background>
      <ContentWrapper>
        <Title>{title}</Title>
        <TagWrapper>
          {tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </TagWrapper>
      </ContentWrapper>
    </PostWrapper>
  );
};

export default HotPostPreview;

/* CSS */
const PostWrapper = styled.div`
  border-radius: 10px;
  width: 13.25em;
  height: 13.5625em;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  box-shadow: 0 0.2em 1.2em #c8c8c8;
`;

const Background = styled.div`
  border-radius: 10px 10px 0 0;
  height: 60%;
  background-image: ${({ background }) => `url(${background})`};
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledThumbnailLogo = styled(ThumbnailLogo)`
  width: 2rem;
  display: ${(props) => (props.background ? "none" : "flex")};
`;

const ContentWrapper = styled.div`
  border-radius: 0 0 10px 10px;
  height: 40%;
  background-color: white;
`;

const Title = styled.div`
  margin: 1.3em 1.2em 0.8em 1.2em;
  font-weight: 800;
  text-align: start;
  // 말줄임표
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;

const TagWrapper = styled.div`
  margin: 0 1.2em;
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  white-space: nowrap;
`;

const Tag = styled.div`
  margin-right: 0.4em;
  padding: 0 0.7em;
  border-radius: 15px;
  height: 1.5454em;
  line-height: 1.5454em;
  background-color: #8e59ff;
  color: white;
  font-size: 0.6875em;
  font-weight: bold;
  text-align: center;
`;
