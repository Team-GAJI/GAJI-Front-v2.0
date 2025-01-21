import React, { useState, useRef } from "react";
import styled from "styled-components";
import BoldIcon from "../../../assets/icons/communityWrite/bold.svg?react";
import ItalicIcon from "../../../assets/icons/communityWrite/italic.svg?react";
import ThroughIcon from "../../../assets/icons/communityWrite/through.svg?react";
import ImageIcon from "../../../assets/icons/communityWrite/image.svg?react";
import LinkIcon from "../../../assets/icons/communityWrite/link.svg?react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useDispatch } from "react-redux";
import { setDescription } from "../../../redux/slice/study/studyCreateSlice";

const StudyDetail = () => {
  // 상태 관리
  const [markdown, setMarkdown] = useState("");
  const [lengthCount, setLengthCount] = useState(0);
  const [fontSize, setFontSize] = useState("0");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const textareaRef = useRef(null);

  // Redux 관리
  const dispatch = useDispatch();
  dispatch(setDescription(markdown));

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
    const linkSyntax = `[${linkText}]()`;
    setMarkdown(`${before}${linkSyntax}${after}`);
    textarea.setSelectionRange(
      selectionStart + linkSyntax.length - 4,
      selectionEnd + linkSyntax.length - 4,
    );
    textarea.focus();
  };

  // 마크다운 내용, 글자 수 관리
  const handleMarkdownChange = (e) => {
    setMarkdown(e.target.value);
    setLengthCount(e.target.value.length);
  };

  // 모달 열고 닫기 함수
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ComponentWrapper>
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
        {/* <StyledImageIcon onClick={addImage}/> */}
        <FileInputLabel htmlFor="contentImg">
          <StyledImageIcon />
        </FileInputLabel>
        <ImageUploadInput type="file" id="contentImg" accept="image/*" />
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
    </ComponentWrapper>
  );
};

export default StudyDetail;

/* CSS */
const ComponentWrapper = styled.div`
  padding: 1em;
  box-sizing: border-box;
  border: 1px solid #8e59ff;
  border-radius: 10px;
  width: 100%;
`;

const ToolbarWrapper = styled.div`
  margin-top: 0.6em;
  width: 100%;
  height: 2em;
  display: flex;
  align-items: center;
  background-color: #fbfaff;
  font-size: 0.9em;
  overflow-x: scorll;
  position: sticky;
  top: 60px;
`;

const StyledFontSizeSelect = styled.select`
  display: flex;
  justify-content: center;
  padding-left: 0.25em;
  box-sizing: border-box;
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

  @media (max-width: 768px) {
    font-size: 0.75em;
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
  @media (max-width: 768px) {
    width: 0.75em;
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
  @media (max-width: 768px) {
    width: 0.75em;
    margin: 0 1em;
  }
`;

const StyledThroughIcon = styled(ThroughIcon)`
  width: 1.0625em;
  height: 1.125em;
  &:hover {
    filter: invert(42%) sepia(59%) saturate(4229%) hue-rotate(238deg)
      brightness(100%) contrast(105%);
  }
  @media (max-width: 768px) {
    width: 0.75em;
  }
`;

const FileInputLabel = styled.label`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    width: 0.75em;
  }
`;

const ImageUploadInput = styled.input`
  display: none;
`;

const StyledImageIcon = styled(ImageIcon)`
  width: 1.2716em;
  height: 1.2em;
  &:hover {
    filter: invert(42%) sepia(59%) saturate(4229%) hue-rotate(238deg)
      brightness(100%) contrast(105%);
  }
  @media (max-width: 768px) {
    width: 0.75em;
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
  @media (max-width: 768px) {
    width: 0.8125em;
    margin-left: 1em;
  }
`;

const TextareaWrapper = styled.div`
  border-radius: 15px;
  width: 100%;
  height: auto;
  padding: 1em;
  padding-bottom: 0em;
  margin-top: 0.8125em;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  &:focus-within {
    // box-shadow: 0 0.25em 1.25em rgba(22,26,63,0.2);
  }
  transition: all 0.3s ease;
`;

const StyledTextarea = styled.textarea`
  padding: 1.23em 1.23em 0 1.23em;
  border: none;
  width: 100%;
  height: 30.19em;
  line-height: 1.845em;
  background-color: transparent;
  font-size: 0.8125em;
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
  width: 100%;
  margin-top: 1em;
  display: flex;
  flex-direction: column;
`;

const TextLength = styled.div`
  font-size: 0.8125em;
  margin-left: auto;
  font-weight: bold;
  color: ${(props) => (props.lengthCount >= 20000 ? "red" : "#A2A3B2")};
`;

const StyledPreviewButton = styled.div`
  border: 1px solid #8e59ff;
  border-radius: 10px;
  width: 6em;
  box-sizing: border-box;
  padding-left: 0.25em;
  padding-right: 0.25em;
  height: 1.75em;
  line-height: 1.75em;
  text-align: center;
  background-color: transparent;
  color: #8e59ff;
  font-size: 1em;
  font-weight: 800;
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: 0.75em;
  }
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
  z-index: 10;
`;
const ModalContent = styled.div`
  background-color: #fff;
  padding: 2.4615em;
  border-radius: 10px;
  width: 68em;
  max-height: 30.7692em;
  font-size: 0.8125em;
  overflow-y: auto;
  position: relative;
  @media (max-width: 768px) {
    width: 80%;
  }
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
