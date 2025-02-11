import React, { useState, useEffect } from "react";
import styled from "styled-components";
import StudyDetailHeader from "./ui/StudyDetailHeader";
import StudyLinkEmbed from "./ui/StudyLinkEmbed";
import StudyCommentContainer from "./ui/StudyCommentContainer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import HeightLine from "../../assets/icons/studyDetail/heightLine.svg?react";
import { useLocation } from "react-router-dom";
import { ContentWrapper } from "../../components/common/MediaWrapper";
import {
  studyAddLike,
  studyRemoveLike,
  studyAddBookmark,
  studyRemoveBookmark,
} from "./api/studyInteraction";
import { studyDetailAPI } from "./api/studyDetailAPI";

const StudyDetailPage = () => {
  const location = useLocation();
  const { studyDetail } = location.state || {};
  const { roomId } = location.state;
  // 북마크, 좋아요
  const [bookMarkState, setBookMarkState] = useState(
    studyDetail.bookmarkStatus,
  );
  const [likeState, setLikeState] = useState(studyDetail.likeStatus);
  const [bookMarkCount, setBookMarkCount] = useState(studyDetail.bookmarkCnt);
  const [likeCount, setLikeCount] = useState(studyDetail.likeCnt);

  // 댓글 개수
  const [commentCount, setCommentCount] = useState(0);

  // 날짜 형식을 변환하는 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // 월은 1부터 시작하므로 1을 더함
    const day = date.getDate();
    return `${month}월 ${day}일`;
  };

  // 새로고침 시 게시물 정보 다시 가져오기
  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const postDetail = await studyDetailAPI(roomId);

        setLikeState(postDetail.likeStatus); // 서버로부터 좋아요 상태를 가져와 설정
        setLikeCount(postDetail.likeCnt); // 좋아요 개수 설정
        setBookMarkState(postDetail.bookmarkStatus); // 서버로부터 북마크 상태를 가져와 설정
        setBookMarkCount(postDetail.bookmarkCnt); // 북마크 개수 설정
      } catch (error) {
        console.error("게시물 정보를 불러오는 중 오류 발생:", error);
      }
    };

    fetchPostDetail(); // fetchPostDetail 호출하여 데이터 가져오기
  }, [roomId]);

  // 북마크, 좋아요 기능
  const handleInteraction = async (type) => {
    try {
      if (type === "bookmark") {
        if (bookMarkState) {
          await studyRemoveBookmark(roomId); // 북마크 취소
          setBookMarkState(false);
          setBookMarkCount((prevCount) => prevCount - 1);
        } else {
          await studyAddBookmark(roomId); // 북마크 추가
          setBookMarkState(true);
          setBookMarkCount((prevCount) => prevCount + 1);
        }
      } else if (type === "like") {
        if (likeState) {
          await studyRemoveLike(roomId); // 좋아요 취소
          setLikeState(false);
          setLikeCount((prevCount) => prevCount - 1);
        } else {
          await studyAddLike(roomId); // 좋아요 추가
          setLikeState(true);
          setLikeCount((prevCount) => prevCount + 1);
        }
      }
    } catch (error) {
      console.error(
        `${type} 처리 중 오류 발생:`,
        error.response ? error.response.data : error.message,
      );

      // 오류 발생 시 상태 복구
      if (type === "bookmark") {
        setBookMarkState((prev) => !prev);
        setBookMarkCount((prevCount) =>
          bookMarkState ? prevCount + 1 : prevCount - 1,
        );
      } else if (type === "like") {
        setLikeState((prev) => !prev);
        setLikeCount((prevCount) =>
          likeState ? prevCount + 1 : prevCount - 1,
        );
      }
    }
  };

  return (
    <>
      {studyDetail && (
        <>
          {/* 페이지 헤더 */}
          <StudyDetailHeader
            roomId={roomId}
            title={studyDetail.studyTitle}
            bookmarkCnt={bookMarkCount}
            bookmarkStatus={bookMarkState}
            views={studyDetail.views}
            nickName={studyDetail.userNickName}
            category={studyDetail.studyCategory || "카테고리 없음"}
            imageUrl={studyDetail.imageUrl}
            likeCnt={likeCount}
            likeStatus={likeState}
            recruitPostTypeEnum={
              studyDetail.recruitPostTypeEnum === "RECRUITING"
                ? "모집 중"
                : "모집 완료"
            }
            userActive={
              studyDetail.userActive === "ACTIVE" ? "활동중" : "자리비움"
            }
            userActiveColor={
              studyDetail.userActive === "ACTIVE" ? "#A8FEA1" : "grey"
            }
            commentCount={commentCount} // 댓글 개수
            onInteraction={handleInteraction} // 상호작용 함수
          />

          {/* 게시글 정보 */}
          <ContentWrapper>
            {/* 기간 영역 */}
            <PeriodContainer>
              <PeriodWrapper>
                <SubTitle>모집 기간</SubTitle>
                <Period>
                  {`${formatDate(studyDetail.recruitStartTime)} - ${formatDate(studyDetail.recruitEndTime)}`}
                </Period>
              </PeriodWrapper>
              <RightPeriodWrapper>
                <StyledHeightLine />
                <PeriodWrapper>
                  <SubTitle>스터디 진행 기간</SubTitle>
                  <Period>
                    {`${formatDate(studyDetail.studyStartTime)} - ${formatDate(studyDetail.studyEndTime)}`}
                  </Period>
                </PeriodWrapper>
              </RightPeriodWrapper>
            </PeriodContainer>
            <StyledHr />

            {/* 스터디 자료 */}
            {studyDetail.materialList &&
              studyDetail.materialList.length > 0 && (
                <>
                  <StudyDataWrapper>
                    <SubTitle>스터디 자료</SubTitle>
                    <LinkEmbedWrapper>
                      {studyDetail.materialList.map((material, index) => (
                        <StudyLinkEmbed key={index} link={material} />
                      ))}
                    </LinkEmbedWrapper>
                  </StudyDataWrapper>
                  <StyledHr />
                </>
              )}

            {/* 게시글 본문 */}
            <StyledContentWrapper>
              <SubTitle>스터디 설명</SubTitle>
              <PostContentWrapper>
                <PostContent>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {studyDetail.description}
                  </ReactMarkdown>
                </PostContent>
              </PostContentWrapper>
            </StyledContentWrapper>

            <StyledHr />
            {/* 댓글 영역 */}
            {/* <StudyCommentContainer
              roomId={roomId}
              type="study"
              setCommentCount={setCommentCount}
            /> */}
          </ContentWrapper>
        </>
      )}
    </>
  );
};

