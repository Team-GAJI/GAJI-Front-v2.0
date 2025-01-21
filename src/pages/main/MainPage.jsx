import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Banner1 from "../../assets/images/mainPage/banner1.png";
import Banner2 from "../../assets/images/mainPage/banner2.png";
import Banner3 from "../../assets/images/mainPage/banner3.png";
import LogoIcon from "../../assets/logos//logo.svg?react";
import StudyPreview from "../study/ui/StudyPreview";
import BlogPreview from "../community/ui/BlogPreview";
import { useNavigate } from "react-router-dom";
import MainSelectBox from "./ui/MainSelectBox";
import { ContentWrapperMain } from "../../components/common/MediaWrapper";
import { Scroll } from "../../components/common/Scroll";
import { studyPostsPreviewAPI } from "../study/api/studyPostsPreviewAPI";
import { communityPostsPreviewAPI } from "../community/api/communityPostsPreviewAPI";

const MainPage = () => {
  // state 관리
  const navigate = useNavigate();
  const [popularStudies, setPopularStudies] = useState([]);
  const [recentStudies, setRecentStudies] = useState([]);
  const [communityPosts, setCommunityPosts] = useState([]);
  const [, setStudySort] = useState("");

  // 스터디 불러오기
  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const [popularResponse, recentResponse] = await Promise.all([
          studyPostsPreviewAPI(null, null, "like", 5), // 인기 스터디
          studyPostsPreviewAPI(null, null, "recent", 5), // 최신 스터디
        ]);
        setPopularStudies(popularResponse);
        setRecentStudies(recentResponse);
      } catch (error) {
        console.error("스터디 데이터를 불러오는 중 오류 발생:", error);
      }
    };
    fetchStudies();
  }, []);

  // 커뮤니티 게시물 불러오기
  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const [communityResponse] = await Promise.all([
          communityPostsPreviewAPI(null, null, "recent", null, 4), // 커뮤니티 게시물
        ]);
        setCommunityPosts(communityResponse);
      } catch (error) {
        console.error("스터디 데이터를 불러오는 중 오류 발생:", error);
      }
    };
    fetchStudies();
  }, []);

  // 셀렉트 박스 기능
  const handleCategory = (option) => {
    navigate("/study/overview", { state: { category: option } });
  };
  const handleSort = (option) => {
    if (option === "최신순") {
      navigate("/study", { state: { sort: "recent" } });
    } else if (option === "좋아요수") {
      navigate("/study", { state: { sort: "like" } });
    } else {
      navigate("/study", { state: { sort: "hit" } });
    }
  };
  const handleFilter = (option) => {
    if (option === "모집 중") {
      navigate("/study", { state: { filter: "모집중" } });
    } else if (option === "모집 완료") {
      navigate("/study", { state: { filter: "모집 완료" } });
    } else if (option === "인원 제한") {
      navigate("/study", { state: { filter: "인원 제한" } });
    } else {
      navigate("/study", { state: { filter: "인원 제한 없음" } });
    }
  };

  // 좋아요순, 최신순 스터디 페이지로 이동
  const handleStudyPage = (selectedSort) => {
    setStudySort(selectedSort);
    navigate("/study", { state: { sort: selectedSort } });
  };

  return (
    <PageWrapper>
      {/* 배너 */}
      <StyledSwiper
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
      >
        <StyledSwiperSlide1></StyledSwiperSlide1>
        <StyledSwiperSlide2></StyledSwiperSlide2>
        <StyledSwiperSlide3></StyledSwiperSlide3>
      </StyledSwiper>

      <ContentWrapperMain>
        {/* 검색창 */}
        <Text>
          <PuppleText>&#039;가지&#039;</PuppleText>고 싶은 스터디를
          검색해보세요!
        </Text>

        <SearchInputWrapper>
          <StyledLogoIcon />
          <StyledSearchInput type="text" placeholder="검색어를 입력해주세요" />
        </SearchInputWrapper>

        {/* 게시글 필터 */}
        <SelectAndButtonWrapper>
          <MainSelectBox
            onCategorySelect={handleCategory}
            onSortSelect={handleSort}
            onFilterSelect={handleFilter}
          />
        </SelectAndButtonWrapper>
        <StyledHr />

        {/* 인기 스터디 미리보기 */}
        <ViewAllWrapper>
          <TitleText onClick={() => handleStudyPage("like")}>
            현재 가장 HOT한 스터디를 둘러보세요!
          </TitleText>
          <Arrow onClick={() => handleStudyPage("like")}>&gt;</Arrow>
        </ViewAllWrapper>

        <StudyPreviewWrapper>
          {popularStudies.map((post) => (
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

        {/* 최신 스터디 미리보기 */}
        <ViewAllWrapper>
          <TitleText onClick={() => handleStudyPage("recent")}>
            가장 최신의 스터디를 둘러보세요!
          </TitleText>
          <Arrow onClick={() => handleStudyPage("recent")}>&gt;</Arrow>
        </ViewAllWrapper>
        <StudyPreviewWrapper>
          {recentStudies.map((post) => (
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
        <StyledHr />

        {/* 커뮤니티 미리보기 */}
        <ViewAllWrapper>
          <TitleText
            onClick={() => {
              navigate("/community");
            }}
          >
            &#039;가지&#039;의 커뮤니티! 다 같이 성장해봐요!
          </TitleText>
          <Arrow
            onClick={() => {
              navigate("/community");
            }}
          >
            &gt;
          </Arrow>
        </ViewAllWrapper>

        <BlogPreviewWrapper>
          {communityPosts.map((post) => (
            <BlogPreview
              key={post.postId}
              postId={post.postId}
              title={post.title}
              content={post.body}
              background={post.thumbnailUrl}
              writer={post.userNickname}
              ago={post.uploadTime}
              views={post.hit}
              like={post.likeCnt}
            />
          ))}
        </BlogPreviewWrapper>
      </ContentWrapperMain>
    </PageWrapper>
  );
};

export default MainPage;

const PageWrapper = styled.div`
  width: 100%;
`;

const StyledSwiper = styled(Swiper)`
  background-color: #f4efff;
  width: 100%;
  height: 25em;
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    background-color: #8e59ff;

    &.swiper-pagination-bullet-active {
      background-color: #8e59ff;
    }
  }

  @media (max-width: 768px) {
    height: 12.5em;
  }
`;
const StyledSwiperSlide1 = styled(SwiperSlide)`
  background-image: url(${Banner1});
  background-size: cover;
`;
const StyledSwiperSlide2 = styled(SwiperSlide)`
  background-image: url(${Banner2});
  background-size: cover;
`;
const StyledSwiperSlide3 = styled(SwiperSlide)`
  background-image: url(${Banner3});
  background-size: cover;
`;

const Text = styled.div`
  margin: 1.7em 0 1.3em 0;
  color: #a2a3b2;
  font-size: 1.25em;
  font-weight: 800;
`;

const PuppleText = styled.span`
  color: #8e59ff;
`;

const SearchInputWrapper = styled.div`
  margin-bottom: 3em;
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
  display: flex;
  width: 100%;
  justify-content: start;
`;

const StyledHr = styled.div`
  margin-top: 1.2em;
  width: 100%;
  height: 1.5px;
  background-color: #d0d1d9;
`;

const ViewAllWrapper = styled.div`
  margin-top: 1em;
  width: 100%;
  display: flex;
  align-items: center;
  color: #8e59ff;
`;

const TitleText = styled.div`
  cursor: pointer;
  font-weight: 800;
  @media (max-width: 768px) {
    font-size: 0.8125em;
  }
`;

const Arrow = styled.span`
  padding-left: 0.6em;
  font-size: 1.2em;
  font-weight: bold;
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: 0.8125em;
  }
`;

const StudyPreviewWrapper = styled(Scroll)`
  width: 100%;
  display: flex;
  justify-content: center;
  overflow-x: scroll;
  overflow-y: hidden;
`;

const BlogPreviewWrapper = styled(Scroll)`
  margin-bottom: 1em;
  padding-top: 1em;
  width: 100%;
  display: flex;
  justify-content: center;
  overflow-x: scroll;
  overflow-y: hidden;
  box-sizing: border-box;
  gap: 1em;
`;
