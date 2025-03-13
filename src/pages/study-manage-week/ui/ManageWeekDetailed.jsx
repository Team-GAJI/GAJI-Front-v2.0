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


const MAX_ASSIGNMENTS = 5; // 과제 5개만 하라고..예전에 말씀하셨는데 다시 확인해보기

const ManageWeekeDetailed = forwardRef(({ roomId, selectedWeek, onWeekDataChange, weekData }, ref) => {
  const dispatch = useDispatch();
  

  const assignmentsFromRedux = useSelector((state) => 
    state.studyWeek.weeksData[roomId]?.[selectedWeek]?.assignments || []
  );

  const [studyName, setStudyName] = useState("");
  const [localAssignments, setLocalAssignments] = useState([]);

  useEffect(() => {
    if (!roomId) return; // roomId와 상관없이 모든 과제가 동일하게 나옴 -> 수저함함

    const storageKey = `assignments-${roomId}-${selectedWeek}`;
    const savedAssignments = JSON.parse(localStorage.getItem(storageKey)) || [];

    if (assignmentsFromRedux.length === 0 && savedAssignments.length > 0) {
      dispatch(setWeekData({ roomId, weekIndex: selectedWeek, weekData: { assignments: savedAssignments } }));
    }

    setLocalAssignments(savedAssignments); 
  }, [roomId, selectedWeek, dispatch]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && studyName.trim() !== "") {
      e.preventDefault();

      
      if (localAssignments.length >= MAX_ASSIGNMENTS) {
        alert("최대 5개의 과제만 저장할 수 있습니다.");
        return;
      }

      const newAssignment = { assignmentId: null, name: studyName };

      const updatedAssignments = [...localAssignments, newAssignment];

      setLocalAssignments(updatedAssignments);
      localStorage.setItem(`assignments-${roomId}-${selectedWeek}`, JSON.stringify(updatedAssignments));

      dispatch(setWeekData({ roomId, weekIndex: selectedWeek, weekData: { assignments: updatedAssignments } }));
      onWeekDataChange("assignments", updatedAssignments);
      setStudyName("");
    }
  };

  // 과제 삭제 -> 나중에 API 
  const handleDeleteInput = (index) => {
    const newAssignments = localAssignments.filter((_, i) => i !== index);
    setLocalAssignments(newAssignments);
    localStorage.setItem(`assignments-${roomId}-${selectedWeek}`, JSON.stringify(newAssignments));

    dispatch(setWeekData({ roomId, weekIndex: selectedWeek, weekData: { assignments: newAssignments } }));
    onWeekDataChange("assignments", newAssignments);
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
            disabled={localAssignments.length >= MAX_ASSIGNMENTS} 
          />
        </InputWrapper>

        {/* 저장/입력된 과제 최대 5개까지 렌더링 */}
        {localAssignments.slice(0, MAX_ASSIGNMENTS).map((input, index) => (
          <InputWrapper key={index}>
            <InputStudyName value={input.name} readOnly />
            <Icons src={Delete} alt="삭제" onClick={() => handleDeleteInput(index)} />
          </InputWrapper>
        ))}
      </MainWrapper>
    </Container>
  );
});

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
