import React, { useState, useEffect } from "react";
import styled from "styled-components";
import backGroundUrl from "../../assets/images/mypage/mypageBackground.png";
import LogoIcon from "../../assets/logos//logo.svg?react";
import StudyPreview from "./ui/StudyPreview";
import { useNavigate, useLocation } from "react-router-dom";
import MainSelectBox from "../main/ui/MainSelectBox";
import { ContentWrapper } from "../../components/common/MediaWrapper";
import { Scroll } from "../../components/common/Scroll";
import MobileWriteButton from "../../components/common/MobileWriteButton";
import { studyPostsPreviewAPI } from "./api/studyPostsPreviewAPI";

const StudyMainPage = () => {
  // 각 카테고리별로 스터디 데이터를 관리하기 위한 상태값
  const [studies, setStudies] = useState({
    개발: [],
    인공지능: [],
    하드웨어: [],
    보안: [],
    "네트워크-클라우드": [],
    어학: [],
    디자인: [],
    비즈니스: [],
    독서: [],
    기타: [],
  });

  // useLocation
  const location = useLocation();
  const { filter } = location.state || { sort: null };
  const { sort } = location.state || { sort: null };

  // 셀렉트 박스 옵션 state
  const [filterOption, setFilterOption] = useState(filter);
  const [sortOption, setSortOption] = useState(sort);

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

  // 스터디 데이터를 API로부터 불러오는 useEffect
  useEffect(() => {
    const categories = [
      "개발",
      "인공지능",
      "하드웨어",
      "보안",
      "네트워크-클라우드",
      "어학",
      "디자인",
      "비즈니스",
      "독서",
      "기타",
    ];

    const fetchStudies = async () => {
      try {
        const studiesByCategory = await Promise.all(
          categories.map(async (cat) => {
            const response = await studyPostsPreviewAPI(
              cat,
              filterOption,
              sortOption,
              5,
            );

            // API로부터 받은 응답은 배열 형식이므로, 이를 상태값에 맞게 저장
            return { [cat]: response };
          }),
        );

        const studiesData = studiesByCategory.reduce((acc, cur) => {
          return { ...acc, ...cur };
        }, {});

        setStudies(studiesData);
      } catch (error) {
        console.error("스터디 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchStudies();
  }, [sortOption, filterOption]);

  // 모두보기 클릭 시 해당 카테고리의 스터디 페이지로 이동
  const handleCategoryClick = (selectedCategory) => {
    navigate("/study/overview", { state: { category: selectedCategory } });
  };

  return (
    <>
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
        {/* 페이지 헤더 */}

        {/* 게시글 필터 */}
        <SelectAndButtonWrapper>
          <MainSelectBox
            onCategorySelect={handleCategory}
            onSortSelect={handleSort}
            onFilterSelect={handleFilter}
            selectedSort={
              sort === "recent"
                ? "최신순"
                : sort === "like"
                  ? "좋아요수"
                  : sort === "hit"
                    ? "조회수"
                    : "정렬"
            }
            selectedFilter={
              filter === "모집중"
                ? "모집 중"
                : filter === "모집 완료"
                  ? "모집 완료"
                  : filter === "인원 제한"
                    ? "인원 제한"
                    : filter === "인원 제한 없음"
                      ? "제한 없음"
                      : "필터"
            }
          />
          <div
            onClick={() => {
              navigate("/study/create");
            }}
          >
            <MobileWriteButton />
          </div>
          <CreatePostButton
            onClick={() => {
              navigate("/study/create");
            }}
          >
            + 스터디 만들기
          </CreatePostButton>
        </SelectAndButtonWrapper>
        <StyledHr />

        {/* 카테고리별 스터디 영역 */}
        {Object.keys(studies).map((cat) => (
          <React.Fragment key={cat}>
            <CategoryTitleWrapper>
              <CategoryTitle># {cat}</CategoryTitle>
              <ViewAllWrapper>
                <ViewAll onClick={() => handleCategoryClick(cat)}>
                  모두 보기
                </ViewAll>
                <Arrow onClick={() => handleCategoryClick(cat)}>&gt;</Arrow>
              </ViewAllWrapper>
            </CategoryTitleWrapper>
            <StudyPreviewWrapper>
              {/* 각 카테고리별로 5개의 스터디를 화면에 렌더링 */}
              {studies[cat].slice(0, 5).map((post) => (
                <StudyPreview
                  key={post.roomId} // 고유한 ID로 key 설정
                  roomId={post.roomId} // room Id 설정
                  title={post.name} // 제목 설정
                  content={post.description} // 내용 설정
                  background={post.imageUrl} // 배경 이미지 설정
                  ago={post.createdAt} // 생성 시간 설정
                  dday={post.deadLine} // 마감일 설정
                  recruiter={post.recruitMaxCount} // 모집 인원 설정
                  state={post.recruitStatus} // 모집 상태 설정
                  applicant={post.applicant} // 지원자 수 설정
                />
              ))}
            </StudyPreviewWrapper>
          </React.Fragment>
        ))}
      </ContentWrapper>
    </>
  );
};

export default StudyMainPage;

// 스타일링 관련 컴포넌트
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
  flex-direction: row;
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

  @media (max-width: 768px) {
    display: none;
  }
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

const ViewAllWrapper = styled.div`
  color: #d0d1d9;
  font-size: 0.8125em;
  display: flex;
  align-items: center;
`;

const StudyPreviewWrapper = styled(Scroll)`
  width: 100%;
  display: flex;
  overflow-x: scroll;
`;

const ViewAll = styled.span`
  font-size: 0.8125;
  font-weight: 800;
  cursor: pointer;
`;

const Arrow = styled.span`
  padding-left: 0.6em;
  font-size: 1.2em;
  font-weight: bold;
  cursor: pointer;
`;
