import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import DownArrowIcon from "../../../assets/icons/communityWrite/purpleDownArrow.svg?react";
import { setCategory } from "../../../redux/slice/community/communityWriteSlice";

const WriteSelectBox = () => {
  // 필터 상태 관리
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);
  const [selectedCategoryOption, setSelectedCategoryOption] =
    useState("카테고리");

  // Redux 상태 관리
  const dispatch = useDispatch();

  // 필터 버튼 텍스트
  const toggleCategoryVisibility = () => {
    setIsCategoryVisible(!isCategoryVisible);
  };

  // 카테고리 선택
  const handleCategorySelect = (option) => {
    setSelectedCategoryOption(option);
    setIsCategoryVisible(false);
    dispatch(setCategory(option));
  };

  return (
    <SelectWrapper>
      {/* 버튼 */}
      <StyledButton onClick={toggleCategoryVisibility}>
        <Text>{selectedCategoryOption}</Text>
        <StyledDownArrowIcon isVisible={isCategoryVisible} />
      </StyledButton>
      {/* 옵션 */}
      <OptionWrapper isVisible={isCategoryVisible}>
        <StyledOption
          onClick={() => handleCategorySelect("개발")}
          isSelected={selectedCategoryOption === "개발"}
        >
          개발
        </StyledOption>
        <StyledOption
          onClick={() => handleCategorySelect("인공지능")}
          isSelected={selectedCategoryOption === "인공지능"}
        >
          인공지능
        </StyledOption>
        <StyledOption
          onClick={() => handleCategorySelect("하드웨어")}
          isSelected={selectedCategoryOption === "하드웨어"}
        >
          하드웨어
        </StyledOption>
        <StyledOption
          onClick={() => handleCategorySelect("보안")}
          isSelected={selectedCategoryOption === "보안"}
        >
          보안
        </StyledOption>
        <StyledOption
          onClick={() => handleCategorySelect("네트워크-클라우드")}
          isSelected={selectedCategoryOption === "네트워크-클라우드"}
        >
          네트워크-클라우드
        </StyledOption>
        <StyledOption
          onClick={() => handleCategorySelect("어학")}
          isSelected={selectedCategoryOption === "어학"}
        >
          어학
        </StyledOption>
        <StyledOption
          onClick={() => handleCategorySelect("디자인")}
          isSelected={selectedCategoryOption === "디자인"}
        >
          디자인
        </StyledOption>
        <StyledOption
          onClick={() => handleCategorySelect("비즈니스")}
          isSelected={selectedCategoryOption === "비즈니스"}
        >
          비즈니스
        </StyledOption>
        <StyledOption
          onClick={() => handleCategorySelect("독서")}
          isSelected={selectedCategoryOption === "독서"}
        >
          독서
        </StyledOption>
        <StyledOption
          onClick={() => handleCategorySelect("기타")}
          isSelected={selectedCategoryOption === "기타"}
        >
          기타
        </StyledOption>
      </OptionWrapper>
    </SelectWrapper>
  );
};

export default WriteSelectBox;

/* CSS */
const SelectWrapper = styled.div`
  position: relative;
  width: 49%;
  z-index: 1;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButton = styled.div`
  border: 1px solid #8e59ff;
  border-radius: 10px;
  width: 100%;
  height: 2.5em;
  line-height: 2.5em;
  background-color: transparent;
  color: #8e59ff;
  font-size: 1em;
  font-weight: 800;
  cursor: pointer;
  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const Text = styled.div`
  margin-left: 1.5em;
  height: 100%;
  font-size: 0.8125em;
  overflow: hidden;
`;

const StyledDownArrowIcon = styled(DownArrowIcon)`
  position: absolute;
  top: 0;
  right: 0;
  margin: 0.8em 0.9em;
  width: 1em;
  height: 1em;
  transition: all 0.5s ease;
  transform: rotate(${(props) => (props.isVisible ? "-180deg" : "0deg")});
  @media (max-width: 768px) {
    width: 20%;
    margin-top: 1em;
    height: 0.5em;
  }
`;

const OptionWrapper = styled.div`
  margin-top: 4.5em;
  padding: 1.5em 0;
  border-radius: 10px;
  width: 100%;
  background-color: rgba(22, 26, 63, 0.7);
  backdrop-filter: blur(3px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.6875em;
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: all 0.3s ease;
  position: absolute;
`;

const StyledOption = styled.div`
  margin: 0.5em 0;
  border: ${(props) => (props.isSelected ? "1px solid #D0D1D9" : "none")};
  border-radius: 10px;
  width: 20em;
  height: 2.0769em;
  line-height: 2.0769em;
  cursor: pointer;
  text-align: center;
  color: ${(props) => (props.isSelected ? "white" : "#D0D1D9")};
  font-size: 1.1em;
  font-weight: ${(props) => (props.isSelected ? "bold" : "normal")};
  &:hover {
    color: white;
    font-weight: bold;
  }
`;
