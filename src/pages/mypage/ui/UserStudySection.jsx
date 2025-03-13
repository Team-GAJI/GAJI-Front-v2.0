import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Color } from "../../../components/container/Color";
import { endedStudyListAPI, ongoingStudyListAPI } from "../api/myStudyListAPI";

const UserStudySection = ({ title, studyList, handleStudyRoom }) => {
  const [studyListState, setStudyListState] = useState(studyList || []);
  const [listSize, setListSize] = useState(10); // 초기 size 10
  const [ongoingHasNext, setOngoingHasNext] = useState(true);
  const [endedHasNext, setEndedHasNext] = useState(true);

  const getStudyLists = useCallback(async () => {
    try {
      let newStudyData = [];

      if (title === "현재 스터디룸") {
        newStudyData = await ongoingStudyListAPI(listSize);
        if (newStudyData.length > 0) {
          setStudyListState(newStudyData);
          setOngoingHasNext(true);
        } else {
          setOngoingHasNext(false);
        }
      } else if (title === "이전 스터디룸") {
        newStudyData = await endedStudyListAPI(listSize);
        if (newStudyData.length > 0) {
          setStudyListState(newStudyData);
          setEndedHasNext(true);
        } else {
          setEndedHasNext(false);
        }
      }
    } catch (error) {
      console.error("데이터 가져오기 실패:", error.message);
      if (title === "현재 스터디룸") setOngoingHasNext(false);
      else setEndedHasNext(false);
    }
  }, [title, listSize]);

  // 첫 렌더링 및 size 변경 시 데이터 불러오기
  useEffect(() => {
    getStudyLists();
  }, [listSize]);

  return (
    <SectionWrapper>
      <RowWrapper>
        <SectionTitle>{title}</SectionTitle>
      </RowWrapper>
      <ListWrapper>
        {studyListState.length > 0 ? (
          studyListState.map((study) => (
            <ListItem
              key={study.roomId}
              onClick={() => handleStudyRoom(study.roomId)}
            >
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
      {title === "현재 스터디룸" && ongoingHasNext && (
        <LoadMoreButton onClick={() => setListSize((prev) => prev + 10)}>
          더 보기
        </LoadMoreButton>
      )}

      {title === "이전 스터디룸" && endedHasNext && (
        <LoadMoreButton onClick={() => setListSize((prev) => prev + 10)}>
          더 보기
        </LoadMoreButton>
      )}
    </SectionWrapper>
  );
};

export default UserStudySection;

// 스타일 정의
const SectionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const ListWrapper = styled.div`
  box-sizing: border-box;
  height: 20em;
  border: 1px solid #8e59ff;
  border-radius: 20px;
  padding: 2.5em;
  display: flex;
  flex-direction: column;
  gap: 1em;
  overflow-y: auto;

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

const NoDataText = styled.div`
  font-size: 1em;
  font-weight: 700;
  color: #7e7d80;
  text-align: center;
  margin-top: 1em;
`;

const LoadMoreButton = styled.button`
  margin: 1em auto;
  padding: 0.75em 1.5em;
  font-size: 1em;
  font-weight: 600;
  color: white;
  background-color: #8e59ff;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #6e40cc;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;
