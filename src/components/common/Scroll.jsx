import styled from "styled-components";

export const Scroll = styled.div`
  overflow-x: auto;
  &::-webkit-scrollbar {
    height: 8px;
    background: none;
  }
  &:hover::-webkit-scrollbar-thumb {
    width: 1px;
    border-radius: 30px;
    background-color: rgb(142, 89, 255, 0.5);
  }
`;
