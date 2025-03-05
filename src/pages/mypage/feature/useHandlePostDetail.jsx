import { useNavigate } from "react-router-dom";

export const useHandlePostDetail = () => {
  const navigate = useNavigate();

  return (postId, category) => {
    const categoryState = category === 3 ? "study" : "community";
    navigate(`/${categoryState}/detail/${postId}`);
  };
};
