import React, { useState } from "react";
import styled from "styled-components";
import { Color } from "../../../components/container/Color";
import { PuppleButton } from "../../../components/button/Button";
import PlusIcon from "../../../assets/icons/mypage/plusIcon.svg?react";
import UserTaskCreateModal from "./UserTaskCreateModal";

const UserTaskList = ({ selectedDate }) => {
  const [isTaskModalOpen, setTaskModalOpen] = useState(false);
  const date = selectedDate;
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const dayName = dayNames[date.getDay()];
  const [studyData, setStudyData] = useState([
    {
      studyName: "웹 개발 스터디",
      startTime: "2024-09-25T09:00:00",
      endTime: "2024-09-25T11:00:00",
      task: {
        title: "프론트엔드 프로젝트",
        description: "Next.js와 Recoil을 사용한 블로그 애플리케이션 만들기",
        dueDate: "2024-10-01T23:59:59",
        isFinished: true,
      },
    },
    {
      studyName: "백엔드 개발 스터디",
      startTime: "2024-09-25T14:00:00",
      endTime: "2024-09-25T16:00:00",
      task: {
        title: "API 서버 구축",
        description: "Nest.js와 MongoDB를 사용한 REST API 서버 구축하기",
        dueDate: "2024-10-05T23:59:59",
        isFinished: false,
      },
    },
    {
      studyName: "코딩테스트 스터디",
      startTime: "2024-09-25T19:00:00",
      endTime: "2024-09-25T21:00:00",
      task: {
        title: "백준 알고리즘 문제풀이",
        description: "다이나믹 프로그래밍 문제 해결 및 복습",
        dueDate: "2024-10-10T23:59:59",
        isFinished: false,
      },
    },
  ]);

  //체크를 핸들하는 함수 변경전
  // const checkHandler = (index) => {
  //     const updatedStudyData = studyData.map((study, i) => {
  //         if (i === index) {
  //             return {
  //                 ...study,
  //                 task: {
  //                     ...study.task,
  //                     isFinished: !study.task.isFinished, // 상태 변경
  //                 },
  //             };
  //         }
  //         return study;
  //     });
  //     setStudyData(updatedStudyData); // 상태 업데이트
  // };

  //체크를 핸들하는 함수 변경후
  const toggleTaskCompletion = (index) => {
    setStudyData((prevData) =>
      prevData.map((study, i) =>
        i === index
          ? {
              ...study,
              task: { ...study.task, isFinished: !study.task.isFinished },
            }
          : study,
      ),
    );
  };

  const toggleTaskModal = () => {
    setTaskModalOpen((prev) => !prev);
    if (isTaskModalOpen) {
      taskSubmit();
    }
  };

  const extractTime = (isoString) => {
    const date = new Date(isoString);

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `- ${hours}:${minutes}`;
  };

  // 서버에 일정 추가
  const taskSubmit = () => {
    // 서버에 일정 추가 로직 구현
  };

  return (
    <>
      <TaskWrapper>
        <DateWrapper>
          {year}년{" "}
          <Color>
            {month}월 {day}일 ({dayName})
          </Color>
        </DateWrapper>

        <ListWrapper>
          {studyData &&
            studyData.map((study, index) => (
              <ListItemWrapper key={index}>
                {study.task.isFinished === true && (
                  <TimeLine>
                    <DueDate>{extractTime(study.task.dueDate)}</DueDate>
                    <VerticalLine />
                  </TimeLine>
                )}
                <ListItem $isChecked={study.task.isFinished}>
                  <ColumnWrapper $isChecked={study.task.isFinished}>
                    <StudyName $isChecked={study.task.isFinished}>
                      {study.studyName}
                    </StudyName>
                    <TaskTitle $isChecked={study.task.isFinished}>
                      {study.task.title}
                    </TaskTitle>
                    <Time $isChecked={study.task.isFinished}>
                      <DueDate>{extractTime(study.task.dueDate)}</DueDate>
                    </Time>
                  </ColumnWrapper>
                  <TaskCheckBox
                    $isChecked={study.task.isFinished}
                    type="checkbox"
                    checked={study.task.isFinished} // study.task.isFinished와 연동
                    onChange={() => toggleTaskCompletion(index)} // index를 전달하여 상태 변경
                  />
                  {study.task.isFinished && (
                    <TaskCheckBox2
                      onClick={() => toggleTaskCompletion(index)}
                    />
                  )}
                </ListItem>
              </ListItemWrapper>
            ))}
        </ListWrapper>

        <AddScheduleButton onClick={() => toggleTaskModal()}>
          <PlusIcon />
          {isTaskModalOpen ? "추가 완료" : "일정 추가하기"}
        </AddScheduleButton>
        {isTaskModalOpen && (
          <>
            <UserTaskCreateModal data={date} />
          </>
        )}
      </TaskWrapper>
    </>
  );
};

