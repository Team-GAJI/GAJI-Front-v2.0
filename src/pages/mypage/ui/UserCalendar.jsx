import React, { useState } from "react";
import styled from "styled-components";
import PrevMonth from "../../../assets/icons/common/prevmonth.svg?react";
import NextMonth from "../../../assets/icons/common/nextmonth.svg?react";
import { Color } from "../../../components/container/Color";
import { PuppleButton } from "../../../components/button/Button";
import UserTaskList from "./UserTaskList";

const UserCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const monthName = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const days = ["S", "M", "T", "W", "T", "F", "S"];

  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const prevMonthLastDate = new Date(currentYear, currentMonth, 0).getDate();
  const nextMonthStartDay = (firstDayOfMonth + daysInMonth) % 7;

  const cells = [];

  const handleDateClick = (day) => {
    setSelectedDate(new Date(currentYear, currentMonth, day));
  };

  for (let i = firstDayOfMonth; i > 0; i--) {
    cells.push(
      <Cell key={`prev-${i}`} className="empty">
        {prevMonthLastDate - i + 1}
      </Cell>,
    );
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const isSelectedDate =
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear;

    cells.push(
      <Cell
        key={day}
        $isSelected={isSelectedDate}
        onClick={() => handleDateClick(day)}
      >
        {day}
      </Cell>,
    );
  }

  for (let i = 1; i <= (7 - nextMonthStartDay) % 7; i++) {
    cells.push(
      <Cell key={`next-${i}`} className="empty">
        {i}
      </Cell>,
    );
  }

  const prevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  return (
    <CalendarWrapper>
      <CalendarWrapper1>
        <Header>
          <StyledPrevMonth onClick={prevMonth} />
          <MonthYear>
            {`${year}년`} <Color>{`${monthName}`}</Color>
          </MonthYear>
          <StyledNextMonth onClick={nextMonth} />
        </Header>
        <Grid>
          {days.map((day, index) => (
            <Day key={index}>{day}</Day>
          ))}
          {cells}
        </Grid>
        <AddGoogleCalendarButton>구글 캘린더 연동하기</AddGoogleCalendarButton>
      </CalendarWrapper1>
      <UserTaskList selectedDate={selectedDate} />
    </CalendarWrapper>
  );
};

export default UserCalendar;

const StyledPrevMonth = styled(PrevMonth)`
  width: 0.61em;
  cursor: pointer;
`;

const StyledNextMonth = styled(NextMonth)`
  width: 0.61em;
  cursor: pointer;
`;

const CalendarWrapper = styled.div`
  width: 100%;
  display: grid;
  height: 28.125em;
  grid-template-columns: repeat(2, 1fr);
  border-top: 1px solid #d0d1d9;

  @media (max-width: 768px) {
    height: auto;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 1fr);
  }
`;

const CalendarWrapper1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  border-right: 1px solid #d0d1d9;
  padding-top: 3em;
  padding-right: 1em;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding-right: 0;
    border-right: none;
    border-bottom: 1px solid #d0d1d9;
    padding-bottom: 1em;
  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2em;
  margin-bottom: 2.5em;
`;

const MonthYear = styled.div`
  font-size: 1.25em;
  font-weight: 800;
`;

const Grid = styled.div`
  width: 100%;
  padding: 1em;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(7, 1fr);
  gap: 1em;
  font-size: 1em;
  place-items: center center;
`;

const Day = styled.div`
  padding: 0.625em;
  text-align: center;
  box-sizing: border-box;
`;

const Cell = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5em;
  width: 2.5em;
  padding: 0.625em;
  font-weight: ${(props) => (props.$isSelected ? "600" : "400")};
  color: ${(props) => (props.$isSelected ? "#ffffff" : "#000000")};
  background-color: ${(props) =>
    props.$isSelected ? "#8e59ff" : "transparent"};
  border-radius: ${(props) => (props.$isSelected ? "100%" : "none")};
  box-shadow: ${(props) =>
    props.$isSelected ? "0px 4px 0.625em rgba(129, 76, 161, 0.19)" : "none"};
  cursor: pointer;
  &.empty {
    color: #ccc;
  }
`;

const AddGoogleCalendarButton = styled(PuppleButton)`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 800;
  width: 12.38em;
  height: 2.44em;
  @media (max-width: 768px) {
    margin-bottom: 1em;
  }
`;
