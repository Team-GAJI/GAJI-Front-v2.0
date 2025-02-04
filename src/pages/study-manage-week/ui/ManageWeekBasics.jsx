import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ManageWeekBasics = ({
  selectedWeek,
  weekData = [],
  onWeekDataChange,
}) => {
  const currentWeekData = weekData[selectedWeek] || {};
  const basicInfo = currentWeekData.basicInfo || { name: "", description: "" };

  const [studyName, setStudyName] = useState(basicInfo.name || "");
  const [studyDescription, setStudyDescription] = useState(
    basicInfo.description || "",
  );

  useEffect(() => {
    const updatedBasicInfo = currentWeekData.basicInfo || {
      name: "",
      description: "",
    };
    setStudyName(updatedBasicInfo.name || "");
    setStudyDescription(updatedBasicInfo.description || "");
  }, [currentWeekData]);

  // 변경 사항을 부모 컴포넌트로 전송하는 함수를 분리
  const handleStudyNameChange = (e) => {
    const value = e.target.value;
    setStudyName(value);
    // 여기서는 업데이트된 스터디 이름만 전송
    onWeekDataChange("name", value);
  };

  const handleStudyDescriptionChange = (e) => {
    const value = e.target.value;
    setStudyDescription(value);
    // 여기서는 업데이트된 스터디 설명만 전송
    onWeekDataChange("description", value);
  };

  const handleOnInput = (e, maxlength) => {
    const { target: { value }, } = e;
    if (value.length > maxlength) e.target.value = value.substr(0, maxlength);
  };

  return (
    <Container>
      <Text2>{selectedWeek + 1}주차 스터디 관리</Text2>
      <MainWrapper1>
        <InputWrapper>
          <InputStudyName
            placeholder={`${selectedWeek + 1} 주차 제목을 입력해주세요.`}
            value={studyName}
            onChange={handleStudyNameChange}
            maxLength="30"
            onInput={(e) => handleOnInput(e, 30)}

          />
          <CharCount  studyName={(studyName || "").length}>
            {(studyName || "").length}/30
          </CharCount>
        </InputWrapper>
        <DivisionLine2 />
        <RowContainer>
          <Container>
            <Text4>스터디 설명</Text4>
            <ExWrapper>
              <InputExStudy
                placeholder="설명을 입력해주세요"
                value={studyDescription}
                onChange={handleStudyDescriptionChange}
                maxLength="20000"
                onInput={(e) => handleOnInput(e, 20000)}
              />
              <ExStudyCharCount studyDescription={(studyDescription || "").length}>
                {(studyDescription || "").length}/20000
              </ExStudyCharCount>
            </ExWrapper>
          </Container>
        </RowContainer>
      </MainWrapper1>
    </Container>
  );
};

export default ManageWeekBasics;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.625em;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 0.3125em;
`;

/* 스터디 기본정보 */
const Text2 = styled.p`
  color: #8e59ff;
  font-size: 1.25em;
  font-weight: 800;
`;

const MainWrapper1 = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #8e59ff;
  border-radius: 0.5em;
  width: 100%;
  padding: 2.25em 3em;
  box-sizing: border-box;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const InputStudyName = styled.input`
  background: none;
  border: none;
  outline: none;
  font-size: 1em;
  font-family: "NanumSquareNeo";
  width: 100%;
  &::placeholder {
    color: #a2a3b2;
    font-size: 0.8125em;
    font-weight: 700;
  }
`;

const CharCount = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: ${(props) => (props.studyName >= 30 ? "red" : "#A2A3B2")};
  font-size: 0.8125em;
  font-weight: 700;
  text-align: right;
  right: 0em;

`;

const DivisionLine2 = styled.div`
  border-top: 1px solid #8e59ff;
  align-items: center;
  margin-top: 1em;
  width: 100%;
`;

const ExWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #a2a3b2;
  border-radius: 0.5em;
  width: 100%;
  // height: 14.375em;
  padding: 1.5em;
  box-sizing: border-box;
`;

const Text4 = styled.p`
  color: #8e59ff;
  font-size: 0.9375em;
  font-weight: 700;
  text-align: left;
  width: 100%;
`;

/* 스터디 설명 */
const InputExStudy = styled.textarea`
  background: none;
  border: none;
  
  outline: none;
  resize: none;
  font-size: 1em;
  width: 100%;
  // height: 14.375em;
  height : 200px;

  font-family: "NanumSquareNeo";
  
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

  &::placeholder {
    color: #a2a3b2;
    font-size: 0.8125em;
    font-weight: 500;
  }
`;

const ExStudyCharCount = styled.span`
  display: block;
  color: ${(props) => (props.studyDescription >= 20000 ? "red" : "#A2A3B2")};
  font-size: 0.8125em;
  font-weight: 700;
  text-align: right;
  margin-right: 0.625em;
  margin-top: 1em;
`;
