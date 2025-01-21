import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import ProfileImg from "../../../assets/images/community/userProfile.png";
import Comment from "./Comment";
import { dummyComments } from "./DummyComments";
import Loading from "../../../components/common/Loading";

const CommentContainer = () => {
  // state 관리
  const [commentPage, setCommentPage] = useState(1);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 프로젝트 불러오기 기능
  const getComments = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    setTimeout(() => {
      const newPosts = dummyComments.slice(
        (commentPage - 1) * 4,
        commentPage * 4,
      ); // 페이지당 4개씩 로드
      setComments((prevPosts) => [...prevPosts, ...newPosts]);
      setCommentPage((prevPage) => prevPage + 1);
      setIsLoading(false);
    }, 1000); // 1초 지연 후 데이터 추가
  }, [isLoading, commentPage]);

  useEffect(() => {
    getComments();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        getComments();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [getComments]);

  // 댓글 총 개수
  const count = dummyComments.length;

  return (
    <CommentContainerWrapper>
      <TitleWrapper>
        <Title>댓글</Title>
        <Count>총 {count}개</Count>
      </TitleWrapper>
      <InputWrapper>
        <StyledProfileImg src={ProfileImg} alt="profile image" />
        <StyledInput placeholder="댓글을 작성해주세요" />
      </InputWrapper>

      {/* 댓글 */}
      {comments.map((comment) => (
        <Comment
          key={comment.commentId}
          writer={comment.commentWriter}
          content={comment.commentContent}
          userProfileImg={comment.commentUserProfileImg}
          time={comment.commentTime}
        />
      ))}
      {isLoading && <Loading />}
    </CommentContainerWrapper>
  );
};

export default CommentContainer;

/* CSS */
const CommentContainerWrapper = styled.div`
  width: 100%;
  font-size: 0.85em;
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  margin-right: 1em;
  color: #161a3f;
  font-size: 1.25em;
  font-weight: 800;
`;

const Count = styled.div`
  color: #a2a3b2;
  font-weight: bold;
`;

const InputWrapper = styled.div`
  margin: 1.5em 0;
  width: 100%;
  display: flex;
  align-items: center;
`;

const StyledProfileImg = styled.img`
  width: 2.6038em;
  height: 2.6038em;
`;

const StyledInput = styled.input`
  margin-left: 1.5em;
  padding-left: 1em;
  border: 1px solid #a2a3b2;
  border-radius: 10px;
  width: 100%;
  height: 3.0147em;
  background-color: rgba(217, 217, 217, 0);
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #a2a3b2;
    font-size: 0.95em;
  }
  font-family: "NanumSquareNeo";
`;
