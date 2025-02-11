import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { studyDetailAPI } from "../../study-detail/api/studyDetailAPI";
import ThumbnailLogo from "../../../assets/logos/ThumbnailLogo.svg?react";

const StudyPreview = ({
  key,
  roomId,
  title,
  content,
  background,
  ago,
  dday,
  recruiter,
  state,
  applicant,
  link,
}) => {
  // state 관리
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  // 상세정보 보기 기능
  const showDetail = () => {
    setIsDetailVisible(true);
  };
  const hiddenDetail = () => {
    setIsDetailVisible(false);
  };

  // useNavigate
  const navigate = useNavigate();

  // 스터디 상세보기 버튼
  const handleSubmit = async () => {
    try {
      const studyDetail = await studyDetailAPI(roomId);
      console.log(studyDetail);
      navigate(`/study/detail/${roomId}`);
    } catch (error) {
      console.error("스터디 생성 중 오류 발생:", error);
      // 필요에 따라 오류 처리 로직을 추가할 수 있습니다.
    }
  };

  // 모집중, 모집완료 변환 기능
  const recruitmentState = state === "RECRUITING" ? "모집중" : "모집완료";

  // D-day 변환 기능
  const displayDday = dday === 0 ? "Day" : dday < 0 ? 0 : dday;

  // 기본 썸네일 기능
  const backgroundImage = background;

  return (
    <PostWrapper
      link={link}
      key={key}
      onClick={() => handleSubmit()}
      onMouseOver={() => showDetail()}
      onMouseOut={() => hiddenDetail()}
    >
      <BackgroundWrapper
        background={backgroundImage}
        isVisible={isDetailVisible}
      >
        <StyledThumbnailLogo
          background={backgroundImage}
          isVisible={isDetailVisible}
        />
        <TagWrapper isVisible={isDetailVisible}>
          <Tag>{recruitmentState}</Tag>
          <Tag>{applicant}명 지원</Tag>
        </TagWrapper>
      </BackgroundWrapper>
      <DetailsWrapper isVisible={isDetailVisible}>
        <TitleWrapper>
          <Title>{title}</Title>
          <Dday>D-{displayDday}</Dday>
        </TitleWrapper>
        <Content isVisible={isDetailVisible}>{content}</Content>
        <BottomWrapper>
          <Ago>{ago}</Ago>
          <Recruiter>{recruiter}명 모집중</Recruiter>
        </BottomWrapper>
      </DetailsWrapper>
    </PostWrapper>
  );
};

export default StudyPreview;

/* CSS */
const PostWrapper = styled.div`
  border-radius: 10px;
  margin: 1em 0.5em;
  width: 100%;
  min-width: 13.2425em;
  height: 16.8125em;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-0.8em);
    box-shadow: 0 0.625em 1.25em #c8c8c8;
  }

  @media (min-width: 1024px) {
    width: ${({ link }) => (link === "category" ? "18%" : "100%")};
  }

  @media (max-width: 1024px) {
    width: ${({ link }) => (link === "category" ? "45%" : "100%")};
    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;

const BackgroundWrapper = styled.div`
  border: ${(props) => (props.isVisible ? "none" : "1px solid #D0D1D9")};
  border-bottom: none;
  border-radius: 10px 10px 0 0;
  height: ${(props) => (props.isVisible ? "0%" : "50%")};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #f4efff;
  background-image: ${(props) =>
    props.background ? `url(${props.background})` : "none"};
  background-size: cover;
  transition: all 0.3s ease;
  width: 100%;
`;

const StyledThumbnailLogo = styled(ThumbnailLogo)`
  width: 2rem;
  display: ${(props) => (props.background ? "none" : "flex")};
  visibility: ${(props) => (props.isVisible ? "hidden" : "visibility")};
  transition-delay: 0.1s;
`;

const TagWrapper = styled.div`
  position: absolute;
  bottom: 0;
  visibility: ${(props) => (props.isVisible ? "hidden" : "visibility")};
  transition-delay: 0.1s;
  width: 100%;
`;

const Tag = styled.div`
  margin: 0 0 0.6em 0.8em;
  padding: 0 1em;
  border: 1px solid #d0d1d9;
  border-radius: 30px;
  min-width: 2.6409em;
  height: 1.6436em;
  line-height: 1.6436em;
  background-color: white;
  color: gray;
  font-size: 0.6875em;
  font-weight: bold;
  text-align: center;
  display: inline-block;
`;

const DetailsWrapper = styled.div`
  border: 1px solid #d0d1d9;
  border-radius: ${(props) => (props.isVisible ? "10px" : "0 0 10px 10px")};
  height: ${(props) => (props.isVisible ? "100%" : "50%")};
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  min-width: 13.2425em;
  width: 100%;
`;

const TitleWrapper = styled.div`
  margin: 1.1em 1.2em 0.5em 1.2em;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 0.875em;
  font-weight: 800;

  width: 74%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;

const Dday = styled.div`
  font-size: 0.875em;
  font-weight: 800;
  text-align: end;

  width: 26%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;

const Content = styled.div`
  margin: 0 1.4769em;
  height: 100%;
  font-size: 0.8125em;
  line-height: 1.4em;
  // 말줄임 처리
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => (props.isVisible ? "10" : "3")};
  -webkit-box-orient: vertical;
`;

const BottomWrapper = styled.div`
  margin: 0.5em 1.2em 1.1em 1.2em;
  display: flex;
  justify-content: space-between;
`;

const Ago = styled.div`
  color: silver;
  font-size: 0.8125em;
  font-weight: bold;
`;

const Recruiter = styled.div`
  color: silver;
  font-size: 0.8125em;
  font-weight: bold;
`;
