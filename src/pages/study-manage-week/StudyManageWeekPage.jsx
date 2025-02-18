import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

import StudyManageWeekManageDel from "../../assets/icons/studyManageWeek/StudyManageWeekDel.svg";
import StudyManageWeekManageManagePlus from "../../assets/icons/studyManageWeek/StudyManageWeekPlus.svg";

import ManageWeekBasics from "./ui/ManageWeekBasics.jsx";
import StudyMangeWeekPeriod from "./ui/StudyMangeWeekPeriod.jsx";
import ManageWeekeDetailed from "./ui/ManageWeekDetailed.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import { ContentWrapper70 } from "../../components/common/MediaWrapper.jsx";
// API
import { TaskAPI } from "./api/TaskAPI.jsx";
import { descriptionAPI } from "./api/descriptionAPI.jsx";
import { periodAPI } from "./api/period.jsx";
import { assignmentsAPI } from "./api/assignmentsAPI.jsx";
import { weekcountAPI } from "./api/weekcountAPI.jsx";

import { setWeekData } from "../../redux/slice/studymanageweek/studymanageweekSlice.jsx";
import { current } from "@reduxjs/toolkit";

const StudyManageWeekPage = () => {
  const [weeks, setWeeks] = useState([0]);

  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const sidebarRef = useRef(null);

  const assignmentsRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { weeksData = [] } = useSelector((state) => state.studyWeek);
  const [selectedWeek, setSelectedWeek] = useState(0);
  // const roomId = location.state?.roomId || null;
  
  const location = useLocation();
  const roomId = location.state?.roomId;
  const weekCount = location.state?.week; //주차 받아오기

  console.log(roomId);
  console.log("내가 선택한 주차 weeks",selectedWeek);

  useEffect(() => {
    console.log("roomId:", roomId);
    console.log("week:", weekCount);
  }, [roomId, weekCount]);

  useEffect(() => {
    if (weekCount && weekCount > 0) {
      const initialWeeks = Array.from(
        { length: weekCount },
        (_, index) => index,
      );
      setWeeks(initialWeeks);
    }
  }, [weekCount]);

  useEffect(() => {
    if (weeksData.length === 0) {
      const initialWeekData = [
        {
          basicInfo: { title: "1주차", description: "" },
          tasks: [],
          studyPeriodStartDate: null,
          studyPeriodEndDate: null,
          assignments: [],
        },
      ];

      dispatch(setWeekData({ weekIndex: 0, weekData: initialWeekData }));
      setSelectedWeek(0);
    }
  }, [dispatch, weeksData.length]);

  const handleSave = useCallback(async () => {
    const currentWeekData = weeksData[selectedWeek];
    alert("저장완료"); // -> 서버에 전송 후에 저장하기 나오게...
    if (!currentWeekData) {
      console.error("현재 주차 데이터가 없습니다.");
      return;
    }

    // 이름 및 설명
    const weekInfo = {
      title: currentWeekData.basicInfo.title,
      description: currentWeekData.basicInfo.description,
    };
    
    // 기한 정보
    // const periodInfo = {
    //   studyPeriodStartDate: currentWeekData.studyPeriodStartDate,
    //   studyPeriodEndDate: currentWeekData.studyPeriodEndDate,
    // };

    // 날짜 -1 수정 -> 네트워크 창에는 잘 전송되는 거 확인가능/ 콘솔창에서는 X -> 수정(급x)
    let studyPeriodStartDate = new Date(currentWeekData.studyPeriodStartDate);
    let studyPeriodEndDate = new Date(currentWeekData.studyPeriodEndDate);
    
    // 날짜가 제대로 설정되었는지 확인하고 하루를 추가
    studyPeriodStartDate.setDate(studyPeriodStartDate.getDate() + 1); // 1일 더하기
    studyPeriodEndDate.setDate(studyPeriodEndDate.getDate() + 1); // 1일 더하기
    const periodInfo = {
      studyPeriodStartDate: studyPeriodStartDate.toISOString(),
      studyPeriodEndDate: studyPeriodEndDate.toISOString(),
    };

    // 과제 등록
    const assignmentsInfo = {
      assignments: currentWeekData.assignments || [],
    };
    // const assignmentsInfo = {
    //     assignments:  assignmentsInfo.assignments || [],
    // };
    // 시작일과 종료일이 유효한지 확인
    if (!periodInfo.studyPeriodStartDate || !periodInfo.studyPeriodEndDate) {
      console.error("스터디 기간 정보가 누락되었습니다.");
      return;
    }

    try {
      // descriptionAPI 호출
      const descriptionResult = await descriptionAPI(
        roomId,
        selectedWeek,
        weekInfo,
      );
      console.log("설명 저장 완료:", descriptionResult);

      // periodAPI 호출
      const periodResult = await periodAPI(roomId, selectedWeek, periodInfo);
      console.log("스터디 기한 저장 완료:", periodResult);

      //assignmentsAPI 호출
      if (assignmentsInfo.assignments.length > 0) {
        const assignmentsResult = await assignmentsAPI(
          roomId,
          selectedWeek,
          assignmentsInfo,
        );
        console.log("등록한 과제 : ", assignmentsResult);
      } else {
        console.warn("과제가 비어 있습니다.");
      }
      // 입력한 데이터값 모두 보기
      console.log("roomId: ", roomId);
      console.log("현재 주차 데이터:", currentWeekData);
    } catch (error) {
      console.error("저장 중 오류 발생:", error);
    }
  }, [roomId, selectedWeek, weeksData]);

  const handleWeekDataChange = (field, value) => {
    const currentWeekData = weeksData[selectedWeek] || {
      basicInfo: { title: "", description: "" },
      tasks: [],
      studyPeriodStartDate: null,
      studyPeriodEndDate: null,
      assignments: [],
    };

    // 현재 주차 데이터 업데이트
    const updatedWeekData = {
      ...currentWeekData,
      basicInfo: {
        ...currentWeekData.basicInfo,
        [field]: value,
      },
      // 스터디 기한 업데이트
      ...(field === "studyPeriodStartDate" && { studyPeriodStartDate: value }),      
      ...(field === "studyPeriodEndDate" && { studyPeriodEndDate: value }),
      // 과제 업데이트 -> 0부터 시작
      ...(field === "assignments" && { assignments: value }), // assignments 업데이트 추가

      // assignments: field === 'assignments' ? value : currentWeekData.assignments,
    };

    const newWeeksData = weeksData.map((week, index) =>
      index === selectedWeek ? updatedWeekData : week,
    );
    dispatch(
      setWeekData({ weekIndex: selectedWeek, weekData: updatedWeekData }),
    );
  };

  const onWeekDataChange = (updatedWeekData) => {
    dispatch(
      setWeekData({
        weekIndex: selectedWeek,
        weekData: updatedWeekData[selectedWeek],
      }),
    );
  };

  const handleWeekSelect = (index) => {
    setSelectedWeek(index);
    console.log("주차 선택:", index);

    const currentWeekData = weeksData[index];
    console.log("선택한 주차 데이터:", currentWeekData);
  };
  const handleDelete = () => {
    if (weeks.length > 0) {
      const newWeeks = weeks.slice(0, -1);
      setWeeks(newWeeks);

      dispatch(deleteWeekData({ weekIndex: selectedWeek }));

      if (selectedWeek >= newWeeks.length) {
        setSelectedWeek(newWeeks.length - 1);
      }
    }
  };
  const handleAdd = () => {
    const newWeekIndex = weeks.length;
    setWeeks([...weeks, newWeekIndex]);

    // 새로운 주차 데이터 초기화
    const newWeekData = {
      basicInfo: { title: "", description: "" },
      tasks: [],
      studyPeriodStartDate: null,
      studyPeriodEndDate: null,
      assignments: [],
    };

    // 새로운 주차 데이터 설정
    dispatch(setWeekData({ weekIndex: newWeekIndex, weekData: newWeekData }));

    // 새로 생성한 주차 선택
    setSelectedWeek(newWeekIndex);
  };

  return (
    <>
      <PageHeader
        pageTitle="스터디 관리 페이지"
        subTitle="스터디장에게만 보이는 메뉴에요"
        headerTitles={["저장하기"]}
        activeButtonIndex={activeButtonIndex}
        onButtonClick={handleSave}
        changeColorOnClick={true}
        changeColorOnHover={true}
      />
      <RowWrapper>
        <ContentWrapper70>
          <ManageWeekBasics
            selectedWeek={selectedWeek}
            weekData={weeksData}
            onWeekDataChange={handleWeekDataChange}
            roomId={roomId}
          />

          <StudyMangeWeekPeriod
            selectedWeek={selectedWeek}
            weekData={weeksData}
            onWeekDataChange={handleWeekDataChange}
            roomId={roomId}
          />

          <ManageWeekeDetailed
            ref={assignmentsRef}
            selectedWeek={selectedWeek}
            weekData={weeksData}
            onWeekDataChange={handleWeekDataChange}
            roomId={roomId}
          />
        </ContentWrapper70>
        
        <Sidebar1 ref={sidebarRef}>
          {/* <BasicInfoButton onClick={() => navigate("/study/manage")}>
            기본정보
          </BasicInfoButton> */}
          {weeks.map((week, index) => (
            <React.Fragment key={week} >
              <SidebarButton1
                className={index === weeks.length - 1 ? "last-week" : ""}
                bold={index === selectedWeek}
                onClick={() => handleWeekSelect(index)}
              >
                <TextWrapper>{week + 1}주차</TextWrapper>
                {index === weeks.length - 1 && (
                  <DelIconWrapper>
                    <DelIcons
                      src={StudyManageWeekManageDel}
                      alt="삭제"
                      onClick={handleDelete}
                    />
                  </DelIconWrapper>
                )}
              </SidebarButton1>
            </React.Fragment>
          ))}
          <PlusButton onClick={handleAdd}>
            <PlusIcons src={StudyManageWeekManageManagePlus} alt="추가" />
          </PlusButton>
        </Sidebar1>
      </RowWrapper>
    </>
  );
};

