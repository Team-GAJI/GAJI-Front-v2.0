import React from "react";
import styled from "styled-components";
import { Scroll } from "../../../components/common/Scroll";
import { Color } from "../../../components/container/Color";
//import studyProfileUrl from "../../../assets/images/common/studyExampleImage.png";

const UserStudySection = ({ title, studyList, handleStudyRoom }) => (
  <SectionWrapper>
    <RowWrapper>
      <SectionTitle>{title}</SectionTitle>
    </RowWrapper>
    <ListWrapper>
      {studyList && studyList.length > 0 ? (
        studyList.map((study) => (
          <ListItem
            key={study.roomId}
            onClick={() => handleStudyRoom(study.roomId)}
          >
            {/* <StudyProfile src={study.thumbnail_url || studyProfileUrl} alt="Study Profile" /> */}
            <ColumnWrapper>
              <StudyName>{study.name}</StudyName>
              <StudyText>{study.description}</StudyText>
              <StudyDate>시작일: {study.studyStartDay}</StudyDate>
            </ColumnWrapper>
          </ListItem>
        ))
      ) : (
        <NoDataText>현재 진행 중인 스터디룸이 없습니다.</NoDataText>
      )}
    </ListWrapper>
  </SectionWrapper>
);

export default UserStudySection;

const SectionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const ListWrapper = styled(Scroll)`
  box-sizing: border-box;
  height: 20em;
  border: 1px solid #8e59ff;
  border-radius: 20px;
  padding: 2.5em;
  display: flex;
  flex-direction: column;
  gap: 1em;

  &:hover {
    overflow-y: scroll;
  }

  @media (max-width: 768px) {
    padding: 1.5em;
    height: auto;
  }
`;

const ListItem = styled.div`
  display: flex;
  gap: 1em;
  border-bottom: 1px solid #8e59ff;
  padding-bottom: 1.25em;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5em;
    padding-bottom: 0.75em;
  }
`;

const RowWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

const SectionTitle = styled(Color)`
  font-weight: 800;
  font-size: 1.25em;

  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

const StudyName = styled.div`
  font-size: 1em;
  font-weight: 700;
`;

const StudyText = styled.div`
  font-size: 0.875em;
  font-weight: 500;
  color: #7e7d80;
`;

const StudyDate = styled.div`
  font-size: 0.875em;
  font-weight: 500;
  color: #a2a3b2;
`;

// const StudyProfile = styled.img`
//   width: 3em;
//   height: 3em;
//   object-fit: cover;
//   border-radius: 5px;
//   margin-bottom: 0.5em;

//   @media (max-width: 768px) {
//     width: 5em;
//     height: 5em;
//   }
// `;

const NoDataText = styled.div`
  font-size: 1em;
  font-weight: 700;
  color: #7e7d80;
  text-align: center;
  margin-top: 1em;
`;
