import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setActiveButton } from "../../redux/slice/community/communitySlice";
import Hashtag from "./ui/Hashtag";
import PageHeader from "../../components/common/PageHeader";
import WriteSelectBox from "./ui/WriteSelectBox";
import { ContentWrapper60 } from "../../components/common/MediaWrapper";
import { setHashtagList } from "../../redux/slice/community/communityWriteSlice";
import CommunityWritePost from "../../components/common/CommunityWritePost";

const CommunityWritePage = () => {
  // state 관리
  const [hashtags, setHashtags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  // Redux 상태 관리
  const { type } = useSelector((state) => state.community);
  const dispatch = useDispatch();

  useEffect(() => {
    setActiveButtonIndex(getTitleIndex(type));
  }, [type]);

  // 해시태그 리스트 전달
  dispatch(setHashtagList(hashtags));

  // 초기 titleIndex 설정
  const getTitleIndex = (title) => {
    if (title === "프로젝트") {
      return 0;
    } else if (title === "질문") {
      return 1;
    } else {
      return 2;
    }
  };

  const [activeButtonIndex, setActiveButtonIndex] = useState(
    getTitleIndex(type),
  );

  // 헤더 함수
  const headerTitles = ["프로젝트", "질문", "블로그"];
  const handleHeaderButtonClick = (index) => {
    setActiveButtonIndex(index);
    if (index == 0) {
      dispatch(setActiveButton("프로젝트"));
    } else if (index == 1) {
      dispatch(setActiveButton("질문"));
    } else {
      dispatch(setActiveButton("블로그"));
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (hashtags.length < 10) {
      if (
        e.key === "Enter" &&
        !isComposing &&
        inputValue.trim() &&
        !hashtags.includes(inputValue.trim())
      ) {
        setHashtags([...hashtags, inputValue.trim()]);
        setInputValue("");
      }
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  const handleDeleteHashtag = (tagToDelete) => {
    setHashtags(hashtags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <ContentWrapper60>
      {/* 헤더 */}
      <PageHeader
        pageTitle="커뮤니티 글쓰기"
        headerTitles={headerTitles}
        activeButtonIndex={activeButtonIndex}
        onButtonClick={handleHeaderButtonClick}
        changeColorOnClick={true}
        changeColorOnHover={true}
      />

      {/* 게시글 작성 */}
      <PostOptionWrapper>
        <WriteSelectBox />
        <HashtagInputWrapper>
          #{" "}
          <HashtagInput
            placeholder="해시태그"
            value={inputValue}
            maxLength={15}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
          />
        </HashtagInputWrapper>
      </PostOptionWrapper>

      <PostTitle>게시글 제목</PostTitle>
      {/* 해시태그 */}
      <HashtagWrapper>
        {hashtags.map((tag, index) => (
          <Hashtag key={index} hashtag={tag} onDelete={handleDeleteHashtag} />
        ))}
      </HashtagWrapper>
      {/* 작성 공간 */}
      <CommunityWritePost />
    </ContentWrapper60>
  );
};

export default CommunityWritePage;

const PostOptionWrapper = styled.div`
  margin-bottom: 2em;
  width: 100%;
  display: flex;
  gap: 2%;
`;

const HashtagInputWrapper = styled.div`
  position: relative;
  width: 49%;
  padding-left: 1.5em;
  box-sizing: border-box;
  border: 1px solid #8e59ff;
  border-radius: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  line-height: 2.5em;

  background-color: transparent;
  color: #8e59ff;
  font-weight: 800;
`;

const HashtagInput = styled.input`
  border: none;
  width: 80%;
  background-color: transparent;
  font-weight: 800;
  -webkit-appearance: none;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #a2a3b2;
    font-weight: 800;
  }
  font-family: "NanumSquareNeo";
`;

const PostTitle = styled.div`
  width: 100%;
  color: #161a3f;
  font-weight: 800;
`;

const HashtagWrapper = styled.div`
  margin: 0.7em 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
`;
