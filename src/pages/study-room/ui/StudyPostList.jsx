import React, { useEffect, useState } from "react";
import Plus from "../../../assets/icons/studyRoom/Plus.png";
import { MinorText } from "./StudySummary";
import styled from "styled-components";
import BlogPreview from "../../community/ui/BlogPreview";
import { useNavigate } from "react-router-dom";
import { studyRoomPostPreviewAPI } from "../api/studyRoomPostPreviewAPI";

const StudyPostList = ({ roomId }) => {
  console.log(roomId);
  const navigate = useNavigate();
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await studyRoomPostPreviewAPI(roomId);
        console.log(response);
        setCardData(response);
        console.log(cardData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [roomId]);

  return (
    <>
      <StudyPostWrapper>
        <ButtonWrapper>
          <MinorText>게시글</MinorText>
          <PostButton
            onClick={() =>
              navigate("/study/room/write", { state: { roomId: roomId } })
            }
          >
            <Icons
              src={Plus}
              alt="플러스"
              style={{ width: "10px", height: "10px" }}
            />
            게시글 작성하기
          </PostButton>
        </ButtonWrapper>
        <Row>
          {cardData &&
            cardData.map((item) => (
              <BlogPreview
                link={"community"}
                key={item.id}
                postId={item.id}
                title={item.title}
                daysLeft={item.createdAt}
                description={item.body}
                imageUrl={item.imageUrl}
                apiType={"studyRoom"}
              />
            ))}
        </Row>
      </StudyPostWrapper>
    </>
  );
};

export default StudyPostList;

const PostButton = styled.div`
  background-color: #8e59ff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.625em;
  font-size: 0.8125em;
  font-weight: 700;
  padding: 0em 0.8125em;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  margin-left: auto;
  height: 2.25em;
`;

const Icons = styled.img``;

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 1.25em;
  align-items: center;
`;

const StudyPostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25em;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  overflow-x: auto;
  box-sizing: border-box;
  padding-top: 1em;
  gap: 2em;
  @media (max-width: 768px) {
    display: flex;
    overflow-x: auto;
    gap: 0.625em;
    width: 100%;
  }
`;
