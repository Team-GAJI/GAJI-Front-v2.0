import React, { useState, useRef } from "react";
import styled from "styled-components";
// import { useNavigate } from 'react-router-dom';
import BoldIcon from "../../../assets/icons/communityWrite/bold.svg?react";
import ItalicIcon from "../../../assets/icons/communityWrite/italic.svg?react";
import ThroughIcon from "../../../assets/icons/communityWrite/through.svg?react";
import ImageIcon from "../../../assets/icons/communityWrite/image.svg?react";
import LinkIcon from "../../../assets/icons/communityWrite/link.svg?react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const WritePost = () => {
  // 상태 관리
  // const [title, setTitle] = useState('');
  const [markdown, setMarkdown] = useState("");
  const [lengthCount, setLengthCount] = useState(0);
  // const [styledHr, setStyledHr] = useState(false);
  const [fontSize, setFontSize] = useState("0");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const textareaRef = useRef(null);

  // 제목 하단바 색상 관리
  // const handlePurpleHr = () => {
  //     setStyledHr(true);
  // };
  // const handleGrayHr = () => {
  //     setStyledHr(false);
  // };

  // 제목 크기 적용 함수
  const applyFontSize = (e) => {
    const value = e.target.value;
    setFontSize(value);
    if (value === "0") return;

    const headerSyntax = "#".repeat(value) + " ";
    const textarea = textareaRef.current;
    const { selectionStart, selectionEnd } = textarea;
    const before = markdown.substring(0, selectionStart);
    const after = markdown.substring(selectionEnd);

    setMarkdown(`${before}${headerSyntax}${after}`);
    textarea.setSelectionRange(
      selectionStart + headerSyntax.length,
      selectionStart + headerSyntax.length,
    );
    textarea.focus();
  };

  // 엔터 키 이벤트 핸들러
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setFontSize("0");
    }
  };

  // 포맷팅 적용 함수
  const applyFormatting = (syntax) => {
    const textarea = textareaRef.current;
    const { selectionStart, selectionEnd } = textarea;
    const before = markdown.substring(0, selectionStart);
    const selected = markdown.substring(selectionStart, selectionEnd);
    const after = markdown.substring(selectionEnd);

    if (selected.length > 0) {
      // 선택된 텍스트에 포맷팅 적용
      setMarkdown(`${before}${syntax}${selected}${syntax}${after}`);
      textarea.setSelectionRange(
        selectionStart + syntax.length,
        selectionEnd + syntax.length,
      );
    } else {
      // 빈 공간에서 포맷팅 문법 추가
      setMarkdown(`${before}${syntax}${after}`);
      textarea.setSelectionRange(
        selectionStart + syntax.length,
        selectionStart + syntax.length,
      );
    }
    textarea.focus();
  };

  // 링크 추가 함수
  const addLink = () => {
    const textarea = textareaRef.current;
    const { selectionStart, selectionEnd } = textarea;
    const before = markdown.substring(0, selectionStart);
    const selected = markdown.substring(selectionStart, selectionEnd);
    const after = markdown.substring(selectionEnd);

    // 선택된 텍스트가 없으면 기본 텍스트 'text' 사용
    const linkText = selected.length > 0 ? selected : "text";
    const linkSyntax = `[${linkText}](https://)`;
    setMarkdown(`${before}${linkSyntax}${after}`);
    textarea.setSelectionRange(
      selectionStart + linkSyntax.length - 4,
      selectionEnd + linkSyntax.length - 4,
    );
    textarea.focus();
  };

  // 이미지 추가 함수
  const addImage = () => {
    const textarea = textareaRef.current;
    const { selectionStart, selectionEnd } = textarea;
    const before = markdown.substring(0, selectionStart);
    const selected = markdown.substring(selectionStart, selectionEnd);
    const after = markdown.substring(selectionEnd);

    // 선택된 텍스트가 없으면 기본 텍스트 'alt text' 사용
    const altText = selected.length > 0 ? selected : "alt text";
    const imageSyntax = `![${altText}](url)`;
    setMarkdown(`${before}${imageSyntax}${after}`);
    textarea.setSelectionRange(
      selectionStart + imageSyntax.length - 6,
      selectionEnd + imageSyntax.length - 6,
    );
    textarea.focus();
  };

  // 마크다운 내용, 글자 수 관리
  const handleMarkdownChange = (e) => {
    setMarkdown(e.target.value);
    setLengthCount(e.target.value.length);
  };

  // useNavigate
  // const navigate = useNavigate();

  // 모달 열고 닫기 함수
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* 툴바 */}
      <ToolbarWrapper>
        <StyledFontSizeSelect
          name="fontSize"
          value={fontSize}
          onChange={applyFontSize}
        >
          <option value="0">폰트크기</option>
          <option value="1">1h</option>
          <option value="2">2h</option>
          <option value="3">3h</option>
          <option value="4">4h</option>
          <option value="5">5h</option>
          <option value="6">6h</option>
        </StyledFontSizeSelect>
        <StyledBar>|</StyledBar>
        <StyledBoldIcon onClick={() => applyFormatting("**")} />
        <StyledItalicIcon onClick={() => applyFormatting("*")} />
        <StyledThroughIcon onClick={() => applyFormatting("~~")} />
        <StyledBar>|</StyledBar>
        <StyledImageIcon onClick={addImage} />
        <StyledLinkIcon onClick={addLink} />
        <StyledBar>|</StyledBar>
        <StyledPreviewButton onClick={openModal}>미리보기</StyledPreviewButton>
      </ToolbarWrapper>

      {/* 내용 */}
      <TextareaWrapper>
        <StyledTextarea
          ref={textareaRef}
          value={markdown}
          onChange={handleMarkdownChange}
          onKeyDown={handleKeyDown}
          placeholder="게시글의 내용을 입력해주세요."
          maxLength="20000"
        />
        <TextareaBottom>
          <TextLength lengthCount={lengthCount}>
            {lengthCount}/20000 자
          </TextLength>
          <StyledContentHr />
        </TextareaBottom>
      </TextareaWrapper>

      {/* 모달 */}
      {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>x</CloseButton>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdown}
            </ReactMarkdown>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default WritePost;

