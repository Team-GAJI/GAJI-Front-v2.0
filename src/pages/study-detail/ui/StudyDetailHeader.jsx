import React, { useState } from "react";
import styled from "styled-components";
import ReportCheck from "../../../assets/icons/studyDetail/reportCheck.svg?react";
import StudyPostWriterInfo from "./StudyPostWriterInfo";
import BackgroundImage from "../../../assets/images/community/communityBackground.png";
import UserProfileImg from "../../../assets/images/community/userProfile.png";
import BookMarkIcon from "../../../assets/icons/communityPost/postBookMark.svg?react";
import LikeIcon from "../../../assets/icons/communityPost/postLike.svg?react";
import ReportIcon from "../../../assets/icons/communityPost/postReport.svg?react";
// import ThumbNailImg from "../../../assets/images/studyDetail/thumbNailImg.png";
import ReportModal from "./ReportModal";
import { ContentWrapper } from "../../../components/common/MediaWrapper";
import { studyRecruitAPI } from "../api/studyRecruitAPI";
import { useNavigate } from "react-router-dom";

// 세자리마다 콤마 기능
// const formatNumberWithCommas = (number) => {
//     return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// };

const StudyDetailHeader = ({
  roomId,
  title,
  bookmarkCnt,
  bookmarkStatus,
  views,
  nickName,
  category,
  imageUrl,
  likeCnt,
  likeStatus,
  recruitPostTypeEnum,
  userActive,
  userActiveColor,
  commentCount,
  onInteraction,
}) => {
  const [isWriterInfoVisible, setIsWriterInfoVisible] = useState(false);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [isReportNoticeVisible, setIsReportNoticeVisible] = useState(false);

  const showWriterInfo = () => setIsWriterInfoVisible(true);
  const hideWriterInfo = () => setIsWriterInfoVisible(false);

  const showReportModal = () => setIsReportModalVisible(true);
  const hideReportModal = () => setIsReportModalVisible(false);

  const showReportNotice = () => {
    setIsReportNoticeVisible(true);
    setTimeout(() => {
      setIsReportNoticeVisible(false);
    }, 2000);
  };

  const navigate = useNavigate();
  // 스터디 가지기 기능
  const handleRecruit = async () => {
    try {
      const result = await studyRecruitAPI(roomId);
      console.log(result);
      navigate("/mypage");
    } catch (error) {
      console.error("스터디 생성 중 오류 발생:", error);
      alert(error.response.data.message);
      // 필요에 따라 오류 처리 로직을 추가할 수 있습니다.
    }
  };

  return (
    <HeaderWrapper>
      <ContentWrapper>
        <RowWrapper>
          <ReportNoticeWrapper isVisible={isReportNoticeVisible}>
            <ReportNotice>
              <StyledReportCheck />
              신고가 완료되었습니다
            </ReportNotice>
          </ReportNoticeWrapper>

          <TitleWrapper>
            <TitleDetail>
              <Wrapper>
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
                  {nickName}
                </Writer>
              </Wrapper>
              <StyledBar>|</StyledBar>
              2024.03.01
              <Wrapper>
                <StyledBar>|</StyledBar>
                조회 {views}
                <StyledBar>|</StyledBar>
                댓글 {commentCount}
              </Wrapper>
            </TitleDetail>

            <PostWriterInfoWrapper
              isVisible={isWriterInfoVisible}
              onMouseEnter={showWriterInfo}
              onMouseLeave={hideWriterInfo}
            >
              <StudyPostWriterInfo
                nickName={nickName}
                userActive={userActive}
                userActiveColor={userActiveColor}
              />
            </PostWriterInfoWrapper>

            <Title>{title}</Title>
            <Category>{category}</Category>
            <InteractionWrapper>
              <JoinButton onClick={() => handleRecruit()}>
                스터디 가지기
              </JoinButton>
              <BookMarkWrapper>
                <StyledBookMarkIcon
                  onClick={() => onInteraction("bookmark")}
                  isActive={bookmarkStatus}
                />
                <InteractionText>{bookmarkCnt}</InteractionText>
              </BookMarkWrapper>
              <BookMarkWrapper>
                <StyledLikeIcon
                  onClick={() => onInteraction("like")}
                  isActive={likeStatus}
                />
                <InteractionText>{likeCnt}</InteractionText>
              </BookMarkWrapper>
              <BookMarkWrapper>
                <StyledReportIcon onClick={showReportModal} />
                <InteractionText>신고</InteractionText>
              </BookMarkWrapper>

              <ReportModal
                isVisible={isReportModalVisible}
                onClose={hideReportModal}
                onReport={showReportNotice}
                title={title}
              />
            </InteractionWrapper>
          </TitleWrapper>

          <HeaderRightWrapper>
            <PostStateButton>{recruitPostTypeEnum}</PostStateButton>
            <ThumbNailImgWrapper imageUrl={imageUrl} />
          </HeaderRightWrapper>
        </RowWrapper>
      </ContentWrapper>
    </HeaderWrapper>
  );
};

