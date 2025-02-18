import React, { useState, useEffect } from "react";
import styled from "styled-components";
import StudyCreateCalendar from "./StudyManageWeekCalendar";
import { useDispatch } from "react-redux";
import { setWeekData } from "../../../redux/slice/studymanageweek/studymanageweekSlice.jsx";

const StudyManageWeekPeriod = ({
  selectedWeek,
  weekData = [],
  onWeekDataChange,
}) => {
  const [studyPeriodStartDate, setStudyPeriodStartDate] = useState(null);
  const [studyPeriodEndDate, setStudyPeriodEndDate] = useState(null);
  const [isStudyPeriodActive, setIsStudyPeriodActive] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // 선택된 주차가 유효하고 주차 데이터가 존재할 경우
    if (selectedWeek >= 0 && weekData.length > selectedWeek) {
      const selectedWeekData = weekData[selectedWeek];
      setStudyPeriodStartDate(
        selectedWeekData?.studyPeriodStartDate
          ? new Date(selectedWeekData.studyPeriodStartDate)
          : null,
      );
      setStudyPeriodEndDate(
        selectedWeekData?.studyPeriodEndDate
          ? new Date(selectedWeekData.studyPeriodEndDate)
          : null,
      );
    }
  }, [selectedWeek, weekData]); 

  const formatDate = (date) => {
    // if (!(date instanceof Date) || isNaN(date.getTime())) {
    //   return "날짜를 선택해주세요";
    // }
    // const month = date.getMonth() + 1;
    // const day = date.getDate();
    // return `${month}월 ${day}일`;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleStudyStartDateChange = (date) => {
    const isoDateString = date ? date.toISOString() : null;
    setStudyPeriodStartDate(date);
    dispatch(
      setWeekData({
        weekIndex: selectedWeek,
        weekData: {
          ...weekData[selectedWeek],
          studyPeriodStartDate: isoDateString,
        },
      }),
    );
  };

  const handleStudyEndDateChange = (date) => {
    const isoDateString = date ? date.toISOString() : null;
    setStudyPeriodEndDate(date);
    dispatch(
      setWeekData({
        weekIndex: selectedWeek,
        weekData: {
          ...weekData[selectedWeek],
          studyPeriodEndDate: isoDateString,
        },
      }),
    );
  };

  return (
    
    <Container>
        <MainText>{selectedWeek + 1}주차 스터디 기한</MainText>
      {/* </Container> */}

      <ComponentWrapper>
        {isStudyPeriodActive && (
          <StudyCreateCalendar
            startDate={studyPeriodStartDate} // 시작날 전달
            endDate={studyPeriodEndDate} // 종료날 전달
            onStartDateChange={handleStudyStartDateChange}
            onEndDateChange={handleStudyEndDateChange}
            // onStartDateChange={handleStudyStartDateChange}
            // onEndDateChange={handleStudyEndDateChange}
          />
        )}

        <RightWrapper>
          <ContentWrapper>
            <Title>스터디 진행 기한</Title>
            <StudyButton
              onClick={() => setIsStudyPeriodActive(true)}
              isActive={isStudyPeriodActive}
            >
              입력하기
            </StudyButton>
            <PeriodWrapper>
              <Text>시작</Text>
              <Period>
                {studyPeriodStartDate ? formatDate(studyPeriodStartDate) : "--"}
              </Period>
              <Text>끝</Text>
              <Period>
                {studyPeriodEndDate ? formatDate(studyPeriodEndDate) : "--"}
              </Period>
            </PeriodWrapper>
          </ContentWrapper>
        </RightWrapper>
      </ComponentWrapper>
    </Container>
  );
};

export default StudyManageWeekPeriod;

const ComponentWrapper = styled.div`
  border: 1px solid #8e59ff;
  border-radius: 10px;
  width: 100%;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
      flex-direction: column;
      gap: 1em;
      padding-bottom: 1em;
    }
`;

const RightWrapper = styled.div`
  border-left: 1.2px solid #a2a3b2;
  height: 17em;
  display: flex;
  flex-direction: column;
  padding: 2em;

   @media (max-width: 768px) {
    margin-top: 2em;
    align-items: center;
    border: none;
    width: 100%;
  }

`;

const Title = styled.div`
  color: #8e59ff;
  font-weight: 800;
`;

const StudyButton = styled.div`
  margin: 1.2em 0;
  border-radius: 10px;
  width: 11em;
  height: 2.2308em;
  line-height: 2.2308em;
  text-align: center;
  background-color: ${(props) =>
    props.isActive ? "#8E59FF" : "rgba(142,89,255,0.5)"};
  background-color: ${(props) =>
    props.isActive ? "#8E59FF" : "rgba(142,89,255,0.5)"};
  color: white;
  font-size: 0.8125em;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0.2em 1em rgba(22, 26, 63, 0.2);
  }
  transition: all 0.3s ease;
`;

const PeriodWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled.div`
  border: 1px solid #8e59ff;
  border-radius: 10px;
  width: 5.0545em;
  height: 2.2054em;
  line-height: 2.2054em;
  text-align: center;
  color: #8e59ff;
  font-size: 0.8125em;
  font-weight: bold;
`;

const Period = styled.div`
  margin: 0 4em 0 1em;
  color: #161a3f;
  font-size: 0.8125em;
  font-weight: bold;
`;

const MainText = styled.div`
  
  @media (max-width: 768px) {
    font-size: 1.1em;
    margin-left: -27em;
  }
    color: #8e59ff;
  font-size: 1.25em;
  font-weight: 800;
`;
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.625em;
  margin: 1em 0;
`;
const ContentWrapper = styled.div`
  margin: 3.5em 0 3.5em 0em;
  display: flex;
  flex-direction: column;
`;
