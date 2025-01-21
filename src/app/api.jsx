import axios from "axios";

// localStorage에서 accessToken 가져오기
export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

// localStorage에서 refreshToken 가져오기 (필요시 사용 가능)
export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_SERVER_URL_API,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api2 = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_SERVER_URL_API,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터를 사용해 매 요청마다 Authorization 헤더에 토큰 추가
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      console.error("Access token이 없습니다.");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
