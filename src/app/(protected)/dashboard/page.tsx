"use client";

import { PageHeader } from "@/src/components/page-header/page-header";

import * as S from "./dashboard.styles";

export default function Dashboard() {
  return (
    <S.Wrapper>
      <PageHeader title="Dashboard" />
    </S.Wrapper>
  );
}
