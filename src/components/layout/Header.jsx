import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MenuIcon from "../../assets/icons/common/menuBar.svg?react";
import { useNavigate } from "react-router-dom";
import userProfileUrl from "../../assets/images/common/userProfile.png";

const Header = () => {
  const navigate = useNavigate();
  const [isAccessToken, setIsAccessToken] = useState();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    window.location.reload();
    setAccessToken(null);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    const timer = setTimeout(() => setMenuVisible(false), 3000);
    return () => clearTimeout(timer); // 3초후 자동으로 취소
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setIsAccessToken(true);
    }
  }, []);

  return (
    <HeaderWrapper>
      <RowWrapper>
        <StyledMenuIcon
          onClick={() => toggleMenu()}
          $menuVisible={menuVisible}
        />
        <MenuWrapper $menuVisible={menuVisible}>
          <Text onClick={() => navigate("/")}>홈</Text>
          <Text onClick={() => navigate("/study")}>스터디</Text>
          <Text onClick={() => navigate("/community")}>커뮤니티</Text>
        </MenuWrapper>
      </RowWrapper>
      {isAccessToken ? (
        <>
          <MyPageButton onClick={() => navigate("/mypage")} />
          <AuthButton onClick={handleLogout}>LOG OUT</AuthButton>
        </>
      ) : (
        <AuthButton onClick={() => navigate("/login")}>LOG IN</AuthButton>
      )}
    </HeaderWrapper>
  );
};

export default Header;
const HeaderWrapper = styled.div`
  box-sizing: border-box;
  z-index: 30;
  background-color: #fbfaff;
  position: fixed;
  box-sizing: border-box;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  width: 100%;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  padding-left: 3.1em;
  padding-right: 3.1em;
  overflow-x: hidden;
  @media (max-width: 768px) {
    width: 100%;
    height: 60px;
    justify-content: space-between;
    padding-left: 5%;
    padding-right: 5%;
  }
`;

const RowWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 4.25em;
  align-items: center;

  @media (max-width: 768px) {
    gap: 1em;
  }
`;

const MenuWrapper = styled.div`
  visibility: ${(props) => (props.$menuVisible ? "visible" : "hidden")};
  opacity: ${(props) => (props.$menuVisible ? "1" : "0")};
  transition:
    visibility 0.3s ease,
    opacity 0.3s ease;
  display: flex;
  gap: 4.25em;
  width: 100%;

  @media (max-width: 768px) {
    width: 5em;
    height: 100vh;
    flex-direction: column;
    gap: 3em;
    transform: ${(props) =>
      props.$menuVisible ? "translateX(0)" : "translateX(-100%)"};
    transition:
      transform 0.3s ease,
      visibility 0.3s ease,
      opacity 0.3s ease;
    align-items: start;
    position: fixed;
    top: 60px;
    left: 0;
    background-color: #fbfaff;
    padding-left: 5%;
  }
`;

const StyledMenuIcon = styled(MenuIcon)`
  width: 1em;
  height: 1em;
  cursor: pointer;
  fill: ${(props) => (props.$menuVisible ? "#8E59FF" : "#000000")};
  transition:
    fill 0.3s ease,
    opacity 0.3s ease,
    visibility 0.3s ease;

  @media (max-width: 768px) {
    width: 1em;
    height: 1em;
  }
`;

const Text = styled.div`
  font-size: 1em;
  color: #8e59ff;
  font-weight: 700;
  cursor: pointer;

  @media (max-width: 768px) {
    padding-left: 5%;
  }
`;

const AuthButton = styled.div`
  font-size: 0.8125em;
  width: 123px;
  border: 1px solid #161a3f;
  border-radius: 10px;
  font-weight: 800;
  padding: 0.8125em;
  text-align: center;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 100px;
    font-size: 0.75em;
    padding: 0.5em;
  }
`;

const MyPageButton = styled.div`
  cursor: pointer;
  width: 2.25em;
  height: 2.25em;
  border-radius: 100%;
  margin-right: 1em;
  background-image: url(${userProfileUrl});
  background-size: cover;
  border: 5px solid #fbfaff @media (max-width: 768px) {
    width: 2.25em;
    height: 2.25em;
  }
`;