export default StudyDetailHeader;

/* CSS */

const Wrapper = styled.div`
  display: flex;
`;

const RowWrapper = styled.div`
  display: flex;
  width: 100%;
`;
const HeaderWrapper = styled.div`
  width: 100%;
  height: 16.1875em;
  background-image: url(${BackgroundImage});
  background-size: cover;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8125em;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ReportNoticeWrapper = styled.div`
  display: flex;
  justify-content: center;
  top: 1em;
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
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -10%);
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
  width: 50%;
`;

const TitleDetail = styled.div`
  display: flex;
  color: #d0d1d9;
  font-size: 0.8125em;
  line-height: 1.5em;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StyledUserProfileImg = styled.img`
  padding-right: 0.6em;
  width: 1;
  height: 1.55em;
  cursor: pointer;
`;

const Writer = styled.div`
  color: #8e59ff;
  cursor: pointer;
`;

const StyledBar = styled.div`
  margin: 0 0.7em 0 0.7em;
  @media (max-width: 768px) {
    display: none;
  }
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
  width: 25em;
  color: #8e59ff;
  font-size: 2em;
  font-weight: 800;
  word-wrap: break-word;
`;

const Category = styled.div`
  margin-right: 0.7em;
  padding: 0 0.8em;
  border: solid 1.3px #8e59ff;
  border-radius: 15px;
  height: 1.5em;
  line-height: 1.5em;
  color: #8e59ff;
  font-weight: bold;
  text-align: center;
  display: inline-block;
  white-space: nowrap;
`;

const InteractionWrapper = styled.div`
  margin-top: 0.5em;
  display: flex;
  text-align: center;
  align-items: center;
`;

const JoinButton = styled.div`
  border-radius: 10px;
  width: 15.3125em;
  height: 2.3125em;
  line-height: 2.3015em;
  background-color: #8e59ff;
  color: white;
  font-size: 1.2308em;
  font-weight: bold;
  display: flex;
  justify-content: center;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0.2em 1em rgba(22, 26, 63, 0.2);
  }
  transition: all 0.3s ease;
  @media (max-width: 768px) {
    width: 11em;
    font-size: 0.8125em;
  }
`;

const BookMarkWrapper = styled.div`
  margin: 0.5em 0 0 1em;
  width: 2.2em;
  font-size: 1.2em;
`;

const StyledBookMarkIcon = styled(BookMarkIcon)`
  margin-bottom: 0.1em;
  width: 1em;
  height: 1.3125em;
  cursor: pointer;
  fill: ${(props) => (props.isActive ? "#8E59FF" : "none")};
`;
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

const InteractionText = styled.div`
  color: #d0d1d9;
  font-size: 0.6875em;
`;

const HeaderRightWrapper = styled.div`
  width: 50%;
  color: white;
  text-align: center;
  display: flex;
`;

const PostStateButton = styled.div`
  border-radius: 10px;
  margin: 2em 3em 0 0;
  width: 9.6923em;
  height: 2.3015em;
  line-height: 2.3015em;
  background-color: #8e59ff;
  font-weight: bold;
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    width: 6em;
    font-size: 0.8125em;
  }
`;

const ThumbNailImgWrapper = styled.div`
  border: 1px solid #d0d1d9;
  border-radius: 10px;
  width: 100%;
  height: 13.125em;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
`;
