import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { PuppleButton } from "../../../components/button/Button";
import Loading from "../../../components/common/Loading";
import { getUserPostAPI } from "../api/getUserPostAPI";

const UserPost = ({ nickName }) => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [hasNext, setHasNext] = useState(true);
  const [category, setCategory] = useState(0);
  const [cursorDate, setCursorDate] = useState("");

  const getPosts = useCallback(async () => {
    if (isLoading || !hasNext) return;
    setIsLoading(true);

    const userId = localStorage.getItem("userId");
    const types = ["질문", "프로젝트", "블로그", "스터디"];
    const currentType = types[category];

    try {
      const response = await getUserPostAPI(userId, currentType, cursorDate);
      console.log("API 응답:", response);

      const { postList, hasNext: newHasNext } = response;

      if (!postList || postList.length === 0) {
        console.log("게시글 데이터가 없습니다.");
        setHasNext(false);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...postList]);
        setPage((prevPage) => prevPage + 1);
        setHasNext(newHasNext);
        // 설정된 cursorDate 업데이트
        if (postList.length > 0) {
          setCursorDate(postList[postList.length - 1].createdAt);
        }
      }
    } catch (error) {
      console.error("게시글을 가져오는 데 실패했습니다:", error.message);
      setHasNext(false); // 오류 발생 시 hasNext를 false로 설정
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasNext, category, cursorDate]);

  useEffect(() => {
    setPosts([]);
    setPage(1);
    setHasNext(true);
    setCursorDate(""); // 페이지 변경 시 커서 날짜 초기화
    getPosts();
  }, [category]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        getPosts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [getPosts]);

  return (
    <MyPostWrapper>
      <ExtraBold>{nickName}님이 쓴 글</ExtraBold>
      <Header>
        <PostRouteButton
          $isActive={category === 0}
          onClick={() => setCategory(0)}
        >
          질문하기
        </PostRouteButton>
        <PostRouteButton
          $isActive={category === 1}
          onClick={() => setCategory(1)}
        >
          프로젝트 모집
        </PostRouteButton>
        <PostRouteButton
          $isActive={category === 2}
          onClick={() => setCategory(2)}
        >
          블로그
        </PostRouteButton>
        <PostRouteButton
          $isActive={category === 3}
          onClick={() => setCategory(3)}
        >
          스터디 모집
        </PostRouteButton>
      </Header>

      <PostListWrapper>
        {posts.map((post) => (
          <PostListItem key={post.postId}>
            <PostState>{post.status}</PostState>
            <PostTitle>{post.title}</PostTitle>
            <PostText>{post.body}</PostText>
            <PostInfo>
              {post.createdAt} | 댓글 {post.viewCnt}
            </PostInfo>
          </PostListItem>
        ))}
        {isLoading && <Loading />}
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

// 기존 코드
// import React, { useCallback, useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { PuppleButton } from '../style/Button';
// import Loading from '../common/Loading';

// const MyPost = () => {
//     const [page, setPage] = useState(1);
//     const [isLoading, setIsLoading] = useState(false);
//     const [posts, setPosts] = useState([]);
//     const [category, setCategory] = useState(0);

//     const dummyPosts = [
//         {
//             postState: '작성중',
//             postTitle: 'React 사용법 질문1',
//             postText: 'React에서 상태 관리를 어떻게 하면 좋을까요?',
//             postInfo: '2024-07-01 | 댓글 2개'
//         },
//         {
//             postState: '완료',
//             postTitle: '프로젝트 팀 모집2',
//             postText: '프론트엔드 개발자를 모집합니다. React, Redux 사용 경험이 필요합니다.',
//             postInfo: '2024-07-02 | 댓글 5개'
//         },
//         {
//             postState: '작성중',
//             postTitle: '블로그 포스팅 주제 추천3',
//             postText: '어떤 주제로 블로그를 작성하면 좋을지 추천해주세요.',
//             postInfo: '2024-07-03 | 댓글 1개'
//         },
//         {
//             postState: '완료',
//             postTitle: '스터디 모집: 알고리즘',
//             postText: '매주 알고리즘 문제를 함께 풀어갈 스터디원을 모집합니다.',
//             postInfo: '2024-07-04 | 댓글 3개'
//         },
//         {
//             postState: '작성중',
//             postTitle: 'React Hook 질문',
//             postText: 'useEffect와 useState를 어떻게 조합하면 좋을까요?',
//             postInfo: '2024-07-05 | 댓글 4개'
//         },
//         {
//             postState: '완료',
//             postTitle: '백엔드 개발자 구인',
//             postText: 'Node.js와 Express를 다룰 수 있는 백엔드 개발자를 구합니다.',
//             postInfo: '2024-07-06 | 댓글 6개'
//         },
//         {
//             postState: '작성중',
//             postTitle: 'CSS Grid와 Flexbox 비교',
//             postText: 'CSS Grid와 Flexbox의 차이점에 대해 설명해주세요.',
//             postInfo: '2024-07-07 | 댓글 2개'
//         },
//         {
//             postState: '완료',
//             postTitle: '블로그 포스트: JavaScript',
//             postText: 'JavaScript의 비동기 처리에 대한 블로그 포스트입니다.',
//             postInfo: '2024-07-08 | 댓글 3개'
//         },
//         {
//             postState: '작성중',
//             postTitle: 'Next.js vs Create React App',
//             postText: 'Next.js와 Create React App 중 어떤 것을 선택해야 할까요?',
//             postInfo: '2024-07-09 | 댓글 4개'
//         },
//         {
//             postState: '완료',
//             postTitle: '스터디 모집: 데이터 구조',
//             postText: '데이터 구조에 대해 깊이 있게 공부할 스터디원을 모집합니다.',
//             postInfo: '2024-07-10 | 댓글 5개'
//         }
//     ];

//     const getPosts = useCallback(async () => {
//         if (isLoading) return;
//         setIsLoading(true);
//         setTimeout(() => {
//             const newPosts = dummyPosts.slice((page - 1) * 2, page * 2); // 페이지당 2개씩 로드
//             setPosts((prevPosts) => [...prevPosts, ...newPosts]);
//             setPage((prevPage) => prevPage + 1);
//             setIsLoading(false);
//         }, 1000); // 1초 지연 후 데이터 추가
//     }, [isLoading, page]);

//     useEffect(() => {
//         getPosts();
//     }, []);

//     useEffect(() => {
//         const handleScroll = () => {
//             const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
//             if (scrollTop + clientHeight >= scrollHeight - 20) {
//                 getPosts();
//             }
//         };

//         window.addEventListener("scroll", handleScroll);
//         return () => {
//             window.removeEventListener("scroll", handleScroll);
//         };
//     }, [getPosts]);

//     return (
//         <MyPostWrapper>
//             <ExtraBold>내가 쓴 글</ExtraBold>
//             <Header>
//                 <PostRouteButton $isActive={category === 0} onClick={() => setCategory(0)}>질문하기</PostRouteButton>
//                 <PostRouteButton $isActive={category === 1} onClick={() => setCategory(1)}>프로젝트 모집</PostRouteButton>
//                 <PostRouteButton $isActive={category === 2} onClick={() => setCategory(2)}>블로그</PostRouteButton>
//                 <PostRouteButton $isActive={category === 3} onClick={() => setCategory(3)}>스터디 모집</PostRouteButton>
//             </Header>

//             <PostListWrapper>
//                 {posts.map((post, index) => (
//                     <PostListItem key={index}>
//                         <PostState>{post.postState}</PostState>
//                         <PostTitle>{post.postTitle}</PostTitle>
//                         <PostText>{post.postText}</PostText>
//                         <PostInfo>{post.postInfo}</PostInfo>
//                     </PostListItem>
//                 ))}
//                 {isLoading && (
//                     <Loading />
//                 )}
//             </PostListWrapper>
//         </MyPostWrapper>
//     );
// };

// export default MyPost;

// const MyPostWrapper = styled.div`
//     width: 100%;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     gap: 1.875em;
//     box-sizing : border-box;
//     padding: 1em;

//     @media (max-width: 768px) {
//         padding: 0.5em;
//         gap: 1em;
//     }
// `;

// const ExtraBold = styled.div`
//     font-weight: 800;
//     font-size: 1.25em;

//     @media (max-width: 768px) {
//         font-size: 1em;
//     }
// `;

// const Header = styled.div`
//     display: flex;
//     gap: 0.6em;
//     flex-wrap: wrap;
//     justify-content: center;

//     @media (max-width: 768px) {
//         gap: 0.4em;
//     }
// `;

// const PostRouteButton = styled.div`
//     box-sizing: border-box;
//     font-weight: 400;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     width: 129px;
//     height: 27px;
//     border-radius: 10px;
//     border: ${({ $isActive }) => ($isActive ? '1px solid #8E59FF;' : 'none')};

//     @media (max-width: 768px) {
//         width: 100px;
//         height: 24px;
//         font-size: 0.8em;
//     }
// `;

// const PostListWrapper = styled.div`
//     width: 100%;
//     border-top: 3px solid #8E59FF;
//     padding-top: 1.5625em;
//     padding-bottom: 1.5625em;
//     display: flex;
//     flex-direction: column;
//     align-items: center;

//     @media (max-width: 768px) {
//         padding-top: 1em;
//         padding-bottom: 1em;
//     }
// `;

// const PostListItem = styled.div`
//     width: 100%;
//     box-sizing: border-box;
//     padding: 1em;
//     display: flex;
//     flex-direction: column;
//     border-bottom: 2px solid #E8E9EC;
//     gap: 0.8em;

//     @media (max-width: 768px) {
//         padding: 0.8em;
//         gap: 0.6em;
//     }
// `;

// const PostState = styled(PuppleButton)`
//     font-weight: 700;
//     width: 103px;
//     height: 1.5em;

//     @media (max-width: 768px) {
//         width: 90px;
//         height: 1.2em;
//         font-size: 0.8em;
//     }
// `;

// const PostTitle = styled.div`
//     font-weight: 800;
//     font-size: 1.25em;

//     @media (max-width: 768px) {
//         font-size: 1em;
//     }
// `;

// const PostText = styled.div`
//     font-weight: 700;
//     font-size: 1em;
//     max-height: 4.5em;
//     overflow: hidden;
//     text-overflow: ellipsis;
//     color: #A2A3B2;

//     @media (max-width: 768px) {
//         font-size: 0.9em;
//         max-height: 3.6em;
//     }
// `;

// const PostInfo = styled.div`
//     font-weight: 700;
//     font-size: 0.8125em;
//     color: #D0D1D9;

//     @media (max-width: 768px) {
//         font-size: 0.75em;
//     }
// `;
