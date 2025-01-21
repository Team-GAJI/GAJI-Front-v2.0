import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import LogoIcon from "../../../assets/logos/logo.svg?react";
import ProjectPreview from "./ProjectPreview";
import QuestionPreview from "./QuestionPreview";
import BlogPreview from "./BlogPreview";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/common/Loading";
import { dummyProjectPosts } from "./DummyProjectPosts";
import { dummyQuestionPosts } from "./DummyQuestionPosts";
import { dummyBlogPosts } from "./DummyBlogPosts";
import CommunitySelectBox from "./CommunitySelectBox";
import { ContentWrapper } from "../../../components/common/MediaWrapper";
import MobileWriteButton from "../../../components/common/MobileWriteButton";
import { communityPostsPreviewAPI } from "../api/communityPostsPreviewAPI";

const CommunityHomePosts = () => {
  // state 관리
  const [projectPage, setProjectPage] = useState(1);
  const [questionPage, setQuestionPage] = useState(1);
  const [blogPage, setBlogPage] = useState(1);
  const [, setProjects] = useState([]);
  const [, setQuestions] = useState([]);
  const [, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [projectPosts, setProjectPosts] = useState([]);
  const [questionPosts, setQuestionPosts] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  // 셀렉트박스 state
  const [categoryOption, setCategoryOption] = useState(null);
  const [sortOption, setSortOption] = useState(null);
  const [filterOption, setFilterOption] = useState(null);

  // 셀렉트 박스 기능
  const handleCategory = (option) => {
    setCategoryOption(option);
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
    if (option === "모집 중" || option === "미완료 질문") {
      setFilterOption("모집중");
    } else {
      setFilterOption("모집완료");
    }
  };

  // 게시물 불러오기
  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const [projectResponse, questionResponse, blogResponse] =
          await Promise.all([
            communityPostsPreviewAPI(
              "프로젝트",
              categoryOption,
              sortOption,
              filterOption,
              null,
            ), // 프로젝트
            communityPostsPreviewAPI(
              "질문",
              categoryOption,
              sortOption,
              filterOption,
              null,
            ), // 질문
            communityPostsPreviewAPI(
              "블로그",
              categoryOption,
              sortOption,
              null,
              null,
            ), // 블로그
          ]);
        setProjectPosts(projectResponse);
        setQuestionPosts(questionResponse);
        setBlogPosts(blogResponse);
      } catch (error) {
        console.error("스터디 데이터를 불러오는 중 오류 발생:", error);
      }
    };
    fetchStudies();
  }, [categoryOption, sortOption, filterOption]);

  // 프로젝트 불러오기 기능
  const getProjects = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    setTimeout(() => {
      const newPosts = dummyProjectPosts.slice(
        (projectPage - 1) * 4,
        projectPage * 4,
      ); // 페이지당 4개씩 로드
      setProjects((prevPosts) => [...prevPosts, ...newPosts]);
      setProjectPage((prevPage) => prevPage + 1);
      setIsLoading(false);
    }, 1000); // 1초 지연 후 데이터 추가
  }, [isLoading, projectPage]);

  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        getProjects();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [getProjects]);

  // 질문 불러오기 기능
  const getQuestions = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    setTimeout(() => {
      const newPosts = dummyQuestionPosts.slice(
        (questionPage - 1) * 4,
        questionPage * 4,
      ); // 페이지당 4개씩 로드
      setQuestions((prevPosts) => [...prevPosts, ...newPosts]);
      setQuestionPage((prevPage) => prevPage + 1);
      setIsLoading(false);
    }, 1000); // 1초 지연 후 데이터 추가
  }, [isLoading, questionPage]);

  useEffect(() => {
    getQuestions();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        getQuestions();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [getQuestions]);

  // 블로그 불러오기 기능
  const getBlogs = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    setTimeout(() => {
      const newPosts = dummyBlogPosts.slice((blogPage - 1) * 8, blogPage * 8); // 페이지당 8개씩 로드
      setBlogs((prevPosts) => [...prevPosts, ...newPosts]);
      setBlogPage((prevPage) => prevPage + 1);
      setIsLoading(false);
    }, 1000); // 1초 지연 후 데이터 추가
  }, [isLoading, blogPage]);

  useEffect(() => {
    getBlogs();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        getBlogs();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [getBlogs]);

  // Redux 상태 가져오기
  const { type } = useSelector((state) => state.community);

  // useNavigate
  const navigate = useNavigate();

  return (
    <ContentWrapper>
      {/* 검색창 */}
      <SearchInputWrapper>
        <StyledLogoIcon />
        <StyledSearchInput type="text" placeholder="검색어를 입력해주세요" />
      </SearchInputWrapper>

      {/* 게시글 필터 */}
      <SelectAndButtonWrapper>
        {/* 셀렉트 박스 */}
        <CommunitySelectBox
          onCategorySelect={handleCategory}
          onSortSelect={handleSort}
          onFilterSelect={handleFilter}
        />
        {/* 게시글 버튼 */}
        <div
          onClick={() => {
            navigate("/community/write");
          }}
        >
          <MobileWriteButton />
        </div>
        <CreatePostButton
          onClick={() => {
            navigate("/community/write");
          }}
        >
          + {type} 작성하기
        </CreatePostButton>
      </SelectAndButtonWrapper>
      <StyledHr />

      {/* 게시글 미리보기 */}
      {type === "블로그" ? (
        <BlogPreviewWrapper>
          {blogPosts.map((post) => (
            <BlogPreview
              link={"community"}
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

          {isLoading && <Loading />}
        </BlogPreviewWrapper>
      ) : type === "질문" ? (
        <PostPreviewWrapper>
          {questionPosts.map((post) => (
            <QuestionPreview
              key={post.postId}
              postId={post.postId}
              state={post.status}
              title={post.title}
              content={post.body}
              writer={post.userNickname}
              ago={post.uploadTime}
              views={post.hit}
              like={post.likeCnt}
            />
          ))}
          {isLoading && <Loading />}
        </PostPreviewWrapper>
      ) : (
        <PostPreviewWrapper>
          {projectPosts.map((post) => (
            <ProjectPreview
              key={post.postId}
              postId={post.postId}
              state={post.status}
              title={post.title}
              content={post.body}
              writer={post.userNickname}
              ago={post.uploadTime}
              views={post.hit}
              like={post.likeCnt}
            />
          ))}
          {isLoading && <Loading />}
        </PostPreviewWrapper>
      )}
    </ContentWrapper>
  );
};

export default CommunityHomePosts;

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
  padding-bottom: 1em;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #fbfaff;
  position: sticky;
  top: 60px;
  z-index: 50;
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

const StyledHr = styled.div`
  width: 100%;
  height: 1.5px;
  background-color: #d0d1d9;
`;

const PostPreviewWrapper = styled.div`
  margin-top: 1.2em;
  width: 100%;
`;

const BlogPreviewWrapper = styled.div`
  margin-bottom: 3em;
  display: grid;
  padding-top: 2em;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(15.05em, 1fr));
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
