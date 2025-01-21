import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StudyCreateLinkEmbed from "./StudyCreateLinkEmbed";
import { setMaterialList } from "../../../redux/slice/study/studyCreateSlice";
import { useDispatch } from "react-redux";

const StudyData = () => {
  // state 관리
  const [links, setLinks] = useState([]);
  const [linkInput, setLinkInput] = useState("");
  const [isComposing, setIsComposing] = useState(false); // 한글 조합 상태 관리

  // Redux 관리
  const dispatch = useDispatch();

  const handleLinkSubmit = (e) => {
    if (e.key === "Enter" && !isComposing && linkInput.trim() !== "") {
      setLinks([...links, linkInput.trim()]);
      setLinkInput("");
    }
  };

  const handleLinkChange = (e) => {
    setLinkInput(e.target.value);
  };

  const handleRemoveLink = (index) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  useEffect(() => {
    dispatch(setMaterialList(links));
  }, [links]); // links가 변경될 때만 dispatch 호출

  return (
    <StudyDataWrapper>
      <Title>스터디 자료 링크</Title>
      <LinkInput
        placeholder="링크를 입력해주세요"
        value={linkInput}
        onChange={handleLinkChange}
        onKeyDown={handleLinkSubmit}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
      />
      <LinkEmbedWrapper>
        {links.map((link, index) => (
          <StudyCreateLinkEmbed
            key={index}
            link={link}
            onRemove={() => handleRemoveLink(index)}
          />
        ))}
      </LinkEmbedWrapper>
    </StudyDataWrapper>
  );
};

export default StudyData;

/* CSS */
const Title = styled.div`
  margin: 1em 0 0.7em 0;
  color: #8e59ff;
  font-weight: 800;
`;

const StudyDataWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const LinkInput = styled.input`
  padding-left: 1em;
  border: 1px solid #a2a3b2;
  border-radius: 10px;
  width: 100%;
  height: 2.8125em;
  background-color: transparent;
  font-family: "NanumSquareNeo";
  font-weight: bold;
  &:focus {
    outline: none;
  }
  transition: all 0.3s ease;
  &::placeholder {
    color: #a2a3b2;
    font-size: 0.9em;
    font-weight: bold;
  }
`;

const LinkEmbedWrapper = styled.div`
  margin-top: 1em;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;
