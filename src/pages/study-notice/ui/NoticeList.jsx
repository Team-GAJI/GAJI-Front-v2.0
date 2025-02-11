import React from "react";
import styled from "styled-components";
import NoticeListItem from "./NoticeListItem";

const NoticeList = ({ notices }) => {
  return (
    <NoticeListWrapper>
      {notices.map((notice, index) => {
        //TODO : 중요 공지를 최상단으로

        return <NoticeListItem key={index} notice={notice} />;
      })}
    </NoticeListWrapper>
  );
};

export default NoticeList;

const NoticeListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.625em;
  font-family: "NanumSquareNeo", sans-serif;
  box-sizing: border-box;
  padding-bottom: 10%;
`;
