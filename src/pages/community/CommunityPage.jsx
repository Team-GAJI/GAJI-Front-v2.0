import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setActiveButton } from "../../redux/slice/community/communitySlice";
import CommunityHomePosts from "./ui/CommunityHomePosts";
import PageHeader from "../../components/common/PageHeader";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import HotPostPreview from "./ui/HotPostPreview";
import { communityPostsPreviewAPI } from "./api/communityPostsPreviewAPI";

const CommunityPage = () => {
  // state 관리
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const [hotPosts, setHotPosts] = useState([]);

  // Redux 상태 관리
  const dispatch = useDispatch();

  // Redux로 type 상태 가져오기
  const { type } = useSelector((state) => state.community);
  console.log("현재 Redux type 상태:", type);

  // type에 따라 activeButtonIndex 초기화
  useEffect(() => {
    const typeToIndexMap = {
      프로젝트: 0,
      질문: 1,
      블로그: 2,
    };
    setActiveButtonIndex(typeToIndexMap[type] ?? 0); // type이 없으면 기본값 0
  }, [type]);

  // 헤더 함수
  const headerTitles = ["프로젝트", "질문", "블로그"];
  const handleHeaderButtonClick = (index) => {
    setActiveButtonIndex(index);
    const newType = index === 0 ? "프로젝트" : index === 1 ? "질문" : "블로그";
    dispatch(setActiveButton(newType));
  };

  // HOT 게시물 불러오기
  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const [hotPostResponse] = await Promise.all([
          communityPostsPreviewAPI(type, null, "hot", null, 10), // 핫게시물
        ]);
        setHotPosts(hotPostResponse);
      } catch (error) {
        console.error("스터디 데이터를 불러오는 중 오류 발생:", error);
      }
    };
    fetchStudies();
  }, [type]);

  return (
    <>
      {/* 헤더 */}
      <PageHeader
        pageTitle="커뮤니티"
        headerTitles={headerTitles}
        activeButtonIndex={activeButtonIndex}
        onButtonClick={handleHeaderButtonClick}
        changeColorOnClick={true}
        changeColorOnHover={true}
      />

      {/* 핫게시물 영역 */}
      <PostsWrapper>
        <HotPostsBackground>
          <HotPostText>HOT 게시물</HotPostText>
          <StyledSwiper
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            loop={true}
            spaceBetween={-133}
            effect={"coverflow"}
            coverflowEffect={{
              rotate: 0,
              stretch: -33,
              depth: 450,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={false}
            modules={[EffectCoverflow, Pagination]}
          >
            {hotPosts.map((post) => (
              <StyledSwiperSlide key={post.postId}>
                <HotPostPreview
                  key={post.postId}
                  postId={post.postId}
                  title={post.title}
                  background={post.thumbnailUrl}
                  tags={post.hashtagList}
                />
              </StyledSwiperSlide>
            ))}
          </StyledSwiper>
        </HotPostsBackground>

        {/* 게시글 영역 */}
        <CommunityHomePosts />
      </PostsWrapper>
    </>
  );
};

export default CommunityPage;

/* CSS */
const PostsWrapper = styled.div`
  text-align: center;
  position: relative;
`;

const HotPostsBackground = styled.div`
  margin-bottom: 1.5em;
  height: 19.75em;
  background-color: #f0eaff;
`;

const HotPostText = styled.div`
  padding-top: 1.2em;
  color: #8e59ff;
  font-weight: 800;
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  max-width: 52em;
  height: 16em;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
  align-items: center;
  transition:
    transform 0.5s ease,
    opacity 0.5s ease;
  &.swiper-slide-prev,
  &.swiper-slide-next {
    transform: scale(0.8);
  }
  &.swiper-slide-prev-prev,
  &.swiper-slide-next-next {
    transform: scale(0.6);
  }
  &.swiper-slide-active {
    transform: scale(1);
    opacity: 1;
  }
`;
