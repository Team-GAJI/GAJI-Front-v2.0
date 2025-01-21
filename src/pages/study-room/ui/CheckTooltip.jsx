import React from "react";
import styled from "styled-components";
import userProfile from "../../../assets/images/community/userProfile.png"; // Adjust the path as necessary

const CheckTooltip = ({ users, visible }) => {
  if (!visible || !users.length) return null;

  return (
    <TooltipWrapper>
      <Title>확인 {users.length}명</Title>
      {users.map((user, index) => (
        <UserItem key={index}>
          <UserIcon src={userProfile} alt="User Icon" />
          <UserName>{user}</UserName>
        </UserItem>
      ))}
    </TooltipWrapper>
  );
};

export default CheckTooltip;

const TooltipWrapper = styled.div`
  position: absolute;
  top: -10em;
  right: -12em;
  background-color: rgba(22, 26, 63, 0.7);
  color: white;
  padding: 1.25em;
  border-radius: 0.8em;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  z-index: 10;

  @media (max-width: 768px) {
    top: -8.5em; /* Adjust the top position for mobile devices */
    right: -1em; /* Adjust the right position for mobile devices */
    padding: 1em; /* Reduce padding on smaller screens */
    width: 5.5em; /* Adjust width to fit smaller screens */
  }

  @media (max-width: 480px) {
    top: -6em; /* Further adjust the top position for very small screens */
    right: -8em; /* Further adjust the right position */
    padding: 0.75em; /* Further reduce padding */
    width: 10em; /* Adjust width for very small screens */
  }
`;

const Title = styled.div`
  font-size: 1em;
  font-weight: bold;
  margin-bottom: 1.25em;
  color: #ffffff;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 0.875em; /* Slightly smaller font size on smaller screens */
    margin-bottom: 1em; /* Adjust spacing */
  }
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5em;

  &:last-child {
    margin-bottom: 0;
  }
`;

const UserIcon = styled.img`
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  margin-right: 1.5em;

  @media (max-width: 768px) {
    width: 1.25em; /* Adjust icon size for smaller screens */
    height: 1.25em;
    margin-right: 1em; /* Reduce margin for better fit */
  }
`;

const UserName = styled.div`
  font-size: 0.875em;
  color: #c8c8c8;

  @media (max-width: 768px) {
    font-size: 0.75em; /* Slightly smaller font size on smaller screens */
  }
`;
