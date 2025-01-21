import React from "react";
import styled from "styled-components";

const ReportModal = ({ isVisible, onClose, onReport, title }) => {
  // 신고 기능
  const handleReportClick = () => {
    onReport();
    onClose();
  };

  return (
    <ProfileWrapper isVisible={isVisible}>
      <Text>&#039;{title}&#039;을 신고하시겠습니까?</Text>
      <ButtonWrapper>
        <ReportButton onClick={handleReportClick}>신고하기</ReportButton>
        <CancelButton onClick={onClose}>취소</CancelButton>
      </ButtonWrapper>
    </ProfileWrapper>
  );
};

ReportModal.displayName = "ReportModal";

export default ReportModal;

/* CSS */
const ProfileWrapper = styled.div`
  border-radius: 10px;
  width: 23.4615em;
  height: 6.9231em;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0.25em 1.25em rgba(22, 26, 63, 0.2);

  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  align-self: center;
  z-index: 1;
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: all 0.3s ease;
`;

const Text = styled.div`
  color: #8e59ff;
  font-weight: 800;
`;

const ButtonWrapper = styled.div`
  margin-top: 1em;
  display: flex;
`;

const ReportButton = styled.div`
  margin-right: 0.5em;
  border-radius: 10px;
  width: 7em;
  height: 2.0769em;
  line-height: 2.0769em;
  background-color: #8e59ff;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

const CancelButton = styled.div`
  margin-left: 0.5em;
  border-radius: 10px;
  width: 7em;
  height: 2.0769em;
  line-height: 2.0769em;
  background-color: #e0e0e0;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;
