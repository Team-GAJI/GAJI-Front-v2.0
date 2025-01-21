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

      <StudyDocument>
        <DataGridContainer>
          {studyInfo.materialList &&
            studyInfo.materialList.map((material) => (
              <StudyData key={material.index}>
                <LeftSide />
                <RightSide>
                  <StudyText>제목</StudyText>
                  <Textarea placeholder="설명을 입력하세요" />
                </RightSide>
              </StudyData>
            ))}
          {!studyInfo.materialList && (
            <BlankMaterialList>스터디 자료가 없습니다</BlankMaterialList>
          )}
          {studyInfo.materialList && studyInfo.materialList.length === 0 && (
            <BlankMaterialList>스터디 자료가 없습니다</BlankMaterialList>
          )}
        </DataGridContainer>
      </StudyDocument>
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

const BlankMaterialList = styled.div`
  width: 100%;
  font-size: 0.8125em;
  color: #a2a3b2;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.5em;
`;

const StudyDocument = styled.div`
  margin-top: 2.625em;
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

const DataGridContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 0.875em;
  width: 100%;
`;

const StudyData = styled.div`
  min-width: 13.75em;
  height: 5.0625em;
  border: 0.0625em solid #8e59ff;
  border-radius: 0.625em;
  display: flex;
  position: relative;
`;

const LeftSide = styled.div`
  width: 50%;
  height: 100%;
  background-image: url(${Book});
  background-size: cover;
  background-position: center;
  border-bottom-left-radius: 0.625em;
  border-top-left-radius: 0.625em;
`;

const RightSide = styled.div`
  width: 50%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 0.3125em;
`;

const StudyText = styled.div`
  font-size: 0.9125em;
  font-weight: 800;
  margin-top: 1.25em;
`;

const Textarea = styled.textarea`
  width: calc(100% - 2.5em);
  height: calc(100% - 2.5em);
  resize: none;
  border: none;
  font-size: 0.875em;
  margin-top: 0.125em;
  outline: none;
  overflow: hidden;
`;

export const MinorText = styled.h3`
  font-size: 1em;
  font-weight: 800;
`;
