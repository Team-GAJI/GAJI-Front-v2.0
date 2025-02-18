import React, { useState, useEffect } from "react";
import styled from "styled-components";
import WeekTaskItem from "./WeekTaskItem";
import { weekTaskUpdate } from "../api/weekTaskUpdate";

const WeekTaskList = ({ taskList }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (taskList) {
      setTasks(taskList);
    }
  }, [taskList]);

  const handleCheck = async (assignmentId) => {
    try {
      const response = await weekTaskUpdate(assignmentId);

      if (response.success) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.assignmentId === assignmentId
              ? { ...task, completedStatus: !task.completedStatus }
              : task,
          ),
        );
      } else {
        console.error("과제 상태 업데이트 실패:", response.message);
      }
    } catch (error) {
      console.error("과제 상태 업데이트 중 오류 발생:", error);
    }
  };

  if (!tasks || tasks.length === 0) {
    return <div>과제가 없습니다.</div>;
  }

  return (
    <CurrentWeek>
      <p>이번주 과제</p>
      <TaskSquare>
        <TaskList>
          {tasks.map((task) => (
            <WeekTaskItem
              key={task.assignmentId}
              onClick={() => handleCheck(task.assignmentId)}
              content={task.content}
              state={task.completedStatus}
            />
          ))}
        </TaskList>
      </TaskSquare>
    </CurrentWeek>
  );
};

export default WeekTaskList;

const CurrentWeek = styled.div`
  width: 100%;
  height: 100%;
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

  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-behavior: smooth;
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1em;
  font-weight: 700;
  color: #161a3f;
`;
