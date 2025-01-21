import React, { useState, useEffect } from "react";
import styled from "styled-components";
import backGroundUrl from "../../assets/images/mypage/mypageBackground.png";
import LogoIcon from "../../assets/logos//logo.svg?react";
import StudyPreview from "../study/ui/StudyPreview";
import { useNavigate, useLocation } from "react-router-dom";
import MainSelectBox from "../main/ui/MainSelectBox";
import MobileWriteButton from "../../components/common/MobileWriteButton";
import { ContentWrapper } from "../../components/common/MediaWrapper";
import { studyPostsPreviewAPI } from "../study/api/studyPostsPreviewAPI";

const StudyOverviewPage = () => {
  // state 관리
  const [studies, setStudies] = useState([]);
  // useLocation
  const location = useLocation();
  const { category } = location.state || { category: null };

  // 셀렉트 박스 옵션 state
  const [filterOption, setFilterOption] = useState(null);
  const [sortOption, setSortOption] = useState(null);

  // useNavigate 훅을 사용하여 페이지 이동을 처리
  const navigate = useNavigate();

  // 셀렉트 박스 기능
  const handleCategory = (option) => {
    navigate("/study/overview", { state: { category: option } });
  };
  const handleSort = (option) => {
    if (option === "최신순") {
      setSortOption("recent");
    } else if (option === "좋아요수") {
      setSortOption("like");
    } else {
      setSortOption("hit");
    }
  };
  const handleFilter = (option) => {
    if (option === "모집 중") {
      setFilterOption("모집중");
    } else if (option === "모집 완료") {
      setFilterOption("모집 완료");
    } else if (option === "인원 제한") {
      setFilterOption("인원 제한");
    } else {
      setFilterOption("인원 제한 없음");
    }
  };

  // 스터디 불러오기
  useEffect(() => {
    const fetchStudiesByCategory = async () => {
      try {
        const response = await studyPostsPreviewAPI(
          category,
          filterOption,
          sortOption,
          null,
        );
        setStudies(response);
      } catch (error) {
        console.error("스터디 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchStudiesByCategory();
  }, [category, filterOption, sortOption]);

  return (
    <PageWrapper>
      {/* 페이지 헤더 */}
      <Header>
        <PageHeaderTitle>스터디</PageHeaderTitle>
        <SubTitle>&#039;가지&#039;고싶은 스터디를 검색해보세요!</SubTitle>
        <RowWrapper>
          {/* 검색창 */}
          <SearchInputWrapper>
            <StyledLogoIcon />
            <StyledSearchInput
              type="text"
              placeholder="검색어를 입력해주세요"
            />
          </SearchInputWrapper>
        </RowWrapper>
      </Header>

      <ContentWrapper>
        {/* 게시글 필터 */}
        <SelectAndButtonWrapper>
          <MainSelectBox
            onCategorySelect={handleCategory}
            onSortSelect={handleSort}
            onFilterSelect={handleFilter}
            selectedCategory={category}
          />
          <CreatePostButton
            onClick={() => {
              navigate("/study/create");
            }}
          >
            + 스터디 만들기
          </CreatePostButton>
          <MobileWriteButton
            onClick={() => {
              navigate("/study/create");
            }}
          />
        </SelectAndButtonWrapper>
        <StyledHr />

        {/* 스터디 영역 */}
        <CategoryTitleWrapper>
          <CategoryTitle># {category}</CategoryTitle>
        </CategoryTitleWrapper>
        <StudyPreviewWrapper>
          {studies.map((post) => (
            <StudyPreview
              key={post.roomId}
              roomId={post.roomId}
              title={post.name}
              content={post.description}
              background={post.imageUrl}
              ago={post.createdAt}
              dday={post.deadLine}
              recruiter={post.recruitMaxCount}
              state={post.recruitStatus}
              applicant={post.applicant}
            />
          ))}
        </StudyPreviewWrapper>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default StudyOverviewPage;

/* CSS */
const PageWrapper = styled.div`
  margin-bottom: 6em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
  width: 100%;
  display: flex;
  gap: 1em;
  justify-content: center;
`;

const SearchInputWrapper = styled.div`
  border: 1px solid #d0d1d9;
  border-radius: 10px;
  width: 50%;
  min-width: 273px;

  @media (max-width: 768px) {
    width: 80%;
  }
  height: 2.5em;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLogoIcon = styled(LogoIcon)`
  margin: 1em;
  width: 1.5em;
`;

const StyledSearchInput = styled.input`
  border: none;
  width: 100%;
  height: 2em;
  font-weight: bold;
  -webkit-appearance: none;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #d0d1d9;
  }
  font-family: "NanumSquareNeo";
`;

const SelectAndButtonWrapper = styled.div`
  margin-top: 2em;
  padding-bottom: 0.6em;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #fbfaff;
  position: sticky;
  top: 60px;
  z-index: 10;
`;

const CreatePostButton = styled.button`
  border: none;
  border-radius: 10px;
  width: 9.923em;
  height: 2.4em;
  background-color: #8e59ff;
  color: white;
  font-size: 0.8125em;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0.2em 1em rgba(22, 26, 63, 0.2);
  }
  transition: all 0.3s ease;
`;

const StyledHr = styled.hr`
  margin-bottom: 1.2em;
  border: none;
  width: 100%;
  height: 1.5px;
  background-color: #d0d1d9;
`;

const CategoryTitleWrapper = styled.div`
  margin: 1.2em 0 0.8em 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CategoryTitle = styled.div`
  border-radius: 10px;
  min-width: 6em;
  padding: 0 1.5em;
  height: 2.5em;
  line-height: 2.5em;
  background-color: #bb9cff;
  color: white;
  font-size: 0.8125em;
  font-weight: 800;
  text-align: center;
`;

const StudyPreviewWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(13.2425em, 1fr));
  gap: 1em;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr); /* 1024px 이하에서 2열 */
    gap: 0.5em;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* 768px 이하에서 2열 */
    gap: 0.5em;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* 480px 이하에서 1열 */
    gap: 0.5em;
  }
`;
