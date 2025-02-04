import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getSetUserId } from "./api/getSetUserId";

const KakaoRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 현재 URL에서 access_token 추출
    const queryParams = new URLSearchParams(location.search);
    const accessToken = queryParams.get("access_token");

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      //이부분 수정
      localStorage.setItem("userId", 1);
      // getSetUserId();

      // 메인 페이지로 이동
      navigate("/");
    } else {
      console.error("액세스 토큰이 없습니다.");
      navigate("/login"); // 토큰이 없으면 로그인 페이지로 이동
    }
  }, [location, navigate]);

  return <div>카카오 로그인 중...</div>;
};

export default KakaoRedirect;
