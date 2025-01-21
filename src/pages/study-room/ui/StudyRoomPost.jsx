import React, { useState } from "react";
import styled from "styled-components";
import ReportCheck from "../assets/icons/studyDetail/reportCheck.svg?react";
import PostWriterInfo from "../components/communityPost/PostWriterInfo";
import BackgroundImage from "../assets/images/community/communityBackground.png";
import UserProfileImg from "../assets/images/community/userProfile.png";
import BookMarkIcon from "../assets/icons/communityPost/postBookMark.svg?react";
import LikeIcon from "../assets/icons/communityPost/postLike.svg?react";
import ReportIcon from "../assets/icons/communityPost/postReport.svg?react";
// import ExtraPostPreview from "../components/communityPost/ExtraPostPreview";
import CommentContainer from "../components/communityPost/CommentContainer";
import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ReportModal from "../components/studyDetail/ReportModal";
import { ContentWrapper } from "../components/common/MediaWrapper";
import PageHeader from "../components/common/PageHeader";

// 세자리마다 콤마 기능
// const formatNumberWithCommas = (number) => {
//   return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// };

const StudyRoomPost = () => {
  // 게시글 작성에서 정보 가져오기
  const location = useLocation();
  const { postData } = location.state || {};
  const { roomId } = location.state || {};

  const navigate = useNavigate();
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);

  // state 관리
  const [bookMarkState, setBookMarkState] = useState(false);
  const [likeState, setLikeState] = useState(false);
  const [bookMarkCount, setBookMarkCount] = useState(postData.bookmarkCnt);
  const [likeCount, setLikeCount] = useState(postData.likeCnt);
  const [isWriterInfoVisible, setIsWriterInfoVisible] = useState(false);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [isReportNoticeVisible, setIsReportNoticeVisible] = useState(false);

  // 북마크, 좋아요 기능
  const handleBookMark = () => {
    if (bookMarkState) {
      setBookMarkState(false);
      setBookMarkCount((prevCount) => prevCount - 1);
    } else {
      setBookMarkState(true);
      setBookMarkCount((prevCount) => prevCount + 1);
    }
  };
  const handleLike = () => {
    if (likeState) {
      setLikeState(false);
      setLikeCount((prevCount) => prevCount - 1);
    } else {
      setLikeState(true);
      setLikeCount((prevCount) => prevCount + 1);
    }
  };

  // 작성자 정보 모달 기능
  const showWriterInfo = () => setIsWriterInfoVisible(true);
  const hideWriterInfo = () => setIsWriterInfoVisible(false);

  // 신고 모달 기능
  const showReportModal = () => setIsReportModalVisible(true);
  const hideReportModal = () => setIsReportModalVisible(false);

  // 신고 확인 메시지
  const showReportNotice = () => {
    setIsReportNoticeVisible(true);
    setTimeout(() => {
      setIsReportNoticeVisible(false);
    }, 2000);
  };

  const headerTitles = [
    "스터디 홈",
    "트러블 슈팅 게시판",
    "정보나눔 게시판",
    "채팅방",
  ];
  const handleHeaderButtonClick = (index) => {
    setActiveButtonIndex(index);
    if (index === 0) {
      navigate("/studyroom", { state: { roomId: roomId } });
    } else if (index === 1) {
      navigate("/troubleshooting", { state: { roomId: roomId } });
    } else {
      navigate("/");
    }
  };

  return (
    <>
      {postData && (
        <>
          <PageHeader
            large={true}
            pageTitle="스터디룸"
            headerTitles={headerTitles}
            activeButtonIndex={activeButtonIndex}
            onButtonClick={handleHeaderButtonClick}
            changeColorOnClick={true}
            changeColorOnHover={true}
          />

          {/* 헤더 */}
          <HeaderWrapper>
            {/* 신고 알림 */}
            <ReportNoticeWrapper isVisible={isReportNoticeVisible}>
              <ReportNotice>
                <StyledReportCheck />
                신고가 완료되었습니다
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
                  {postData.userNickname}
                </Writer>
                <StyledBar>|</StyledBar>
                {postData.type} &gt; {postData.category}
                <StyledBar>|</StyledBar>
                {postData.createdAt}
                <StyledBar>|</StyledBar>
                조회 {postData.hit}
                <StyledBar>|</StyledBar>
                댓글 {postData.commentCnt}
              </TitleDetail>

              {/* 작성자 정보 모달창 */}
              <PostWriterInfoWrapper
                isVisible={isWriterInfoVisible}
                onMouseEnter={showWriterInfo}
                onMouseLeave={hideWriterInfo}
              >
                <PostWriterInfo nickName={postData.userNickname} />
              </PostWriterInfoWrapper>

              {/* 게시글 제목 */}
              <Title>{postData.title}</Title>

              {/* 게시글 해시태그 */}
              {postData.hashtagList && postData.hashtagList.length > 0 && (
                <>
                  <HashtagWrapper>
                    {postData.hashtagList.map((hashtag, index) => (
                      <Hashtag key={index}>#{hashtag.hashtagName}</Hashtag>
                    ))}
                  </HashtagWrapper>
                </>
              )}

              {/* 게시글 상호작용 */}
              <InteractionWrapper>
                <BookMarkWrapper>
                  <StyledBookMarkIcon
                    onClick={handleBookMark}
                    bookMarkState={bookMarkState}
                  />
                  <InteractionText>{bookMarkCount}</InteractionText>
                </BookMarkWrapper>
                <BookMarkWrapper>
                  <StyledLikeIcon onClick={handleLike} likeState={likeState} />
                  <InteractionText>{likeCount}</InteractionText>
                </BookMarkWrapper>
                <BookMarkWrapper>
                  <StyledReportIcon onClick={showReportModal} />
                  <InteractionText>신고</InteractionText>
                </BookMarkWrapper>

                {/* 신고 모달창 */}
                <ReportModal
                  isVisible={isReportModalVisible}
                  onClose={hideReportModal}
                  onReport={showReportNotice}
                  title={postData.title}
                />
              </InteractionWrapper>
            </TitleWrapper>
          </HeaderWrapper>

          <ContentWrapper>
            {/* 게시글 내용 */}
            <PostContentWrapper>
              {/* 게시글 본문 */}
              <PostContent>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {postData.body}
                </ReactMarkdown>
              </PostContent>

              {/* 다음 게시물 div */}
              {/* <ExtraPostsWrapper>
            <ExtraPostPreview />
            <ExtraPostPreview />
            </ExtraPostsWrapper> */}

              <StyledHr />
              {/* 댓글 영역 */}
              <CommentContainer />
            </PostContentWrapper>
          </ContentWrapper>
        </>
      )}
    </>
  );
};

export default StudyRoomPost;

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

const StyledBookMarkIcon = styled(BookMarkIcon)`
  margin-bottom: 0.1em;
  width: 1em;
  height: 1.3125em;
  cursor: pointer;
  fill: ${(props) => (props.bookMarkState ? "#8E59FF" : "none")};
`;
const StyledLikeIcon = styled(LikeIcon)`
  margin-bottom: 0.1em;
  width: 1.375em;
  height: 1.25em;
  cursor: pointer;
  fill: ${(props) => (props.likeState ? "#8E59FF" : "none")};
`;
const StyledReportIcon = styled(ReportIcon)`
  margin-bottom: 0.1em;
  width: 1.5em;
  height: 1.25em;
  cursor: pointer;
`;

const InteractionText = styled.div`
  color: #d0d1d9;
  font-size: 0.6875em;
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
