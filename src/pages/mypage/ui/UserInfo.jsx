import React, { forwardRef, useState, useMemo } from "react";
import styled from "styled-components";
import { Color } from "../../../components/container/Color";
import { PuppleButton, PuppleButton2 } from "../../../components/button/Button";
import defaultProfileImage from "../../../assets/images/mypage/userProfile.png";
import { getNickNameAPI } from "../api/getNickNameAPI";

const UserInfo = forwardRef(({ userInfo }, ref) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState(userInfo.nickname || "");
  const [localUserInfo, setLocalUserInfo] = useState(userInfo);

  const profileImage = useMemo(
    () => localUserInfo.profileImagePth || defaultProfileImage,
    [localUserInfo.profileImagePth],
  );

  const toggleEditingMode = async () => {
    if (isEditing) {
      if (!nickname.trim()) {
        alert("닉네임을 입력해주세요.");
        return;
      }

      try {
        const response = await getNickNameAPI(nickname);
        alert(response.message || "닉네임이 수정되었습니다!");

        // ✅ 내부 상태를 변경하여 UI 반영
        setLocalUserInfo((prev) => ({
          ...prev,
          nickname: nickname,
        }));
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

  return (
    <UserWrapper ref={ref}>
      <RowWrapper>
        <UserImage style={{ backgroundImage: `url(${profileImage})` }} />
        <ColumnWrapper>
          {isEditing ? (
            <>
              <UserNameInput
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                autoFocus
              />
              <NameEditButton onClick={toggleEditingMode}>
                수정 완료
              </NameEditButton>
            </>
          ) : (
            <>
              <UserName>{localUserInfo.nickname} 님</UserName>
              <NameEditButton onClick={toggleEditingMode}>
                닉네임 수정
              </NameEditButton>
            </>
          )}
        </ColumnWrapper>
      </RowWrapper>
    </UserWrapper>
  );
});

UserInfo.displayName = "UserInfo";

export default UserInfo;

const RowWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  width: 100%;
  gap: 3em;

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

const NameEditButton = styled(PuppleButton2)`
  background-color: #b693ff;
  width: 120px;
  padding-left: 1em;
  padding-right: 1em;
  height: 40px;
  font-weight: 700;

  @media (max-width: 768px) {
    height: 35px;
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
