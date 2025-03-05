import axios from "axios";

// localStorage에서 accessToken 가져오기
export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

// localStorage에서 refreshToken 가져오기
export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

// axios 인스턴스 생성
export const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_SERVER_URL_API,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 요청 인터셉터: 매 요청마다 Authorization 헤더에 accessToken 추가
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// refreshToken을 이용한 accessToken 갱신 함수
const refreshAccessToken = async () => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new Error("리프레시 토큰이 없습니다.");

    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_SERVER_URL_API}/auth/refresh`,
      { refreshToken },
    );

    const newAccessToken = response.data.accessToken;

    // 새로운 accessToken을 localStorage에 저장
    localStorage.setItem("accessToken", newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.error("토큰 갱신 실패:", error);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login"; // 로그인 페이지로 이동
    return null;
  }
};

// 응답 인터셉터: 401 에러 발생 시 자동으로 토큰 갱신 후 요청 재시도
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // accessToken 만료로 401 에러 발생 시
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // 무한 루프 방지

      const newToken = await refreshAccessToken();
      if (newToken) {
        // 새로운 토큰을 설정 후 요청 재시도
        api.defaults.headers.Authorization = `Bearer ${newToken}`;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest); // 요청 재시도
      }
    }
    return Promise.reject(error);
  },
);
