import React from "react";
import styled from "styled-components";
import NoticeSquare from "./NoticeSquare";
import FirstNoticeSquare from "./FirstNoticeSquare";

const Notices = ({ notices, onMoveToTop, hoveredIndex, setHoveredIndex }) => {
  return (
    <NoticeSquareWrapper>
      {notices.map((notice, index) => {
        const NoticeComponent = index === 0 ? FirstNoticeSquare : NoticeSquare;

        return (
          <NoticeComponent
            key={index}
            notice={notice}
            isHovered={hoveredIndex === index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onMoveToTop={() => onMoveToTop(index)}
          />
        );
      })}
    </NoticeSquareWrapper>
  );
};

export default Notices;

const NoticeSquareWrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(
    ${(props) => props.noticesLength || 5},
    auto
  ); /* Dynamically set rows based on notices length */
  gap: 0.625em;
  margin-bottom: 1.875em;
  font-family: "NanumSquareNeo", sans-serif;
  box-sizing: border-box;

  @media (max-width: 768px) {
    grid-template-rows: 1fr;
    gap: 0.5em;
    margin-bottom: 1.5em;
  }
`;
