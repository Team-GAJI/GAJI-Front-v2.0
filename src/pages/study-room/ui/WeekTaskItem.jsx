import React, { useState } from "react";
import styled from "styled-components";
import CheckBoxBlank from "./CheckBoxBlank";
import CheckBoxFill from "./CheckBoxFill";
import { weekTaskUpdate } from "../api/weekTaskUpdate";

const WeekTaskItem = ({ id, content, state }) => {
  const [isCompletedUi, setIsCompletedUi] = useState(state);

  const handleCheck = async (assignmentId) => {
    try {
      const response = await weekTaskUpdate(assignmentId);

      if (response) {
        setIsCompletedUi(true);
        return;
      }
    } catch (error) {
      console.error("과제 상태 업데이트 중 오류 발생:", error);
    }
  };
  return (
    <TaskItemWrapper onClick={() => handleCheck(id)}>
      {isCompletedUi ? <CheckBoxFill /> : <CheckBoxBlank />}
      <TaskContent completed={isCompletedUi}>{content}</TaskContent>
    </TaskItemWrapper>
  );
};

export default WeekTaskItem;

const TaskItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
  cursor: pointer;
`;

const TaskContent = styled.div`
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
  color: ${({ completed }) => (completed ? "#a2a3b2" : "#161a3f")};
  font-weight: 600;
`;
