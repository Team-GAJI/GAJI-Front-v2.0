import styled from "styled-components";

export const PuppleButton = styled.div`
  background-color: #8e59ff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  cursor: pointer;
`;

export const PuppleButton2 = styled.div`
  background-color: #b693ff;
  border-radius: 10px;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  color: #ffffff;
`;

export const PuppleButton3 = styled.div`
  background-color: #d3bfff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  cursor: pointer;
`;

export const LoginButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 21px;
  width: 342px;
  height: 43px;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "#ffffff"};
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.05);
  font-weight: 600;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 280px;
  }
`;
