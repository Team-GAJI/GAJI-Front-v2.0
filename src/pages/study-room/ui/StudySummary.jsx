import React from "react";
import styled from "styled-components";
import Book from "../../../assets/images/studyRoom/Rectangle 34624913.png";
import DivisionLine from "./DivisionLine";

const StudySummary = ({ studyInfo }) => {
  return (
    <>
      <Container>
        <ColumnWrapper>
          <MainText>{studyInfo.name}</MainText>
          <CloudyText>
            {studyInfo.startDay} ~ {studyInfo.endDay}
          </CloudyText>
        </ColumnWrapper>

        <ColumnWrapper2>
          <OpenButton>모집중 D-{studyInfo.daysLeftForRecruit}</OpenButton>
          <CountText>{studyInfo.applicantCount}명 지원</CountText>
        </ColumnWrapper2>
      </Container>

      <StudyDescription>{studyInfo.description}</StudyDescription>
      <DescriptionDetail>자세히보기 &gt;</DescriptionDetail>

      <DivisionLine />
    </>
  );
};

export default StudySummary;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

const ColumnWrapper2 = styled(ColumnWrapper)`
  gap: 0.5em;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const MainText = styled.div`
  font-size: 1.25em;
  font-weight: 800;
  color: #8e59ff;
`;

const OpenButton = styled.div`
  background-color: #8e59ff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.625em;
  font-size: 0.8125em;
  font-weight: 700;
  text-align: center;
  padding: 0.45em 2em;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  margin-left: auto;
`;

const CloudyText = styled.div`
  color: #a2a3b2;
  font-size: 0.9375em;
  font-weight: 700;
`;

const StudyDescription = styled.div`
  color: #444765;
  font-size: 0.625em;
  font-weight: 700;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4; /* 4줄까지만 표시하고 이후에 ... 표시 */
  line-clamp: 4;
  max-width: 400ch;
  max-height: calc(1.2em * 4); /* 4줄의 높이 계산 */
  line-height: 1.2em;
`;

const CountText = styled.div`
  color: #a2a3b2;
  font-size: 0.9375em;
  font-weight: 700;
`;

const DescriptionDetail = styled.div`
  font-weight: 500;
  margin-top: 1em;
  font-size: 0.625em;
`;

export const MinorText = styled.h3`
  font-size: 1em;
  font-weight: 800;
`;
