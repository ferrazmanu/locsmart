"use client";

import { Loading } from "@/src/assets";
import { styled } from "styled-components";

export default function LoadingComponent() {
  return (
    <Wrapper>
      <Loading size="45px" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
