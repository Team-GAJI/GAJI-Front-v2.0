import React, { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import { ContentWrapper60 } from "../../components/common/MediaWrapper";
import { studyNoticeRegisterAPI } from "../study-room/api/studyNoticeRegisterAPI";

const StudyNoticeWritePage = () => {
  const navigate = useNavigate();
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setContent] = useState("");
  const location = useLocation();
  const roomId = location.state?.roomId || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { title, body };
      const result = await studyNoticeRegisterAPI(roomId, data);
      console.log("Form submitted successfully:", result);
      navigate(`/studynotice`, { state: { roomId: roomId } }); // 성공 시 공지사항 목록 페이지로 이동
    } catch (error) {
      console.error("Form submission failed:", error);
      alert("공지사항 등록에 실패했습니다.");
    }
  };

  const headerTitles = [
    "스터디 홈",
    "트러블 슈팅 게시판",
    "정보나눔 게시판",
    "채팅방",
  ];

  const handleHeaderButtonClick = (index) => {
    setActiveButtonIndex(index);
    if (index === 0) {
      navigate("/studyroom");
    } else if (index === 1) {
      navigate("/troubleshooting");
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <PageHeader
        large="true"
        pageTitle="공지사항 글쓰기"
        headerTitles={headerTitles}
        activeButtonIndex={activeButtonIndex}
        onButtonClick={handleHeaderButtonClick}
        changeColorOnClick={false}
        changeColorOnHover={true}
      />
      <ContentWrapper60>
        <FormField>
          <Label>공지사항 제목</Label>
          <Input
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormField>
        <FormField>
          <Textarea
            placeholder="공지 내용을 입력해주세요"
            value={body}
            onChange={(e) => setContent(e.target.value)}
          />
        </FormField>
        <SubmitButtonWrapper>
          <SubmitButton onClick={handleSubmit}>공지사항 등록</SubmitButton>
        </SubmitButtonWrapper>
      </ContentWrapper60>
    </>
  );
};

export default StudyNoticeWritePage;

const FormField = styled.div`
  width: 100%;
  margin-bottom: 1.5em;
`;

const Label = styled.label`
  font-family: "NanumSquareNeo", sans-serif;
  font-size: 1em;
  font-weight: 800;
  color: #333;
  margin-bottom: 1em;
  display: block;
`;

const Input = styled.input`
  font-family: "NanumSquareNeo", sans-serif;
  width: 100%;
  padding: 0.75em;
  font-size: 1em;
  border: 1px solid #a2a3b2;
  border-radius: 0.5em;
  box-sizing: border-box;
  background: none;

  &::placeholder {
    font-size: 1em;
  }
`;

const Textarea = styled.textarea`
  font-family: "NanumSquareNeo", sans-serif;
  width: 100%;
  padding: 0.75em;
  font-size: 0.9em;
  border: 1px solid #a2a3b2;
  border-radius: 0.5em;
  box-sizing: border-box;
  height: 150px;
  resize: none;
  background: none;

  &::placeholder {
    font-size: 1em;
  }
`;

const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const SubmitButton = styled.button`
  margin-bottom: 1em;
  font-family: "NanumSquareNeo";
  background-color: #8e59ff;
  border: 0.0625em solid #8e59ff;
  color: #fff;
  border-radius: 0.9em;
  font-weight: 700;
  width: 12em;
  padding: 1em;
  margin-top: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #7a4ed9;
  }
`;
