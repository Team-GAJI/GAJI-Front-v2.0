import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SideBar = ({ roomId, week, setCurrentWeek, studyInfo, isWriter }) => {
  const navigate = useNavigate();
  const handleManage = () => {
    navigate("/study/manage", {
      state: { roomId: roomId, studyInfo: studyInfo, week: week },
    });
  };

  return (
    <SidebarWrapper>
      <SidebarContainer>
        {[...Array(week)].map((_, index) => (
          <React.Fragment key={index}>
            <SidebarButton
              onClick={() => setCurrentWeek(index)}
              bold={index === 0}
            >
              {index + 1}주차
            </SidebarButton>
          </React.Fragment>
        ))}
      </SidebarContainer>

      {isWriter && (
        <SidebarManageButton onClick={handleManage}>
          스터디 관리
        </SidebarManageButton>
      )}
    </SidebarWrapper>
  );
};

export default SideBar;

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 0.0625em solid #a2a3b2;
  border-radius: 0.5em;
  padding: 0.5em 0.5em;
  background-color: #fbfaff;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0em 0em;
    font-size: 1em;
    border: none;
    flex-direction: row;
    height: 5em;
    width: 100%;
    justify-content: center;
  }
`;

const SidebarManageButton = styled.button`
  background-color: #8e59ff;
  border: 0.0625em solid #8e59ff;
  color: #fff;
  border-radius: 0.5em;
  font-weight: 700;
  padding: 0.75em;
  margin-top: 0.625em;
  box-sizing: border-box;
  @media (max-width: 768px) {
    display: none;
  }
`;

const SidebarButton = styled.button`
  background-color: transparent;
  color: #a2a3b2;
  font-weight: 1.125em;
  padding: 0.6em 0.625em;
  text-align: center;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color 0.3s;
  box-sizing: border-box;
  &:hover {
    border: 1px solid #8e59ff;
    border-radius: 0.5em;
    color: #8e59ff;
    margin-left: 0.4em;
    margin-right: 0.4em;
  }

  @media (max-width: 768px) {
    height: 2em;
    flex-direction: row;
    width: auto;
    min-width: 8em;
    padding: 0.5em 0.5em;
    margin-top: 0.5em;
    font-size: 1em;
  }
`;

const SidebarWrapper = styled.div`
  width: 10%;
  display: flex;
  flex-direction: column;
  gap: 1.25em;
  position: fixed;
  left: 5%;

  @media (max-width: 768px) {
    position: sticky;
    top: 3em;
    width: 100%;
    box-sizing: border-box;
    flex-direction: column;
    overflow-x: scroll;
    overflow-y: hidden;
    z-index: 10;
  }
`;
