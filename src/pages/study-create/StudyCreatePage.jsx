import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import backGroundUrl from "../../assets/images/mypage/mypageBackground.png";
import StudyInfo from "./ui/StudyInfo";
import StudyPeriod from "./ui/StudyPeriod";
import StudyDetail from "./ui/StudyDetail";
import { studyCreateAPI } from "./api/studyCreateAPI";
import { useSelector } from "react-redux";
import { ContentWrapper } from "../../components/common/MediaWrapper";
import { studyDetailAPI } from "../study-detail/api/studyDetailAPI";

const StudyCreatePage = () => {
  // useNavigate
  const navigate = useNavigate();

  // Redux 관리
  const {
    name,
    peopleMaximum,
    thumbnailUrl,
    category,
    privateCheck,
    recruitStartDay,
    recruitEndDay,
    studyStartDay,
    studyEndDay,
    description,
    materialList,
  } = useSelector((state) => state.studyCreate);

  // 서버로 전달할 데이터
  const data = {
    name: name,
    description: description,
    thumbnailUrl: thumbnailUrl,
    materialList: materialList,
    recruitStartDay: recruitStartDay,
    recruitEndDay: recruitEndDay,
    studyStartDay: studyStartDay,
    studyEndDay: studyEndDay,
    peopleLimited: true,
    peopleMaximum: peopleMaximum,
    category: category,
    private: privateCheck,
  };

  const handleSubmit = async () => {
    try {
      const response = await studyCreateAPI(data);
      console.log(response.result.roomId);
      //전역상태초기화 함수
      const studyDetail = await studyDetailAPI(response.result.roomId);
      console.log(studyDetail);
      navigate("/study/detail", {
        state: {
          studyDetail: studyDetail,
          roomId: response.result.roomId,
        },
      });
    } catch (error) {
      console.error("스터디 생성 중 오류 발생:", error);
      // 필요에 따라 오류 처리 로직을 추가할 수 있습니다.
    }
  };

  return (
    <>
      {/* 페이지 헤더 */}
      <Header>
        <PageHeaderTitle>스터디 만들기</PageHeaderTitle>
        <SubTitle>&#039;가지&#039;고싶은 스터디를 만들어보세요!</SubTitle>
        <RowWrapper></RowWrapper>
      </Header>

      <ContentWrapper>
        {/* 내용 */}

        {/* 스터디 기본정보 */}
        {/* <StudyContentWrapper> */}
        <Title>스터디 기본정보</Title>
        <StudyInfo />
        {/* </StudyContentWrapper> */}

        {/* 스터디 기한 */}
        <StudyContentWrapper>
          <Title>스터디 기한</Title>
          <StudyPeriod />
        </StudyContentWrapper>

        {/* 스터디 상세정보 */}
        <StudyContentWrapper>
          <Title>스터디 상세정보</Title>
          <StudyDetail />
        </StudyContentWrapper>

        {/* 제출 버튼 */}
        <SubmitButton onClick={() => handleSubmit()}>
          스터디 만들기
        </SubmitButton>
      </ContentWrapper>
    </>
  );
};

export default StudyCreatePage;

const SubTitle = styled.div`
  color: #d0d1d9;
  font-weight: 700;
`;

const Header = styled.div`
  display: flex;
  z-index: 2;
  position: relative;
  top: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10em;
  gap: 1em;
  background-color: #fbfaff;
  background-image: url(${backGroundUrl});
`;

const PageHeaderTitle = styled.div`
  font-size: 1.5em;
  font-weight: 800;
  color: #8e59ff;

  @media (max-width: 768px) {
    font-size: 1.25em;
    margin-top: 0.75em;
    margin-bottom: 1em;
  }
`;

const RowWrapper = styled.div`
  display: flex;
  gap: 1em;
  justify-content: center;
`;

const StudyContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Title = styled.div`
  width: 100%;
  margin: 1.5em 0;
  color: #8e59ff;
  font-weight: 800;
`;

const SubmitButton = styled.button`
  margin-top: 2.5em;
  margin-bottom: 2.5em;
  border: none;
  border-radius: 10px;
  width: 17.2308em;
  height: 2.5em;
  background-color: #8e59ff;
  color: white;
  font-size: 0.9em;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0.2em 1em rgba(22, 26, 63, 0.2);
  }
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 9em;
  }
`;