export default StudyManageWeekPage;

const RowWrapper = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const DelIconWrapper = styled.div`
  visibility: hidden;
  margin-left: 0em;
  margin-bottom: -0.3em;
`;

const DelIcons = styled.img`
  width: 3em;
  height: auto;
`;

const Sidebar1 = styled.aside`
  overflow-y: auto;
  background-color: #fbfaff;
  display: flex;
  flex-direction: column;
  border: 1px solid #a2a3b2;
  border-radius: 0.5em;
  max-height: 200px;
  width: 11.25em;
  right: 3%;
  padding: 0.2em;
  padding-bottom: 1em;
  overflow-x: hidden;

  position: -webkit-sticky;
  position: sticky;
  top: 5em;
  margin-top: 4.75em;

  //스크롤 
  &::-webkit-scrollbar {
    height: 8px;
    background: none;
    width : 8px;
  }
  &:hover::-webkit-scrollbar-thumb {
    // width: 0.2px;
    border-radius: 30px;
    background-color: rgb(142, 89, 255, 0.5);
  }
    
  @media (max-width: 768px) {
    position: -webkit-sticky;
    position: sticky;
    top: 60px;
    left: 0;
    width: 100%;
    margin-left: 0;
    box-sizing: border-box;
    border: none;
    flex-direction: row;
    overflow-x: scroll;
    overflow-y: hidden;

    z-index: 10;
    height: 3em;
    max-height: 5em;
  }
`;

