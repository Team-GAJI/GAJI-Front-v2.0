import React, { useState } from "react";
import styled, { ThemeContext } from "styled-components";
import backgroundimage from "../../assets/images/login/background.png";
import Logo from "../../components/common/Logo";
import { Color } from "../../components/container/Color";
import { LoginButton } from "../../components/button/Button";
//import GoogleLogo from "../../assets/icons/login/googlelogo.svg?react";
import KakaoLogo from "../../assets/icons/login/kakaoIcon.svg?react";
import { useNavigate } from "react-router-dom";
//import { PuppleButton } from "../../components/button/Button";

const LoginPage = () => {
  const theme = ThemeContext;

  // const handleGoogleLogin = async () => {
  //   alert("준비중입니다.");
  // };

  const handleKakaoLogin = () => {
    const kakaoLoginUrl = `${import.meta.env.VITE_REACT_APP_SERVER_URL}oauth2/authorization/kakao`;
    window.location.href = kakaoLoginUrl;
  };

  return (
    <LoginWrapper image={backgroundimage}>
      <StyledLogo />
      <Title>
        가지고 싶은 스터디, <Color>GAJI</Color>
      </Title>
      <ColumnWrapper>
        <LoginButton backgroundColor="#FEE500" onClick={handleKakaoLogin}>
          <KakaoLogo />
          카카오로 시작하기
        </LoginButton>
        {/* <LoginButton onClick={handleGoogleLogin}>
          <GoogleLogo />
          구글로 로그인하기
        </LoginButton> */}
      </ColumnWrapper>

      <LoginFooter>@ Copyright 2025_52</LoginFooter>
    </LoginWrapper>
  );
};

export default LoginPage;

const LoginWrapper = styled.div`
  background-image: url(${(props) => props.image});
  background-size: cover;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5%;
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const Title = styled.div`
  font-size: 2em;
  font-weight: 700;
  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;

const LoginFooter = styled.div`
  position: fixed;
  bottom: 2.5em;
  color: #d0d1d9;
  font-size: 0.81em;
  text-align: center;
`;

const StyledLogo = styled(Logo)`
  width: 180px;
  @media (max-width: 768px) {
    width: 90px;
  }
`;
