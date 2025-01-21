import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { studyInfoAPI } from "../api/studyInfoAPI";
import UserStudySection from "./UserStudySection";

const UserStudyList = ({ ongoingStudyList, endedStudyList }) => {
  const navigate = useNavigate();

  const handleStudyRoom = async (roomId) => {
    try {
      const response = await studyInfoAPI(roomId);
      navigate("/study/room", { state: { data: response, roomId: roomId } });
    } catch (error) {
      alert("스터디룸 정보 불러오기에 실패했습니다.");
      console.error("Error fetching study room info:", error);
    }
  };

  return (
    <StudyListWrapper>
      <UserStudySection
        title="현재 스터디룸"
        studyList={ongoingStudyList}
        handleStudyRoom={handleStudyRoom}
      />
      <UserStudySection
        title="이전 스터디룸"
        studyList={endedStudyList}
        handleStudyRoom={handleStudyRoom}
      />
    </StudyListWrapper>
  );
};

export default UserStudyList;

const StudyListWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 2em;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
