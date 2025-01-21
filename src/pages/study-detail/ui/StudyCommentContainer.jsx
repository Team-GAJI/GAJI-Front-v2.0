import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProfileImg from "../../../assets/images/community/userProfile.png";
import StudyComment from "./StudyComment";
// import { dummyStudyComments } from './DummyStudyComments';
// import Loading from '../common/Loading';
import {
  studyWriteCommentAPI,
  studyViewCommentAPI,
} from "../../login/api/commentAPI";
import {
  communityWriteCommentAPI,
  communityViewCommentAPI,
} from "../../login/api/commentAPI";

const StudyCommentContainer = ({ roomId, postId, type, setCommentCount }) => {
  // state 관리
  // const [commentPage, setCommentPage] = useState(1);
  // const [, setComments] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [commentBody, setCommentBody] = useState(""); // 작성 중인 댓글 저장
  const [commentsList, setCommentsList] = useState([]); // 댓글 리스트

  // 댓글 총 개수
  const count = commentsList.length;

  // 댓글 작성 기능
  const handleKeyPress = (e) => {
    if (
      e.key === "Enter" &&
      e.nativeEvent.isComposing === false &&
      !e.shiftKey
    ) {
      // Shift + Enter가 아닌 단순 Enter 입력 시
      e.preventDefault(); // 기본 Enter 동작 방지 (줄바꿈 방지)
      writeComment(); // 댓글 작성 함수 호출
    }
  };
  const handleChange = (e) => {
    setCommentBody(e.target.value); // 입력값을 state에 저장
  };
  const writeComment = async () => {
    try {
      const body = {
        body: commentBody, // 입력된 댓글을 body에 저장
      };
      // type마다 API 호출
      if (type === "study") {
        const result = await studyWriteCommentAPI(roomId, body);
        console.log(result);
      } else if (type === "community") {
        const result = await communityWriteCommentAPI(postId, body);
        console.log(result);
      } else {
        console.log("존재하지 않는 type입니다");
      }
      setCommentBody(""); // 댓글 작성 후 입력 필드 초기화
      location.reload();
    } catch (error) {
      console.error("댓글 작성 중 오류 발생:", error);
      // 필요에 따라 오류 처리 로직을 추가할 수 있습니다.
    }
  };

  // 댓글 불러오기
  useEffect(() => {
    const fetchComments = async () => {
      try {
        // type마다 API 호출
        if (type === "study") {
          const commentsResponse = await studyViewCommentAPI(roomId);
          setCommentsList(commentsResponse);
          setCommentCount(commentsResponse.length);
        } else if (type === "community") {
          const commentsResponse = await communityViewCommentAPI(postId);
          setCommentsList(commentsResponse);
          setCommentCount(commentsResponse.length);
        } else {
          console.log("존재하지 않는 type입니다");
        }
      } catch (error) {
        console.error("스터디 데이터를 불러오는 중 오류 발생:", error);
      }
    };
    fetchComments();
  }, []);

  return (
    <CommentContainerWrapper>
      <TitleWrapper>
        <Title>댓글</Title>
        <Count>총 {count}개</Count>
      </TitleWrapper>
      <InputWrapper>
        <StyledProfileImg src={ProfileImg} alt="profile image" />
        <StyledInput
          placeholder="댓글을 작성해주세요"
          value={commentBody} // 입력 필드에 state 바인딩
          onChange={handleChange} // 입력 시 상태 갱신
          onKeyDown={handleKeyPress} // 엔터 키 입력 감지
        />
      </InputWrapper>

      {/* 댓글 */}
      {commentsList.map((comment) => (
        <StudyComment
          key={comment.commentId}
          writer={comment.userNickName}
          content={comment.commentBody}
          userProfileImg={comment.profileImageUrl}
          time={comment.commentWriteDate}
        />
      ))}
      {/* {isLoading && (
                <Loading />
            )} */}
    </CommentContainerWrapper>
  );
};

export default StudyCommentContainer;

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
