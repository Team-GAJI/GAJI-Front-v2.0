import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { setWeekData } from "../../../redux/slice/studymanageweek/studymanageweekSlice";
import Delete from "../../../assets/icons/studyManageWeek/StudyManageWeekDelete.png";

const ManageWeekeDetailed = forwardRef(
  ({ selectedWeek, onWeekDataChange, weekData }, ref) => {
    const [studyName, setStudyName] = useState("");
    const [localAssignments, setLocalAssignments] = useState([]);

    // localStorage에서 과제 데이터를 불러오기
    useEffect(() => {
      const savedAssignments = JSON.parse(localStorage.getItem(`assignments-${selectedWeek}`)) || [];
      setLocalAssignments(savedAssignments); // 저장된 과제 데이터를 상태로 설정
    }, [selectedWeek]);

    // 과제 추가
    // const handleKeyPress = (e) => {
    //   if (e.key === "Enter" && studyName) {
    //     e.preventDefault();
    //     const newAssignments = [...localAssignments, studyName];
    //     setLocalAssignments(newAssignments); // 상태 업데이트
    //     localStorage.setItem(`assignments-${selectedWeek}`, JSON.stringify(newAssignments)); // localStorage에 저장
    //     onWeekDataChange("assignments", newAssignments); // parent에 과제 변경 전달
    //     setStudyName(""); // 입력 필드 초기화
    //   }
    // };
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && studyName) {
        e.preventDefault();
        const newAssignments = [...localAssignments, { assignmentId: null, name: studyName }];
        setLocalAssignments(newAssignments);
        onWeekDataChange("assignments", newAssignments);
        setStudyName("");
      }
    };
    // 과제 삭제
    const handleDeleteInput = (index) => {
      const newAssignments = localAssignments.filter((_, i) => i !== index);
      setLocalAssignments(newAssignments); // 상태 업데이트
      localStorage.setItem(`assignments-${selectedWeek}`, JSON.stringify(newAssignments)); // localStorage에 저장
      onWeekDataChange("assignments", newAssignments); // parent에 변경된 과제 전달
    };

    return (
      <Container>
        <Text2>{selectedWeek + 1}주차 과제 등록</Text2>
        <MainWrapper>
          <InputWrapper>
            <InputMainStudyName
              placeholder="과제명을 입력해주세요"
              value={studyName}
              onChange={(e) => setStudyName(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </InputWrapper>

          {/* 입력/저장된 과제들 아래에 렌더링 */}
          {localAssignments.map((input, index) => (
            <InputWrapper key={index}>
              <InputStudyName value={input.name} readOnly />
              <Icons src={Delete} alt="삭제" onClick={() => handleDeleteInput(index)} />
            </InputWrapper>
          ))}

        </MainWrapper>
      </Container>
    );
  }
);

ManageWeekeDetailed.displayName = "ManageWeekeDetailed";
export default ManageWeekeDetailed;

const MainWrapper = styled.div`
  background-color: #fbfaff;
  display: flex;
  flex-direction: column;

  height: auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625em;
  width: 100%;
`;

const Text2 = styled.p`
  color: #8e59ff;
  font-size: 1.25em;
  font-weight: 800;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 0.625em;
`;

const InputStudyName = styled.input`
  background: none;
  border: none;
  border: 1px solid #8E59FF;

  border-radius: 0.5em;
  outline: none;
  height: 2.5em;
  font-size: 1em;
  padding-right: 2.5em;
  width: 100%;
  &::placeholder {
    color: #a2a3b2;
    font-size: 0.8125em;
    font-weight: 700;
  }
`;
const InputMainStudyName = styled.input`
  background: none;
  border: none;
  border: 1px solid #A2A3B2;
  border-radius: 0.5em;
  outline: none;
  height: 2.5em;
  font-size: 1em;
  padding-right: 2.5em;
  width: 100%;
  &::placeholder {
    color: #a2a3b2;
    font-size: 0.8125em;
    font-weight: 700;
  }
`;
const Icons = styled.img`
  position: absolute;
  top: 50%;
  right: 0.75em;
  transform: translateY(-50%);
  width: 1em;
  height: auto;
  cursor: pointer;
`;
