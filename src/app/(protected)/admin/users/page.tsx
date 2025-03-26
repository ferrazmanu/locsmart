"use client";
import { PageHeader } from "@/src/components/page-header/page-header";
import * as S from "./users.styles";

export default function Users() {
  return (
    <S.Wrapper>
      <PageHeader title="Usuários" />
    </S.Wrapper>
  );
}
