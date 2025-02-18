import React from "react";
import styled from "styled-components";

const WeekTitle = ({ weekInfo, week }) => {
  return (
    <>
      {weekInfo && (
        <>
          <WeekStudySummary>
            <MainText>{week}주차</MainText>

            <Date>
              {weekInfo.studyPeriod.startDate} - {weekInfo.studyPeriod.endDate}
            </Date>
          </WeekStudySummary>

          <StudyCurriculumName>{weekInfo.title}</StudyCurriculumName>
          <StudyCurriculumDescreption>
            {weekInfo.content}
          </StudyCurriculumDescreption>
        </>
      )}
    </>
  );
};

export default WeekTitle;

const Date = styled.div`
  color: #a2a3b2;
  font-size: 0.8125em;
  font-weight: 700;
`;

const StudyCurriculumName = styled.div`
  font-weight: 600;
  font-size: 1.25em;
`;

const StudyCurriculumDescreption = styled.div`
  margin-top: 0.75em;
  font-size: 0.6875em;
  color: #161a3f;
  opacity: 80%;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 4;
  max-width: 200ch;
  max-height: calc(1.2em * 2);
  line-height: 1.2em;
`;

const MainText = styled.div`
  font-size: 1.25em;
  font-weight: 700;
  color: #8e59ff;
`;
const WeekStudySummary = styled.div`
  display: flex;
  margin-bottom: 1.5em;
  align-items: center;
  gap: 1em;
`;