/* CSS */

const ToolbarWrapper = styled.div`
  margin: 0.6em 0 0.9em 0.6em;
  width: 57.125em;
  height: 2em;
  display: flex;
  align-items: center;
  background-color: #fbfaff;
  position: sticky;
  top: 6.5em;
`;

const StyledFontSizeSelect = styled.select`
  padding-left: 0.7em;
  border: 1px solid #8e59ff;
  border-radius: 10px;
  width: 6em;
  height: 1.75em;
  background-color: transparent;
  color: #8e59ff;
  font-size: 1em;
  font-weight: 800;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const StyledBar = styled.div`
  margin: 0 1.2em;
  color: #a2a3b2;
`;

const StyledBoldIcon = styled(BoldIcon)`
  width: 0.825em;
  height: 1.1em;
  &:hover {
    filter: invert(42%) sepia(59%) saturate(4229%) hue-rotate(238deg)
      brightness(100%) contrast(105%);
  }
`;

const StyledItalicIcon = styled(ItalicIcon)`
  margin: 0 2em;
  width: 0.857em;
  height: 1em;
  &:hover {
    filter: invert(42%) sepia(59%) saturate(4229%) hue-rotate(238deg)
      brightness(100%) contrast(105%);
  }
`;

const StyledThroughIcon = styled(ThroughIcon)`
  width: 1.0625em;
  height: 1.125em;
  &:hover {
    filter: invert(42%) sepia(59%) saturate(4229%) hue-rotate(238deg)
      brightness(100%) contrast(105%);
  }
`;

const StyledImageIcon = styled(ImageIcon)`
  width: 1.2716em;
  height: 1.2em;
  &:hover {
    filter: invert(42%) sepia(59%) saturate(4229%) hue-rotate(238deg)
      brightness(100%) contrast(105%);
  }
`;

const StyledLinkIcon = styled(LinkIcon)`
  margin-left: 2em;
  width: 1.2em;
  height: 1.2em;
  &:hover {
    filter: invert(42%) sepia(59%) saturate(4229%) hue-rotate(238deg)
      brightness(100%) contrast(105%);
  }
`;

const TextareaWrapper = styled.div`
  border-radius: 15px;
  width: 59.125em;
  height: 22em;
  display: flex;
  flex-direction: column;
  align-items: center;
  /*&:focus-within{
        box-shadow: 0 0.25em 1.25em rgba(22,26,63,0.2);
    }*/
  transition: all 0.3s ease;
`;

const StyledTextarea = styled.textarea`
  padding: 1em 1em 0 1em;
  border: none;
  width: 57.125em;
  height: 53em;
  line-height: 1.5em;
  background-color: transparent;
  font-size: 1em;
  font-weight: 700;
  font-family: "NanumSquareNeo";
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #a2a3b2;
    font-weight: 700;
  }
  resize: none;
`;

const TextareaBottom = styled.div`
  margin-top: 1em;
  display: flex;
  flex-direction: column;
`;

const TextLength = styled.div`
  margin-left: auto;
  font-weight: bold;
  color: ${(props) => (props.lengthCount >= 20000 ? "red" : "#A2A3B2")};
`;

const StyledContentHr = styled.hr`
  margin: 1.5em 0 3em 0;
  border: none;
  width: 55.125em;
  height: 1.5px;
  background-color: rgba(162, 163, 178, 0.4);
`;

const StyledPreviewButton = styled.div`
  border: 1px solid #8e59ff;
  border-radius: 10px;
  width: 6em;
  height: 1.75em;
  line-height: 1.75em;
  text-align: center;
  background-color: transparent;
  color: #8e59ff;
  font-size: 1em;
  font-weight: 800;
  cursor: pointer;
`;

// 모달
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalContent = styled.div`
  background-color: #fff;
  padding: 2em;
  border-radius: 10px;
  width: 57em;
  max-height: 25em;
  overflow-y: auto;
  position: relative;
`;
const CloseButton = styled.button`
  position: absolute;
  top: 1em;
  right: 1em;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
`;