export default StudyDetailPage;

const PeriodContainer = styled.div`
  margin-top: 1.5em;
  width: 100%;
  display: flex;
  align-items: center;
`;

const PeriodWrapper = styled.div`
  width: 100%;
`;

const SubTitle = styled.div`
  margin-bottom: 1em;
  color: #8e59ff;
  font-weight: 800;
  width: 100%;
`;

const Period = styled.div`
  color: #161a3f;
  font-size: 0.8125em;
  font-weight: bold;
`;

const RightPeriodWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const StyledHeightLine = styled(HeightLine)`
  margin-right: 3.2em;
`;

const StudyDataWrapper = styled.div`
  width: 100%;
`;

const LinkEmbedWrapper = styled.div`
  padding-bottom: 1em;
  width: 100%;
  display: flex;
  // 스크롤
  overflow-x: auto;
  &::-webkit-scrollbar {
    height: 8px;
    background: none;
  }
  &:hover::-webkit-scrollbar-thumb {
    width: 1px;
    border-radius: 30px;
    background-color: rgb(142, 89, 255, 0.5);
  }
`;

const StyledContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const PostContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostContent = styled.div`
  margin: 0 0 1.5em 0;
  width: 100%;
  min-height: 22em;
  color: #161a3f;
`;

const StyledHr = styled.hr`
  margin: 1.5em 0;
  border: none;
  width: 100%;
  height: 1.5px;
  background-color: rgba(162, 163, 178, 0.4);
`;
