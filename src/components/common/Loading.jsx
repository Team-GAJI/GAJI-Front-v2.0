import React from "react";
import { MoonLoader } from "react-spinners";
import styled from "styled-components";

const Loading = () => {
  return (
    <LoadingWrapper>
      <MoonLoader
        color="#8E59FF"
        loading="true"
        size={30}
        speedMultiplier={1}
      />
    </LoadingWrapper>
  );
};

export default Loading;

const LoadingWrapper = styled.div`
  padding: 1em;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
