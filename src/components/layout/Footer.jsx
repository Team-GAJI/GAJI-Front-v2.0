import React from "react";
import styled from "styled-components";
import Logo from "../../components/common/Logo";
import { Color } from "../container/Color";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <FooterWrapper>
      <RowWrapper>
        <Text onClick={() => navigate("/")}>홈</Text>
        <Text onClick={() => navigate("/study")}>스터디</Text>
        <Text onClick={() => navigate("/community")}>커뮤니티</Text>
        <Text onClick={() => navigate("/")}>로드맵</Text>
        <Text onClick={() => navigate("/")}>강의</Text>
        <Text onClick={() => navigate("/mypage")}>마이페이지</Text>
      </RowWrapper>
      <RowLogoWrapper>
        <StyledLogo />
        <LogoText>
          가지고 싶은 스터디, <Color>GAJI</Color>
        </LogoText>
      </RowLogoWrapper>
      <FooterText>@ Copyright 2024_GAJI</FooterText>
    </FooterWrapper>
  );
};

export default Footer;

const StyledLogo = styled(Logo)`
  width: 57px;

  @media (max-width: 768px) {
    width: 45px;
  }
`;

const FooterWrapper = styled.div`
  background-color: #e8e9ec;
  width: 100%;
  height: 277px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3.75em;

  @media (max-width: 768px) {
    height: auto;
    gap: 2em;
    padding: 1em 0;
  }
`;

const RowWrapper = styled.div`
  display: flex;
  gap: 3.75em;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    gap: 1em;
  }
`;

const RowLogoWrapper = styled(RowWrapper)`
  gap: 1.5em;

  @media (max-width: 768px) {
    gap: 0.75em;
  }
`;

const Text = styled.div`
  color: #697077;
  font-size: 0.8125em;
  font-weight: 400;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 0.75em;
  }
`;

const LogoText = styled.div`
  font-size: 1em;
  font-weight: 700;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 0.875em;
  }
`;

const FooterText = styled.div`
  color: #959595;
  font-size: 0.8125em;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 0.75em;
  }
`;
