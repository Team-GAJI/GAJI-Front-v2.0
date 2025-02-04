import React, { forwardRef, useState, useMemo } from "react";
import styled from "styled-components";
import { Color } from "../../../components/container/Color";
import { PuppleButton, PuppleButton2 } from "../../../components/button/Button";
import defaultProfileImage from "../../../assets/images/mypage/userProfile.png";
import { nickNameAPI } from "../../login/api/nickNameAPI";

const UserInfo = forwardRef(({ userInfo }, ref) => {
  console.log(userInfo);
  const [isEditing, setIsEditing] = useState(false);
  const profileImage = useMemo(
    () => userInfo.profileImagePth || defaultProfileImage,
  );

  const toggleEditingMode = async () => {
    if (isEditing) {
      if (!userInfo.nickname.trim()) {
        alert("닉네임을 입력해주세요.");
        return;
      }

      try {
        const response = await nickNameAPI(userInfo.nickname);
        alert(response.message || "닉네임이 수정되었습니다!");
      } catch (error) {
        console.error("닉네임 수정 중 오류 발생:", error);
        alert(
          "닉네임 수정에 실패했습니다: " +
            (error.response?.data?.message || error.message),
        );
        return;
      }
    }
    setIsEditing(!isEditing);
  };

  const handleNameChange = (event) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      userName: event.target.value,
    }));
  };

  return (
    <UserWrapper ref={ref}>
      <RowWrapper2>
        <UserImage style={{ backgroundImage: `url(${profileImage})` }} />
        <>{userInfo.userName}</>
        <ColumnWrapper>
          {isEditing ? (
            <UserNameInput
              type="text"
              value={userInfo.nickname}
              onChange={handleNameChange}
              autoFocus
            />
          ) : (
            <UserName>{userInfo?.nickname} 님</UserName>
          )}
          <UserGrade>
            {userInfo?.email ? userInfo?.email : "이메일 서버 API 요청 필요"}
          </UserGrade>
          <WelcomeText>마이페이지에 오신 것을 환영합니다!</WelcomeText>
        </ColumnWrapper>
      </RowWrapper2>
      <ColumnWrapper>
        <NameEditButton onClick={toggleEditingMode}>
          {isEditing ? "닉네임 수정완료" : "닉네임 수정하기"}
        </NameEditButton>
      </ColumnWrapper>
    </UserWrapper>
  );
});

UserInfo.displayName = "UserInfo";

export default UserInfo;

const RowWrapper2 = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 41px;
  height: auto;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  height: auto;

  @media (max-width: 768px) {
    align-items: center;
    gap: 1em;
  }
`;

const UserImage = styled.div`
  width: 138px;
  height: 138px;
  border-radius: 10px;
  background-size: cover;

  @media (max-width: 768px) {
    width: 90px;
    height: 90px;
  }
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 166px;
  border-radius: 10px;
  background-color: #f0eaff;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 1em;
    box-sizing: border-box;
  }
`;

const UserName = styled(Color)`
  font-size: 1.25em;
  font-weight: 800;
  cursor: default;

  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

const UserGrade = styled(PuppleButton)`
  width: 7.8125em;
  height: 1.5625em;
  cursor: default;

  @media (max-width: 768px) {
    box-sizing: border-box;
  }
`;

const WelcomeText = styled.div`
  font-size: 1em;
  font-weight: 700;
  color: #a2a3b2;
  cursor: default;

  @media (max-width: 768px) {
    margin-bottom: 1em;
  }
`;

const NameEditButton = styled(PuppleButton2)`
  background-color: #b693ff;
  width: 100%;
  height: 40px;
  font-weight: 700;

  @media (max-width: 768px) {
    height: 35px;
  }
`;

const GreyText = styled.div`
  text-align: center;
  font-size: 0.6875em;
  color: #c9c7da;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 0.625em;
  }
`;

const UserNameInput = styled.input`
  color: #8e59ff;
  font-size: 1.25em;
  font-weight: 800;
  font-family: "NanumSquareNeo";
  border: none;
  outline: none;
  background-color: transparent;
  width: 100%;

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    text-align: center;
    font-size: 1em;
  }
`;
