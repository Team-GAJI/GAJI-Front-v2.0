import React, { useState } from "react";
import { CheckBox } from "../../../components/input/CheckBox";
import styled from "styled-components";

const UserTaskCreateModal = ({ date }) => {
  const [timeState, setTimeState] = useState(["오전", "오후"]);
  const [hourState, setHourState] = useState([
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
  ]);
  const [minuteState, setMinuteState] = useState(
    Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0")),
  );

  const [startTime, setStartTime] = useState({
    time: "오후",
    hour: "15",
    minute: "00",
  });
  const [endTime, setEndTime] = useState({
    time: "오후",
    hour: "17",
    minute: "00",
  });

  const handleTimeChange = (type, key, value) => {
    if (type === "start") {
      setStartTime({ ...startTime, [key]: value });
    } else {
      setEndTime({ ...endTime, [key]: value });
    }
  };

  return (
    <>
      <AddTaskModal>
        <Title1>일정 추가하기</Title1>
        <Description>일정은 하루에 10개 추가할 수 있어요</Description>
        <Line />
        <Title2>일정 제목</Title2>
        <NewTaskTitle placeholder="일정 명을 입력해주세요" />
        <Title2>시간 설정</Title2>
        <RowWrapper>
          <Text>시작</Text>
          <TimeSelectWrapper>
            <Select
              value={startTime.time}
              onChange={(e) =>
                handleTimeChange("start", "time", e.target.value)
              }
            >
              {timeState.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </Select>
            <Select
              value={startTime.hour}
              onChange={(e) =>
                handleTimeChange("start", "hour", e.target.value)
              }
            >
              {hourState.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </Select>
            <span>:</span>
            <Select
              value={startTime.minute}
              onChange={(e) =>
                handleTimeChange("start", "minute", e.target.value)
              }
            >
              {minuteState.map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </Select>
          </TimeSelectWrapper>
          <Text>끝</Text>
          <TimeSelectWrapper>
            <Select
              value={endTime.time}
              onChange={(e) => handleTimeChange("end", "time", e.target.value)}
            >
              {timeState.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </Select>
            <Select
              value={endTime.hour}
              onChange={(e) => handleTimeChange("end", "hour", e.target.value)}
            >
              {hourState.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </Select>
            <span>:</span>
            <Select
              value={endTime.minute}
              onChange={(e) =>
                handleTimeChange("end", "minute", e.target.value)
              }
            >
              {minuteState.map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </Select>
          </TimeSelectWrapper>
        </RowWrapper>
        <RowWrapper>
          <RepeatCheck />
          <Text>반복 일정</Text>
          <Description2>일정을 매주 반복합니다</Description2>
        </RowWrapper>
      </AddTaskModal>
    </>
  );
};

export default UserTaskCreateModal;

const AddTaskModal = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  box-sizing: border-box;
  padding: 2em;
  width: 100%;
  height: 75%;
  z-index: 1;
  color: #161a3f;
  background: #ffffff;
  box-shadow: 0px 2px 20px rgba(119, 106, 142, 0.1);
  border-radius: 10px;
  @media (max-width: 768px) {
    top: 4em;
  }
`;

const RepeatCheck = styled(CheckBox)`
  width: 1em;
  height: 1em;
  margin-right: 0.8125em;
  box-sizing: border-box;
`;

const Title1 = styled.div`
  font-size: 1.25em;
  font-weight: 800;
`;

const Description = styled.div`
  margin-top: 1em;
  font-size: 0.8125em;
  font-weight: 700;
  color: #a2a3b2;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #d0d1d9;
  margin-top: 0.625em;
`;

const Title2 = styled.div`
  margin-top: 1em;
  font-weight: 700;
`;

const NewTaskTitle = styled.input`
  width: 100%;
  height: 2em;
  border: 1px solid #d0d1d9;
  border-radius: 10px;
  box-sizing: border-box;
  margin-top: 0.5625em;
  font-size: 0.8125em;
  padding-left: 1em;

  &::placeholder {
    color: #d0d1d9;
  }

  &:focus {
    outline: none;
  }
`;

const RowWrapper = styled.div`
  width: 100%;
  margin-top: 1.25em;
  display: flex;
  align-items: center;
`;

const Text = styled.div`
  font-size: 0.8125em;
  font-weight: 700;
`;

const TimeSelectWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1.375em;
  margin-right: 1.375em;
  background-color: #f0f0f5;
  border-radius: 10px;
  padding: 0.5em;
`;

const Select = styled.select`
  border: none;
  background-color: transparent;
  font-size: 0.8125em;
  color: #8e59ff;
  font-weight: 700;
  appearance: none;
  margin-right: 0.5em;

  &:focus {
    outline: none;
  }
`;

const Description2 = styled.div`
  font-size: 0.8125em;
  color: #d0d1d9;
  margin-left: 0.625em;
`;
