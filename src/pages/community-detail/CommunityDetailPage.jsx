import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReportCheck from "../../assets/icons/studyDetail/reportCheck.svg?react";
import PostWriterInfo from "./ui/PostWriterInfo";
import BackgroundImage from "../../assets/images/community/communityBackground.png";
import UserProfileImg from "../../assets/images/community/userProfile.png";
// import BookMarkIcon from "../../assets/icons/communityPost/postBookMark.svg?react";
import ShareIcon from "../../assets/icons/communityPost/postShare.svg?react";
import LikeIcon from "../../assets/icons/communityPost/postLike.svg?react";
import ReportIcon from "../../assets/icons/communityPost/postReport.svg?react";
import DownArrowIcon from "../../assets/icons/communityPost/whiteDownArrow.svg?react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ReportModal from "../study-detail/ui/ReportModal";
import { ContentWrapper } from "../../components/common/MediaWrapper";
import StudyCommentContainer from "../study-detail/ui/StudyCommentContainer";
import {
  communityAddLike,
  communityRemoveLike,
  communityAddBookmark,
  communityRemoveBookmark,
} from "./api/communityInteractionAPI";
import { communityPostAPI } from "./api/communityPostAPI";

// 세자리마다 콤마 기능
// const formatNumberWithCommas = (number) => {
//   return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// };

