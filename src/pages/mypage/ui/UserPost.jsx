import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { PuppleButton } from "../../../components/button/Button";
import Loading from "../../../components/common/Loading";
import { getUserPostAPI } from "../api/getUserPostAPI";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

const UserPost = ({ nickName }) => {
  const [posts, setPosts] = useState([]);
  const [hasNext, setHasNext] = useState(true);
  const [category, setCategory] = useState(0);
  const [cursorDate, setCursorDate] = useState("");

  const isLoading = useRef(false);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const getPosts = useCallback(async () => {
    if (isLoading.current || !hasNext) return;

    isLoading.current = true;

    try {
      const userId = localStorage.getItem("userId");
      const types = ["질문", "프로젝트", "블로그", "스터디"];
      const currentType = types[category];

      const response = await getUserPostAPI(userId, currentType, cursorDate);

      if (response?.postList?.length > 0) {
        setPosts((prevPosts) => {
          return [...prevPosts, ...response.postList].filter(
            (post, index, self) =>
              index === self.findIndex((p) => p.postId === post.postId),
          );
        });

        setHasNext(response.hasNext);

        setCursorDate(
          response.postList[response.postList.length - 1].createdAt,
        );
      } else {
        setHasNext(false);
      }
    } catch (error) {
      console.error("게시글을 가져오는 데 실패했습니다:", error.message);
      setHasNext(false);
    } finally {
      isLoading.current = false;
    }
  }, [category, cursorDate, hasNext]);

  useEffect(() => {
    setPosts([]); // 기존 데이터 초기화
    setHasNext(true);
    setCursorDate("");
  }, [category]);

  /*스크롤 이벤트 */
  useEffect(() => {
    const handleScroll = debounce(() => {
      if (!scrollRef.current) return; // scrollRef가 존재하지 않으면 실행하지 않음

      const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;

      // 바닥에 닿았을 때만 API 호출
      if (scrollTop + clientHeight >= scrollHeight - 200) {
        getPosts();
      }
    }, 300);

    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [getPosts]);

  /* 게시글 상세 이동 */
  const handlePostDetail = (postId) => {
    const categoryState = category === 3 ? "study" : "community";
    navigate(`/${categoryState}/detail/${postId}`);
  };

  return (
    <MyPostWrapper>
      <ExtraBold>{nickName}님이 쓴 글</ExtraBold>
      <Header>
        {["질문하기", "프로젝트 모집", "블로그", "스터디 모집"].map(
          (title, index) => (
            <PostRouteButton
              key={index}
              $isActive={category === index}
              onClick={() => setCategory(index)}
            >
              {title}
            </PostRouteButton>
          ),
        )}
      </Header>

      <PostListWrapper ref={scrollRef}>
        {posts.map((post) => (
          <PostListItem
            key={post.postId}
            onClick={() => handlePostDetail(post.postId)}
          >
            <PostState>{post.status}</PostState>
            <PostTitle>{post.title}</PostTitle>
            <PostText>{post.body}</PostText>
            <PostInfo>
              {post.createdAt} | 댓글 {post.viewCnt}
            </PostInfo>
          </PostListItem>
        ))}
        {hasNext && !isLoading.current && <Loading />}{" "}
      </PostListWrapper>
    </MyPostWrapper>
  );
};

export default UserPost;
const MyPostWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.875em;
  box-sizing: border-box;
  padding: 1em;

  @media (max-width: 768px) {
    padding: 0.5em;
    gap: 1em;
  }
`;

const ExtraBold = styled.div`
  font-weight: 800;
  font-size: 1.25em;
  color: #8e59ff;
  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

const Header = styled.div`
  display: flex;
  gap: 0.6em;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 0.4em;
  }
`;

const PostRouteButton = styled.div`
  box-sizing: border-box;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 129px;
  height: 27px;
  border-radius: 10px;
  border: ${({ $isActive }) => ($isActive ? "1px solid #8E59FF;" : "none")};

  @media (max-width: 768px) {
    width: 100px;
    height: 24px;
    font-size: 0.8em;
  }
`;

const PostListWrapper = styled.div`
  width: 100%;
  border-top: 3px solid #8e59ff;
  padding-top: 1.5625em;
  padding-bottom: 1.5625em;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding-top: 1em;
    padding-bottom: 1em;
  }
`;

const PostListItem = styled.div`
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
  padding: 1em;
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid #e8e9ec;
  gap: 0.8em;

  @media (max-width: 768px) {
    padding: 0.8em;
    gap: 0.6em;
  }
`;

const PostState = styled(PuppleButton)`
  font-weight: 700;
  width: 103px;
  height: 1.5em;

  @media (max-width: 768px) {
    width: 90px;
    height: 1.2em;
    font-size: 0.8em;
  }
`;

const PostTitle = styled.div`
  font-weight: 800;
  font-size: 1.25em;

  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

const PostText = styled.div`
  font-weight: 700;
  font-size: 1em;
  max-height: 4.5em;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #a2a3b2;

  @media (max-width: 768px) {
    font-size: 0.9em;
    max-height: 3.6em;
  }
`;

const PostInfo = styled.div`
  font-weight: 700;
  font-size: 0.8125em;
  color: #d0d1d9;

  @media (max-width: 768px) {
    font-size: 0.75em;
  }
`;
