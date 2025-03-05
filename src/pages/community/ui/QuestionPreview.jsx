import React from "react";
import styled from "styled-components";
import LikeIcon from "../../../assets/icons/community/emptyLikeIcon.svg?react";
import { useNavigate } from "react-router-dom";
import { communityPostAPI } from "../../community-detail/api/communityPostAPI";

const QuestionPreview = ({
  key,
  postId,
  state,
  title,
  content,
  writer,
  ago,
  views,
  like,
}) => {
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

  // 유저 이름 앞 글자 따오기
  const getFirstChar = (writer) => {
    return writer && writer.trim().length > 0 ? writer.trim()[0] : "u";
  };

  return (
    <PageWrapper key={key}>
      <PostState state={state}>{state}</PostState>
      <ContentWrapper onClick={() => handleSubmit()}>
        <Title>{title}</Title>
        <Content>{content}</Content>
      </ContentWrapper>
      <PostInfoWrapper>
        <PostType>질문</PostType>
        <StyledBar>|</StyledBar>
        <UserProfile>{getFirstChar(writer)}</UserProfile>
        <Writer>{writer}</Writer>
        <Ago>{ago}</Ago>
        <Views>조회 {views}</Views>
        <StyledBar>|</StyledBar>
        <StyledLikeIcon />
        <Like>{like}</Like>
      </PostInfoWrapper>
      <StyledHr />
    </PageWrapper>
  );
};

export default QuestionPreview;

/* CSS */
const PageWrapper = styled.div`
  font-size: 0.9em;
  width: 100%;
  height: 15em;
  text-align: start;
`;

const PostState = styled.div`
  border-radius: 15px;
  width: 8em;
  height: 1.7em;
  background-color: ${({ state }) =>
    state === "해결완료" ? "#A2A3B2" : "#8E59FF"};
  color: white;
  font-size: 0.7em;
  line-height: 1.7em;
  text-align: center;
`;

const ContentWrapper = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const Title = styled.p`
  margin-top: 0.8em;
  width: 20em;
  color: #8e59ff;
  font-size: 1.2em;
  font-weight: bold;
  // 말줄임 처리
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;

const Content = styled.div`
  height: 4.5em;
  line-height: 1.5em;
  color: #a2a3b2;
  font-size: 1.025em;
  // 말줄임 처리
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const PostInfoWrapper = styled.div`
  margin-top: 1.5em;
  display: flex;
  align-items: center;
  color: #d0d1d9;
  font-size: 0.8em;
`;

const PostType = styled.div`
  margin-right: 1em;
`;

const UserProfile = styled.div`
  border-radius: 30px;
  margin-right: 0.6em;
  width: 1.4em;
  height: 1.4em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #8e59ff;
  color: white;
  font-size: 0.9em;
`;

const StyledBar = styled.div`
  margin-right: 1em;
`;

const Writer = styled.div`
  margin-right: 1em;
`;

const Ago = styled.div`
  margin-right: 1em;
`;

const Views = styled.div`
  margin-right: 1em;
`;

const StyledLikeIcon = styled(LikeIcon)`
  margin-right: 0.5em;
  width: 1.3em;
  height: 1.3em;
`;

const Like = styled.div``;

const StyledHr = styled.hr`
  margin-top: 1.5em;
  border: none;
  height: 1px;
  background-color: #d0d1d9;
`;
