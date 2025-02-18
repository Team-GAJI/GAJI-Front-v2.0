import React, { useEffect, useState } from "react";
import styled from "styled-components";

const WeekMyProgress = ({ weekInfo, taskList = [] }) => {
  const [leftTaskCount, setLeftTaskCount] = useState(0);
  const [taskCompletionRate, setTaskCompletionRate] = useState(0);

  const countDDay = (endDate) => {
    if (!endDate || typeof endDate !== "string") return "D - ?";

    try {
      const endDateObj = new window.Date(`${endDate}T00:00:00`);

      if (isNaN(endDateObj.getTime())) {
        return "D - ?";
      }

      const dDay = Math.ceil(
        (endDateObj - new window.Date()) / (1000 * 60 * 60 * 24),
      );

      return `D${dDay >= 0 ? " - " : " + "}${Math.abs(dDay)}`;
    } catch (error) {
      console.error("countDDay 함수에서 오류 발생:", error);
      return "D - ?";
    }
  };

  useEffect(() => {
    if (!taskList || !Array.isArray(taskList) || taskList.length === 0) {
      setLeftTaskCount(0);
      setTaskCompletionRate(0);
      return;
    }

    const incompleteTasks = taskList.filter(
      (task) => !task.completedStatus,
    ).length;
    setLeftTaskCount(incompleteTasks);

    const completionRate =
      ((taskList.length - incompleteTasks) / taskList.length) * 100;
    setTaskCompletionRate(completionRate.toFixed(0)); // 소수점 2자리까지 반올림
  }, [taskList]);

  return (
    <TaskContainer>
      {taskList && (
        <MyTask>
          <p>내 과제</p>
          <MyStudyData>
            <MyLeftSide>
              <Column>
                <TaskText>남은 과제</TaskText>
                <CountTaskText>{leftTaskCount}개</CountTaskText>
              </Column>
              <Column>
                <TaskText>마감 기한</TaskText>
                {weekInfo && (
                  <Row>
                    <DayText>{weekInfo.studyPeriod.endDate}</DayText>
                    <DDayText>
                      {countDDay(weekInfo.studyPeriod.endDate)}
                    </DDayText>
                  </Row>
                )}
              </Column>
            </MyLeftSide>

            <MyRightSide>{taskCompletionRate}%</MyRightSide>
          </MyStudyData>
        </MyTask>
      )}
    </TaskContainer>
  );
};

export default WeekMyProgress;

const MyStudyData = styled.div`
  border-radius: 1.25em;
  display: flex;
  width: 100%;
  height: 100%;
  border: 0.0625em solid #a2a3b2;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const MyTask = styled.div`
  width: 100%;
  height: 100%;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

const Column = styled.div`
  display: flex;
  gap: 0.25em;
  flex-direction: column;
`;

const TaskContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 1em;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MyLeftSide = styled.div`
  width: 50%;
  border-right: 0.0625em solid #a2a3b2;
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em;
  padding-left: 2em;
`;

const TaskText = styled.div`
  font-weight: 600;
`;

const CountTaskText = styled.div`
  color: #8e59ff;
  font-weight: 600;
`;

const DDayText = styled.div`
  color: #8e59ff;
  font-weight: 600;
`;

const DayText = styled.div`
  color: #a2a3b2;
  font-weight: 600;
`;

const MyRightSide = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #8e59ff;
  font-weight: 800;
  font-size: 1.5em;
  padding: 0 auto;
  @media (max-width: 768px) {
    font-size: 1.5em;
  }
`;
