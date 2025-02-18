import React from "react";
import styled from "styled-components";
import CheckBoxBlank from "./CheckBoxBlank";
import CheckBoxFill from "./CheckBoxFill";

const WeekTaskItem = ({ onClick, content, state }) => {
  return (
    <TaskItemWrapper onClick={onClick}>
      {state ? <CheckBoxFill /> : <CheckBoxBlank />}
      <TaskContent completed={state}>{content}</TaskContent>
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