export default UserTaskList;

const TaskWrapper = styled.div`
  box-sizing: border-box;
  padding-top: 3em;
  position: relative;
  margin-left: 1em;
  padding-right: 1em;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1em;
  }
`;

const DateWrapper = styled.div`
  font-size: 1.25em;
  font-weight: 800;
  margin-bottom: 1em;
`;

const ListWrapper = styled.div`
  width: 100%;
  overflow-y: hidden;
  box-sizing: border-box;
  height: 20em;

  &:hover {
    overflow-y: scroll;
  }
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  background: ${({ $isChecked }) =>
    $isChecked ? "transparent" : "rgba(255, 255, 255, 0.5)"};
  box-shadow: ${({ $isChecked }) =>
    $isChecked ? "none" : "0px 2px 20px rgba(119, 106, 142, 0.1);"};
  border: ${({ $isChecked }) => ($isChecked ? "1px dashed #A2A3B2" : "none")};
  filter: ${({ $isChecked }) =>
    $isChecked
      ? "drop-shadow(0px 5px 20px rgba(209, 216, 220, 0.7));"
      : "none"};
  border-radius: 10px;
  padding: 1em;
  margin-bottom: 1em;
`;

const ListItemWrapper = styled.div`
  display: flex;
`;
const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6em;
`;

const TaskCheckBox = styled.input.attrs({ type: "checkbox" })`
  display: ${({ $isChecked }) => ($isChecked ? "none" : "flex")};
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  background-color: #ffffff;
  border: solid 0.25px #8e59ff;
  border-radius: 100%;

  &:checked {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 8 6' fill='%23FFFFFF' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M7.53003 0.220011C7.67048 0.360637 7.74937 0.551261 7.74937 0.750011C7.74937 0.948762 7.67048 1.13939 7.53003 1.28001L3.03003 5.78001C2.8894 5.92046 2.69878 5.99935 2.50003 5.99935C2.30128 5.99935 2.11065 5.92046 1.97003 5.78001L0.47003 4.28001C0.33755 4.13784 0.265426 3.94979 0.268855 3.75549C0.272283 3.56119 0.350995 3.3758 0.488408 3.23839C0.625821 3.10098 0.811206 3.02226 1.00551 3.01884C1.19981 3.01541 1.38785 3.08753 1.53003 3.22001L2.50003 4.19001L6.47003 0.220011C6.61066 0.079561 6.80128 0.000671387 7.00003 0.000671387C7.19878 0.000671387 7.3894 0.079561 7.53003 0.220011Z' fill='%23FFFFFF'/%3E%3C/svg%3E%0A");
    background-size: 40% 40%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #8e59ff;
  }
`;

const TaskCheckBox2 = styled.div`
  background: #a2a3b2;
  width: 1.5em;
  height: 1.5em;
  border-radius: 100%;
  cursor: pointer;
`;

const StudyName = styled.div`
  width: fit-content;
  font-size: 1em;
  font-weight: 700;
  color: #ffffff;
  padding: 0.5em;
  box-sizing: border-box;
  background: ${({ $isChecked }) => ($isChecked ? "#A2A3B2" : "#8e59ff")};
  border-radius: 10px;
`;

const Time = styled.div`
  display: ${({ $isChecked }) => ($isChecked ? "none" : "flex")};
  font-weight: 700;
  color: #a2a3b2;
`;

const DueDate = styled.span`
  font-size: 1rem;
  color: #a2a3b2;
`;

const TaskTitle = styled.div`
  font-size: 1em;
  font-weight: 600;
  color: ${({ $isChecked }) => ($isChecked ? "#A2A3B2" : "#161a3f;")};
  text-decoration: ${({ $isChecked }) =>
    $isChecked ? "line-through" : "none"};
`;

const AddScheduleButton = styled(PuppleButton)`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 800;
  width: 12.38em;
  height: 2.44em;
  gap: 0.25em;
`;

const TimeLine = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125em;
  align-items: center;
`;

const VerticalLine = styled.div`
  height: 50%;
  width: 0.5px;
  background: #a2a3b2;
`;
