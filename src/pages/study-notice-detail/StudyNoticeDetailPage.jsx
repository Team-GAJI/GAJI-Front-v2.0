import React from "react";

const StudyNoticeDetailPage = () => {
  const noticeContent = location.state?.noticeContent ?? "";
  return <div>{noticeContent}</div>;
};

export default StudyNoticeDetailPage;
