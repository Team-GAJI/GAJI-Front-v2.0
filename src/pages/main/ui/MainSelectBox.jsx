import React, { useState } from "react";
import styled from "styled-components";
import DownArrowIcon from "../../../assets/icons/communityPost/grayDownArrow.svg?react";

const MainSelectBox = ({
  onCategorySelect,
  onSortSelect,
  onFilterSelect,
  selectedCategory,
  selectedSort,
  selectedFilter,
}) => {
  // 필터 상태 관리
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);
  const [selectedCategoryOption, setSelectedCategoryOption] = useState(
    selectedCategory || "카테고리",
  );

  const [isSortVisible, setIsSortVisible] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState(
    selectedSort || "정렬",
  );

  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedFilterOption, setSelectedFilterOption] = useState(
    selectedFilter || "필터",
  );

  // 필터 버튼 텍스트
  const toggleCategoryVisibility = () => {
    setIsCategoryVisible(!isCategoryVisible);
    setIsSortVisible(false);
    setIsFilterVisible(false);
  };
  const toggleSortVisibility = () => {
    setIsCategoryVisible(false);
    setIsSortVisible(!isSortVisible);
    setIsFilterVisible(false);
  };
  const toggleFilterVisibility = () => {
    setIsCategoryVisible(false);
    setIsSortVisible(false);
    setIsFilterVisible(!isFilterVisible);
  };

  // 필터 옵션 선택
  const handleCategorySelect = (option) => {
    setSelectedCategoryOption(option);
    setIsCategoryVisible(false);
    onCategorySelect(option); // 선택한 값을 상위 컴포넌트로 전달
  };
  const handleSortSelect = (option) => {
    setSelectedSortOption(option);
    setIsSortVisible(false);
    onSortSelect(option); // 선택한 값을 상위 컴포넌트로 전달
  };
  const handleFilterSelect = (option) => {
    setSelectedFilterOption(option);
    setIsFilterVisible(false);
    onFilterSelect(option); // 선택한 값을 상위 컴포넌트로 전달
  };

  return (
    <SelectWrapper>
      {/* 카테고리 */}
      <ButtonWrapper>
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
            네트워크
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
      </ButtonWrapper>

      {/* 정렬 */}
      <ButtonWrapper>
        {/* 버튼 */}
        <StyledButton onClick={toggleSortVisibility}>
          <Text>{selectedSortOption}</Text>
          <StyledDownArrowIcon isVisible={isSortVisible} />
        </StyledButton>
        {/* 옵션 */}
        <OptionWrapper isVisible={isSortVisible}>
          <StyledOption
            onClick={() => handleSortSelect("최신순")}
            isSelected={selectedSortOption === "최신순"}
          >
            최신순
          </StyledOption>
          <StyledOption
            onClick={() => handleSortSelect("좋아요수")}
            isSelected={selectedSortOption === "좋아요수"}
          >
            좋아요수
          </StyledOption>
          <StyledOption
            onClick={() => handleSortSelect("조회수")}
            isSelected={selectedSortOption === "조회수"}
          >
            조회수
          </StyledOption>
        </OptionWrapper>
      </ButtonWrapper>

      {/* 필터 */}
      <ButtonWrapper>
        {/* 버튼 */}
        <StyledButton onClick={toggleFilterVisibility}>
          <Text>{selectedFilterOption}</Text>
          <StyledDownArrowIcon isVisible={isFilterVisible} />
        </StyledButton>
        {/* 옵션 */}
        <OptionWrapper isVisible={isFilterVisible}>
          <StyledOption
            onClick={() => handleFilterSelect("모집 중")}
            isSelected={selectedFilterOption === "모집 중"}
          >
            모집 중
          </StyledOption>
          <StyledOption
            onClick={() => handleFilterSelect("모집 완료")}
            isSelected={selectedFilterOption === "모집 완료"}
          >
            모집 완료
          </StyledOption>
          <StyledOption
            onClick={() => handleFilterSelect("인원 제한")}
            isSelected={selectedFilterOption === "인원 제한"}
          >
            인원 제한
          </StyledOption>
          <StyledOption
            onClick={() => handleFilterSelect("제한 없음")}
            isSelected={selectedFilterOption === "제한 없음"}
          >
            인원 제한 없음
          </StyledOption>
        </OptionWrapper>
      </ButtonWrapper>
    </SelectWrapper>
  );
};

export default MainSelectBox;

/* CSS */
const SelectWrapper = styled.div`
  display: flex;
  position: relative;
  z-index: 1;
`;

const ButtonWrapper = styled.div`
  margin-right: 0.8em;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding-right: 0.8125em;
  padding-left: 0.8125em;
  border: 1px solid #c8c8c8;
  border-radius: 10px;
  width: 7.3077em;
  height: 2.3846em;
  line-height: 2.3846em;
  background-color: transparent;
  color: #d0d1d9;
  font-size: 0.8125em;
  font-weight: bold;
  text-align: start;
  position: relative;
  cursor: pointer;
  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    width: 6em;
    font-size: 0.75em;
    gap: 0.0125em;
    padding-right: 0.5em;
    padding-left: 0.5em;
  }
`;

const Text = styled.div`
  height: 100%;
  overflow: hidden;
`;

const StyledDownArrowIcon = styled(DownArrowIcon)`
  width: 1em;
  height: 1em;
  transition: all 0.5s ease;
  transform: rotate(${(props) => (props.isVisible ? "-180deg" : "0deg")});
`;

const OptionWrapper = styled.div`
  margin-top: 3.5em;
  padding: 1.5em 0;
  border-radius: 10px;
  width: 13em;
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
  @media (max-width: 768px) {
    width: 8em;
    font-size: 0.55em;
    gap: 0.0125em;
    padding-right: 0.5em;
    padding-left: 0.5em;
  }
`;

const StyledOption = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5em 0;
  border: ${(props) => (props.isSelected ? "1px solid #D0D1D9" : "none")};
  border-radius: 10px;
  width: 11em;
  height: 2.0769em;
  cursor: pointer;
  text-align: center;
  color: ${(props) => (props.isSelected ? "white" : "#D0D1D9")};
  font-weight: ${(props) => (props.isSelected ? "bold" : "normal")};
  &:hover {
    color: white;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    width: 8em;
    overflow-wrap: break-word;
  }
`;
