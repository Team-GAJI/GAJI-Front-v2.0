import { debounce } from "lodash";

export const handleScroll = debounce((scrollRef, getPosts) => {
  if (!scrollRef.current) return; // scrollRef가 존재하지 않으면 실행하지 않음

  const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;

  // 바닥에 닿았을 때만 API 호출
  if (scrollTop + clientHeight >= scrollHeight - 200) {
    getPosts();
  }
}, 300);
