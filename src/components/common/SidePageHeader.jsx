import React from "react";
import styled from "styled-components";
import { PuppleButton } from "../button/Button";
import backGroundUrl from "../../assets/images/mypage/mypageBackground.png";
import Logo from "./Logo";

const SidePageHeader = ({
  pageTitle,
  headerTitles,
  activeButtonIndex,
  onButtonClick,
  changeColorOnClick,
  changeColorOnHover,
}) => {
  return (
    <SidePageHeaderWrapper>
      <LogoHeader pageTitle={pageTitle}>
        <StyledLogo />
        <PageHeaderTitle>{pageTitle}</PageHeaderTitle>
      </LogoHeader>
      <Header pageTitle={pageTitle}>
        <PageHeaderTitle2>{pageTitle}</PageHeaderTitle2>
        <ButtonWrapper pageTitle={pageTitle}>
          {headerTitles.map((title, index) => (
            <StyledPuppleButton
              key={index}
              $isActive={activeButtonIndex === index}
              $changeColorOnClick={changeColorOnClick}
              $changeColorOnHover={changeColorOnHover}
              onClick={() => onButtonClick(index)}
            >
              {title}
            </StyledPuppleButton>
          ))}
        </ButtonWrapper>
      </Header>
    </SidePageHeaderWrapper>
  );
};

export default SidePageHeader;

const SidePageHeaderWrapper = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;
const StyledLogo = styled(Logo)`
  width: 5.5em;
`;
const LogoHeader = styled.div`
  display: flex;
  z-index: 2;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10em;
  gap: 1em;
  background-color: #fbfaff;
  background-image: url(${backGroundUrl});
  @media (max-width: 768px) {
    margin-bottom: ${({ large }) => (large ? "0" : "3em")};
  }
  @media (max-width: 1200px) {
    display: none;
  }
`;

const PageHeaderTitle = styled.div`
  font-size: 1.5em;
  font-weight: 800;
  color: #8e59ff;

  @media (max-width: 768px) {
    font-size: 1.25em;
    margin-top: 0.75em;
    margin-bottom: 1em;
  }
`;

const PageHeaderTitle2 = styled(PageHeaderTitle)`
  @media (min-width: 1200px) {
    display: none;
  }
`;

const Header = styled.div`
  display: flex;
  z-index: 2;
  position: fixed;
  top: 14em;
  right: 8em;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;

  @media (max-width: 1200px) {
    display: flex;
    z-index: 2;
    position: ${({ pageTitle }) =>
      pageTitle === "마이페이지" ? "fixed" : "relative"};
    top: ${({ pageTitle }) => (pageTitle === "마이페이지" ? "60px" : "")};
    left: ${({ pageTitle }) => (pageTitle === "마이페이지" ? "0px" : "")};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 10em;
    gap: 1em;
    background-color: #fbfaff;
    background-image: url(${backGroundUrl});
    @media (max-width: 768px) {
      margin-bottom: ${({ large }) => (large ? "0" : "3em")};
    }
  }
`;

const StyledPuppleButton = styled(PuppleButton)`
  box-sizing: border-box;
  width: 8em;
  height: 2.25em;
  font-weight: 700;
  background-color: ${({ $isActive }) =>
    $isActive ? "#8E59FF" : "rgba(137, 87, 255, 0.6)"};
  background-color: ${({ $changeColorOnClick, $isActive }) =>
    $changeColorOnClick && $isActive ? "#8E59FF" : "rgba(137, 87, 255, 0.6)"};

  &:hover {
    // background-color: ${({ $changeColorOnHover }) =>
      $changeColorOnHover ? "#8E59FF" : "rgba(137, 87, 255, 0.6)"};
    transform: translateY(-0.3em);
    box-shadow: 0 0.2em 1em rgba(22, 26, 63, 0.2);
  }
  transition: all 0.3s ease;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  justify-content: center;

  @media (max-width: 1200px) {
    flex-direction: row;
    display: ${({ large }) => (large ? "grid" : "flex")};
    grid-template-columns: ${({ large }) => (large ? "1fr 1fr" : "")};
    place-items: center center;
    width: auto;

    font-size: 1em;
  }
`;
