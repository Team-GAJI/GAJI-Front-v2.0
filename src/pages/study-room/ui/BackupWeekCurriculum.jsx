import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { weekTaskProgressAPI } from "../api/weekTaskProgressAPI";
import { weekStudyInfoAPI } from "../api/weekStudyInfoAPI";
import { weekTaskListAPI } from "../api/weekTaskListAPI";

const WeekCurriculum = ({ roomId, week }) => {
  const [weekInfo, setWeekInfo] = useState();
  const [weekTaskProgress, setWeekTaskProgress] = useState();
  const [weekTaskListData, setWeekTaskListData] = useState();
  // const nicknames = [
  //   "릴규",
  //   "디오",
  //   "따마",
  //   "지민",
  //   "스타",
  //   "하나",
  //   "연두",
  //   "워치",
  //   "샤크",
  //   "연두2",
  // ];
  // const opacity = ["100%", "70%", "30%", "30%", "100%", "100%", "100%", "100%"];

  // const [hoveredNickname, setHoveredNickname] = useState(null);
  const [activeTask1, setActiveTask1] = useState(false); // task1
  const [activeTask2, setActiveTask2] = useState(false); // task2
  const [activeTask3, setActiveTask3] = useState(false); // task3
  const [taskCnt, setTaskCnt] = useState(3); // 남은 과제 개수
  const [taskComplete, setTaskComplete] = useState(0); // 내 과제 당성률 % 표시

  const handleTask1 = () => {
    if (activeTask1) {
      setActiveTask1(false);
      setTaskComplete(taskComplete - 33.3);
      setTaskCnt(taskCnt + 1);
    } else {
      setActiveTask1(true);
      setTaskComplete(taskComplete + 33.3);
      setTaskCnt(taskCnt - 1);
    }
  };
  const handleTask2 = () => {
    if (activeTask2) {
      setActiveTask2(false);
      setTaskComplete(taskComplete - 33.3);
      setTaskCnt(taskCnt + 1);
    } else {
      setActiveTask2(true);
      setTaskComplete(taskComplete + 33.3);
      setTaskCnt(taskCnt - 1);
    }
  };
  const handleTask3 = () => {
    if (activeTask3) {
      setActiveTask3(false);
      setTaskComplete(taskComplete - 33.3);
      setTaskCnt(taskCnt + 1);
    } else {
      setActiveTask3(true);
      setTaskComplete(taskComplete + 33.3);
      setTaskCnt(taskCnt - 1);
    }
  };

  // const truncateNickname = (nickname) => {
  //   return nickname.length > 3 ? `${nickname.slice(0, 3)}...` : nickname;
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weekInfoData = await weekStudyInfoAPI(roomId, week);
        const weekTaskData = await weekTaskProgressAPI(roomId, week);
        const weekTaskListData = await weekTaskListAPI(roomId, week);
        setWeekInfo(weekInfoData);
        setWeekTaskProgress(weekTaskData);
        setWeekTaskListData(weekTaskListData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [roomId, week]);
  return (
    <>
      {weekInfo && (
        <>
          <WeekStudySummary>
            <MainText>{week + 1}주차</MainText>

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
      <DivisionLine />

      <TaskContainer>
        {weekTaskListData && (
          <CurrentWeek>
            <p>이번주 과제</p>
            <TaskSquare>
              <TaskList>
                <TaskItem isActive={activeTask1} onClick={() => handleTask1()}>
                  과제 1
                </TaskItem>
                <TaskItem isActive={activeTask2} onClick={() => handleTask2()}>
                  과제 2
                </TaskItem>
                <TaskItem isActive={activeTask3} onClick={() => handleTask3()}>
                  과제 3
                </TaskItem>
              </TaskList>
            </TaskSquare>
          </CurrentWeek>
        )}
        <MyTask>
          <p>내 과제</p>
          <MyStudyData>
            <MyLeftSide>
              <Column>
                <TaskText>남은 과제</TaskText>
                <CountTaskText>{taskCnt}개</CountTaskText>
              </Column>
              <Column>
                <TaskText>마감 기한</TaskText>
                <Row>
                  <DayText>3월1일</DayText>
                  <DDayText>D - 5</DDayText>
                </Row>
              </Column>
            </MyLeftSide>

            <MyRightSide>{Math.round(taskComplete)}%</MyRightSide>
          </MyStudyData>
        </MyTask>
      </TaskContainer>

      {/* TODO : 스터디원 정보 불러오기 */}
      {/* <p>스터디원 달성도</p>
      <CircleContainer>
        <NinckNameList>
          {nicknames.map((nickname, index) => (
            <Circle
              key={index}
              style={{ opacity: opacity[index % opacity.length] }} // index에 따른 배경색 설정
              onMouseEnter={() => setHoveredNickname(nickname)}
              onMouseLeave={() => setHoveredNickname(null)}
            >
              <NickName className="default-text">
                {truncateNickname(nickname)}
              </NickName>
              {hoveredNickname === nickname && (
                <CloudyText>{nickname}</CloudyText>
              )}
            </Circle>
          ))}
        </NinckNameList>
        <TaskWrapper>
          <Row>
            <Task100 />
            <CloudyText>100%</CloudyText>
          </Row>
          <Row>
            <Task50 />
            <CloudyText>50%</CloudyText>
          </Row>
        </TaskWrapper>
      </CircleContainer> */}
    </>
  );
};

export default WeekCurriculum;

const Date = styled.div`
  color: #a2a3b2;
  font-size: 0.8125em;
  font-weight: 700;
`;

const StudyCurriculumName = styled.div`
  font-weight: 600;
  font-size: 1.25em;
`;

const CloudyText = styled.div`
  color: #a2a3b2;
  font-size: 0.9375em;
  font-weight: 700;
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
  max-height: calc(1.2em * 2); // 2줄 높이
  line-height: 1.2em;
`;

const NinckNameList = styled.div`
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  display: flex;
  gap: 1.25em;
  @media (max-width: 768px) {
    padding-bottom: 0.625em;
  }
`;

const CurrentWeek = styled.div`
  width: 100%;
  height: 100%;
`;

const MyTask = styled.div`
  width: 100%;
  height: 100%;
`;

const DivisionLine = styled.div`
  margin-bottom: 1em;
  margin-top: 1em;
  width: 100%;
  height: 1px;
  background-color: #a2a3b2;
  opacity: 20%;
`;

const MainText = styled.div`
  font-size: 1.25em;
  font-weight: 700;
  color: #8e59ff;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

const WeekStudySummary = styled(Row)`
  margin-bottom: 1.5em;
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

const TaskSquare = styled.div`
  width: 100%;
  height: 100%;
  border: 0.0625em solid #a2a3b2;
  border-radius: 1.25em;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25em;
  box-sizing: border-box;
  overflow-y: scroll;
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1em;
  font-weight: 700;
  color: #161a3f;
`;

const TaskItem = styled.div`
  position: relative;
  padding-left: 1.5625em;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 0.9375em;
    height: 0.9375em;
    background-color: ${(props) => (props.isActive ? "#8E59FF" : "#fff")};
    border: 0.0625em solid
      ${(props) => (props.isActive ? "#8E59FF" : "#8E59FF")};
    border-radius: 0.125em;
  }

  ${({ isActive }) =>
    isActive &&
    `
        color: #A2A3B2; 
        text-decoration: line-through;
    `}
`;

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

const CircleContainer = styled.div`
  display: flex;
  gap: 0.625em;
  margin-top: 1.875em;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.5em;
  height: 3.5em;
  border-radius: 50px;
  padding: 1em;
  box-sizing: border-box;
  background-color: #8e59ff;
  cursor: pointer;
`;

const NickName = styled.div`
  font-size: 0.8125em;
  color: #ffffff;
  @media (max-width: 768px) {
    font-size: 0.75em;
  }
`;

const TaskWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

const Task100 = styled.div`
  width: 1em;
  height: 1em;
  background: #8e59ff;
  border-radius: 2px;
`;

const Task50 = styled(Task100)`
  opacity: 50%;
`;

const MoreWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin-top: 3.75em;
  margin-bottom: 1.875em;
`;