const CommunityDetailPage = () => {
  const { postId } = useParams();
  // state 관리
  const [postDetail, setPostDetail] = useState(null);
  const [bookMarkState, setBookMarkState] = useState(false);
  const [likeState, setLikeState] = useState(false);
  const [bookMarkCount, setBookMarkCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [isWriterInfoVisible, setIsWriterInfoVisible] = useState(false);
  const [isOptionVisible, setIsOptionVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [isReportNoticeVisible, setIsReportNoticeVisible] = useState(false);
  const [isShareNoticeVisible, setIsShareNoticeVisible] = useState(false);

  // 댓글 개수
  const [commentCount, setCommentCount] = useState(0);

  // 새로고침 시 게시물 정보 다시 가져오기
  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const postDetail = await communityPostAPI(postId);
        setPostDetail(postDetail);
        setLikeState(postDetail.likeStatus); // 서버로부터 좋아요 상태를 가져와 설정
        setLikeCount(postDetail.likeCnt); // 좋아요 개수 설정
        setBookMarkState(postDetail.bookMarkStatus); // 서버로부터 북마크 상태를 가져와 설정
        setBookMarkCount(postDetail.bookmarkCnt); // 북마크 개수 설정
        setSelectedOption(postDetail.status);
      } catch (error) {
        console.error("게시물 정보를 불러오는 중 오류 발생:", error);
      }
    };

    fetchPostDetail(); // fetchPostDetail 호출하여 데이터 가져오기
  }, [postId]);

  // 북마크, 좋아요 기능
  const handleInteraction = async (type) => {
    try {
      if (type === "bookmark") {
        if (bookMarkState) {
          await communityRemoveBookmark(postId); // 북마크 취소
          setBookMarkState(false);
          setBookMarkCount((prevCount) => prevCount - 1);
        } else {
          await communityAddBookmark(postId); // 북마크 추가
          setBookMarkState(true);
          setBookMarkCount((prevCount) => prevCount + 1);
        }
      } else if (type === "like") {
        if (likeState) {
          await communityRemoveLike(postId); // 좋아요 취소
          setLikeState(false);
          setLikeCount((prevCount) => prevCount - 1);
        } else {
          await communityAddLike(postId); // 좋아요 추가
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

  // 게시글 상태 버튼 텍스트
  const toggleOptionVisibility = () => {
    setIsOptionVisible(!isOptionVisible);
  };

  // 게시글 상태 옵션 선택
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOptionVisible(false);
  };

  // 작성자 정보 모달 기능
  const showWriterInfo = () => setIsWriterInfoVisible(true);
  const hideWriterInfo = () => setIsWriterInfoVisible(false);

  // 신고 모달 기능
  const showReportModal = () => setIsReportModalVisible(true);
  const hideReportModal = () => setIsReportModalVisible(false);

  // 신고 완료 모달 함수
  const showReportNotice = () => {
    setIsReportNoticeVisible(true);
    setTimeout(() => {
      setIsReportNoticeVisible(false);
    }, 2000);
  };

  // 공유 완료 모달 함수
  const baseUrl = "http://localhost:3000";
  const showShareNotice = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      setIsShareNoticeVisible(true);
      setTimeout(() => {
        setIsShareNoticeVisible(false);
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {postDetail && (
        <>
          {/* 헤더 */}
          <HeaderWrapper>
            {/* 신고 완료 모달 */}
            <ReportNoticeWrapper isVisible={isReportNoticeVisible}>
              <ReportNotice>
                <StyledReportCheck />
                신고가 완료되었습니다
              </ReportNotice>
            </ReportNoticeWrapper>

            {/* 공유 완료 모달 */}
            <ReportNoticeWrapper isVisible={isShareNoticeVisible}>
              <ReportNotice>
                <StyledReportCheck />
                주소가 복사되었습니다
              </ReportNotice>
            </ReportNoticeWrapper>

            {/* 제목 div */}
            <TitleWrapper>
              {/* 게시글 상세정보 */}
              <TitleDetail>
                <StyledUserProfileImg
                  onMouseEnter={showWriterInfo}
                  onMouseLeave={hideWriterInfo}
                  src={UserProfileImg}
                  alt="user profile"
                />
                <Writer
                  onMouseEnter={showWriterInfo}
                  onMouseLeave={hideWriterInfo}
                >
                  {postDetail.userNickname}
                </Writer>
                <StyledBar>|</StyledBar>
                {postDetail.type} &gt; {postDetail.category}
                <StyledBar>|</StyledBar>
                {postDetail.createdAt}
                <StyledBar>|</StyledBar>
                조회 {postDetail.hit}
                <StyledBar>|</StyledBar>
                댓글 {commentCount}
              </TitleDetail>

              {/* 작성자 정보 모달창 */}
              <PostWriterInfoWrapper
                isVisible={isWriterInfoVisible}
                onMouseEnter={showWriterInfo}
                onMouseLeave={hideWriterInfo}
              >
                <PostWriterInfo nickName={postDetail.userNickname} />
              </PostWriterInfoWrapper>

              {/* 게시글 제목 */}
              <Title>{postDetail.title}</Title>

              {/* 게시글 해시태그 */}
              {postDetail.hashtagList && postDetail.hashtagList.length > 0 && (
                <>
                  <HashtagWrapper>
                    {postDetail.hashtagList.map((hashtag, index) => (
                      <Hashtag key={index}>#{hashtag.hashtagName}</Hashtag>
                    ))}
                  </HashtagWrapper>
                </>
              )}

              {/* 게시글 상호작용 */}
              <InteractionWrapper>
                {/* <BookMarkWrapper>
                  <StyledBookMarkIcon
                    onClick={() => handleInteraction("bookmark")}
                    isActive={bookMarkState}
                  />
                  <InteractionText>{bookMarkCount}</InteractionText>
                </BookMarkWrapper> */}
                <BookMarkWrapper>
                  <StyledLikeIcon
                    onClick={() => handleInteraction("like")}
                    isActive={likeState}
                  />
                  <InteractionText>{likeCount}</InteractionText>
                </BookMarkWrapper>
                <BookMarkWrapper>
                  <StyledReportIcon onClick={showReportModal} />
                  <InteractionText>신고</InteractionText>
                </BookMarkWrapper>
                <BookMarkWrapper>
                  <StyledShareIcon
                    onClick={() =>
                      showShareNotice(`${baseUrl}${location.pathname}`)
                    }
                  />
                  <InteractionText>공유</InteractionText>
                </BookMarkWrapper>

                {/* 신고 모달창 */}
                <ReportModal
                  isVisible={isReportModalVisible}
                  onClose={hideReportModal}
                  onReport={showReportNotice}
                  title={postDetail.title}
                />
              </InteractionWrapper>
            </TitleWrapper>

            {/* 게시글 상태 div */}
            <PostStateWrapper>
              {/* 작성자일 경우 상태버튼 */}
              {postDetail.writer && selectedOption !== "블로그" ? (
                <>
                  <PostStateButton
                    onClick={toggleOptionVisibility}
                    writerTrue={postDetail.writer}
                    selectedOption={selectedOption}
                  >
                    {selectedOption}
                    <StyledDownArrowIcon isVisible={isOptionVisible} />
                  </PostStateButton>
                  {/* 상태 옵션 */}
                  <PostStateOptionWrapper isVisible={isOptionVisible}>
                    {/* 모집중 / 모집완료일 경우 */}
                    {["모집중", "모집완료"].includes(selectedOption) && (
                      <>
                        <PostStateOption
                          onClick={() => handleOptionSelect("모집중")}
                          isSelected={selectedOption === "모집중"}
                        >
                          모집 중
                        </PostStateOption>
                        <PostStateOption
                          onClick={() => handleOptionSelect("모집완료")}
                          isSelected={selectedOption === "모집완료"}
                        >
                          모집 완료
                        </PostStateOption>
                      </>
                    )}
                    {/* 미완료질문 / 완료질문일 경우 */}
                    {["미완료질문", "완료질문"].includes(selectedOption) && (
                      <>
                        <PostStateOption
                          onClick={() => handleOptionSelect("미완료질문")}
                          isSelected={selectedOption === "미완료질문"}
                        >
                          미완료 질문
                        </PostStateOption>
                        <PostStateOption
                          onClick={() => handleOptionSelect("완료질문")}
                          isSelected={selectedOption === "완료질문"}
                        >
                          완료 질문
                        </PostStateOption>
                      </>
                    )}
                  </PostStateOptionWrapper>
                </>
              ) : (
                // 작성자 아닐 경우 상태버튼 또는 블로그일 경우
                <PostStateButton
                  onClick={toggleOptionVisibility}
                  writerTrue={postDetail.writer}
                  selectedOption={selectedOption}
                >
                  {selectedOption}
                </PostStateButton>
              )}
            </PostStateWrapper>
          </HeaderWrapper>

          <ContentWrapper>
            {/* 게시글 내용 */}
            <PostContentWrapper>
              {/* 게시글 본문 */}
              <PostContent>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {postDetail.body}
                </ReactMarkdown>
              </PostContent>

              {/* 다음 게시물 div */}
              {/* <ExtraPostsWrapper>
          <ExtraPostPreview />
          <ExtraPostPreview />
        </ExtraPostsWrapper> */}

              <StyledHr />
              {/* 댓글 영역 */}
              {/* <CommentContainer /> */}
              <StudyCommentContainer
                postId={postId}
                type="community"
                setCommentCount={setCommentCount}
              />
            </PostContentWrapper>
          </ContentWrapper>
        </>
      )}
    </>
  );
};

export default CommunityDetailPage;

/* CSS */
const HeaderWrapper = styled.div`
  padding-left: 10%;
  padding-right: 10%;
  height: 16.1875em;
  background-image: url(${BackgroundImage});
  background-size: cover;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8125em;
  box-sizing: border-box;
  @media (max-width: 768px) {
    padding-left: 5%;
    padding-right: 5%;
    flex-direction: column;
    gap: 1em;
    align-items: flex-start;
  }
`;

const ReportNoticeWrapper = styled.div`
  width: 86.17em;
  display: flex;
  justify-content: center;
  position: fixed;
  left: 50%;
  top: 10%;
  transform: translate(-50%, -10%);

  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: all 0.3s ease;
`;

const ReportNotice = styled.div`
  border-radius: 10px;
  width: 14em;
  height: 2.3077em;
  background-color: white;
  color: #8e59ff;
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0.25em 1.25em rgba(22, 26, 63, 0.2);
`;

const StyledReportCheck = styled(ReportCheck)`
  margin-right: 0.5em;
  width: 1em;
  height: 1em;
`;

const TitleWrapper = styled.div`
  width: 80%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TitleDetail = styled.div`
  display: flex;
  color: #d0d1d9;
  font-size: 0.8125em;
  line-height: 1.5em;
`;

const StyledUserProfileImg = styled.img`
  padding-right: 0.6em;
  width: 1.5em;
  height: 1.55em;
  cursor: pointer;
`;

const Writer = styled.div`
  color: #8e59ff;
  cursor: pointer;
`;

const StyledBar = styled.div`
  margin: 0 0.7em 0 0.7em;
`;

const PostWriterInfoWrapper = styled.div`
  width: 41em;
  height: 11em;
  position: absolute;
  z-index: 2;
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: all 0.3s ease;
`;

const Title = styled.div`
  margin: 0.8em 0 0.5em 0;
  width: 100%;
  color: #8e59ff;
  font-size: 2em;
  font-weight: 800;
  word-wrap: break-word;
`;

const HashtagWrapper = styled.div`
  display: flex;
`;

const Hashtag = styled.div`
  margin-right: 0.7em;
  padding: 0 1.2em;
  border-radius: 15px;
  height: 1.8182em;
  line-height: 1.8182em;
  background-color: #8e59ff;
  color: white;
  font-size: 0.6875em;
  font-weight: bold;
  text-align: center;
`;

const InteractionWrapper = styled.div`
  display: flex;
  text-align: center;
`;

const BookMarkWrapper = styled.div`
  margin: 1em 1em 0 0;
  width: 2.2em;
  font-size: 1.2em;
`;

// const StyledBookMarkIcon = styled(BookMarkIcon)`
//   margin-bottom: 0.1em;
//   width: 1em;
//   height: 1.3125em;
//   cursor: pointer;
//   fill: ${(props) => (props.isActive ? "#8E59FF" : "none")};
// `;
const StyledLikeIcon = styled(LikeIcon)`
  margin-bottom: 0.1em;
  width: 1.375em;
  height: 1.25em;
  cursor: pointer;
  fill: ${(props) => (props.isActive ? "#8E59FF" : "none")};
`;
const StyledReportIcon = styled(ReportIcon)`
  margin-bottom: 0.1em;
  width: 1.5em;
  height: 1.25em;
  cursor: pointer;
`;
const StyledShareIcon = styled(ShareIcon)`
  margin-bottom: 0.1em;
  width: 1.5em;
  height: 1.25em;
  cursor: pointer;
`;

const InteractionText = styled.div`
  color: #d0d1d9;
  font-size: 0.6875em;
`;

const PostStateWrapper = styled.div`
  color: white;
  width: 11em;
  font-size: 0.8125em;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostStateButton = styled.div`
  border-radius: 8px;
  width: 10em;
  height: 2.4em;
  background-color: #8e59ff;
  font-weight: 800;
  line-height: 2.4em;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) =>
    props.writerTrue && props.selectedOption !== "블로그"
      ? "pointer"
      : "default"};
`;

const StyledDownArrowIcon = styled(DownArrowIcon)`
  margin-left: 0.8em;
  width: 0.9em;
  height: 0.9em;
  transition: all 0.5s ease;
  transform: rotate(${(props) => (props.isVisible ? "-180deg" : "0deg")});
`;

const PostStateOptionWrapper = styled.div`
  margin-top: 0.3em;
  border-radius: 10px;
  width: 100%;
  height: 8em;
  background-color: rgba(22, 26, 63, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: all 0.3s ease;
`;

const PostStateOption = styled.div`
  border: ${(props) => (props.isSelected ? "1px solid #D0D1D9" : "none")};
  border-radius: 10px;
  width: 9.923em;
  height: 2.0769em;
  line-height: 2.0769em;
  cursor: pointer;
  text-align: center;
  color: ${(props) => (props.isSelected ? "white" : "#D0D1D9")};
  font-weight: ${(props) => (props.isSelected ? "bold" : "normal")};
  &:hover {
    color: white;
    font-weight: bold;
  }
`;

const PostContentWrapper = styled.div`
  width: 100%;
  margin-bottom: 2.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostContent = styled.div`
  margin: 1.5em 0;
  width: 100%;
  padding: 1em;
  min-height: 22em;
  color: #161a3f;
  @media (max-width: 768px) {
    padding-left: 5%;
    padding-right: 5%;
  }
`;

// const ExtraPostsWrapper = styled.div`
//   width: 75em;
//   display: flex;
//   justify-content: space-between;
// `;

const StyledHr = styled.hr`
  margin: 2em 0;
  border: none;
  width: 100%;
  height: 1.5px;
  font-size: 0.85em;
  background-color: rgba(162, 163, 178, 0.4);
`;
