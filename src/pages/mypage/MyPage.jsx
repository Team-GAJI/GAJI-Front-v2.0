import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import UserPost from "./ui/UserPost";
import UserStudyList from "./ui/UserStudyList";
import UserInfo from "./ui/UserInfo";
import { userInfoAPI } from "./api/userInfoAPI";
import { ongoingStudyListAPI, endedStudyListAPI } from "./api/myStudyListAPI";
import SidePageHeader from "../../components/common/SidePageHeader";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const homeRef = useRef(null);
  const studyRoomRef = useRef(null);
  const calendarRef = useRef(null);
  const myPostRef = useRef(null);

  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1300);
  const [userInfo, setUserInfo] = useState(null);
  const [ongoingStudyList, setOngoingStudyList] = useState();
  const [endedStudyList, setEndedStudyList] = useState();

  const handleScroll = (section) => {
    let ref;
    switch (section) {
      case "home":
        ref = homeRef;
        break;
      case "studyroom":
        ref = studyRoomRef;
        break;
      case "calendar":
        ref = calendarRef;
        break;
      case "mypost":
        ref = myPostRef;
        break;
      default:
        ref = homeRef;
    }

    const yOffset = isMobile ? -250 : -57;
    const yPosition =
      ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: yPosition, behavior: "smooth" });
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const handleScrollEvent = () => {
    const scrollY = window.scrollY;
    const positions = [
      homeRef.current.offsetTop,
      studyRoomRef.current.offsetTop,
      calendarRef.current.offsetTop,
      myPostRef.current.offsetTop,
    ];

    const offsets = isMobile ? 300 : 100;

    positions.forEach((position, index) => {
      if (scrollY >= position - offsets) {
        setActiveButtonIndex(index);
      }
    });
  };

  // useEffect(() => {
  //   if (!localStorage.getItem("accessToken")) {
  //     navigate("/");
  //   }
  // });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userInfoData = await userInfoAPI();
        const ongoingStudyListData = await ongoingStudyListAPI();
        console.log(ongoingStudyListData);
        const endedStudyListData = await endedStudyListAPI();

        if (userInfoData.result) {
          setUserInfo(userInfoData.result);
        } else {
          console.error("Failed to fetch user info:", userInfoData.message);
        }

        if (ongoingStudyListData) {
          setOngoingStudyList(ongoingStudyListData);
          console.log(ongoingStudyList);
        } else {
          console.error(
            "Failed to fetch ongoing study list:",
            ongoingStudyListData.message,
          );
        }

        if (endedStudyListData) {
          setEndedStudyList(endedStudyListData);
        } else {
          console.error(
            "Failed to fetch ended study list:",
            endedStudyListData.message,
          );
        }
      } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
      }
    };

    fetchUserData();

    window.addEventListener("scroll", handleScrollEvent);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const headerTitles = ["내 정보", "스터디룸", "내가 쓴 글"];
  const handleHeaderButtonClick = (index) => {
    const sections = ["home", "studyroom", "mypost"];
    setActiveButtonIndex(index);
    handleScroll(sections[index]);
  };

  return (
    <>
      <SidePageHeader
        large={true}
        pageTitle="마이페이지"
        headerTitles={headerTitles}
        activeButtonIndex={activeButtonIndex}
        onButtonClick={handleHeaderButtonClick}
        changeColorOnClick={true}
        changeColorOnHover={true}
      />

      {userInfo && (
        <MyPageWrapper ref={homeRef}>
          <UserInfo userInfo={userInfo} />
          <RowWrapper4 ref={studyRoomRef}>
            <UserStudyList
              ongoingStudyList={ongoingStudyList}
              endedStudyList={endedStudyList}
            />
          </RowWrapper4>
          <Div ref={myPostRef}>
            <UserPost nickName={userInfo.nickname} />
          </Div>
        </MyPageWrapper>
      )}
    </>
  );
};

export default MyPage;

const Div = styled.div`
  width: 100%;
`;

const MyPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 5em;
  width: 60%;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 1199px) {
    width: 90%;
    margin-top: 12em; /* 화면 크기에 따라 마진 조정 */
  }
  @media (max-width: 768px) {
    width: 90%;
    margin-top: 3em;
  }
`;

const RowWrapper4 = styled.div`
  display: flex;
  gap: 2em;
  justify-content: center;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 0.5em;
  }
`;