const TextWrapper = styled.div`
  flex: 1;
  text-align: center;
`;

const SidebarButton1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: #a2a3b2;
  font-weight: ${(props) => (props.bold ? "800" : "400")};
  padding: 0.4em 0em;
  border: 1px solid transparent;
  cursor: pointer;
  width: 100%;
  margin: 0.5em 0em;

  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: row;
    width: auto;
    min-width: 8em;
    padding: 0.5em 0.5em;
    margin-top: 0.5em;
  }

  &:hover {
    border: 1px solid #8e59ff;
    border-radius: 0.4em;
    color: #8e59ff;
    font-weight: 800;
  }

  &.last-week {
    margin-left: 1.5em;
  }

  &.last-week:hover {
    margin-left: 0;
    border: 1px solid #8e59ff;
    border-radius: 0.4em;
    color: #8e59ff;
    font-weight: 800;

    ${DelIconWrapper} {
      margin-right: 1em;
      visibility: visible;

      @media (max-width: 768px) {
        margin-left: 0.1em;
        margin-right: 0em;
      }
    }

    ${TextWrapper} {
      text-align: center;
    }
  }
`;

const BasicInfoButton = styled(SidebarButton1)`
  font-size: 1em;
  font-weight: 1.125em;
  background-color: #8e59ff;
  border: none;
  background-color: transparent;
  color: #a2a3b2;

  @media (max-width: 768px) {
    margin-left: 0.5em;
  }
`;

const PlusButton = styled.button`
  font-size: 1em;
  font-weight: 1.125em;
  background-color: #8e59ff;
  border: none;
  background-color: transparent;
  color: #a2a3b2;
  padding: 0.6em 0.625em;

  @media (max-width: 768px) {
    padding: 0.5em 0.5em;
    margin-top: 0em;
    margin-right: 3em;
  }
`;

const PlusIcons = styled.img`
  width: 1em;
  height: auto;
  transition: filter 0.3s;

  &:hover {
    filter: brightness(0) saturate(100%) invert(0%) sepia(85%) saturate(7497%)
      hue-rotate(246deg) brightness(105%) contrast(103%);
  }
`;
