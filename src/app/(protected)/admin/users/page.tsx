"use client";
import { Loading } from "@/src/assets";
import { PageHeader } from "@/src/components/page-header/page-header";
import { Table } from "@/src/components/table/table";
import { PROFILE_TYPE } from "@/src/constants/profile-type";
import { IUserTable } from "@/src/interfaces/user";
import { getAllUsers } from "@/src/services/api/endpoints/user";
import { useEffect, useState } from "react";
import { TABLE_HEADER } from "./users.constants";
import * as S from "./users.styles";

export default function Users() {
  const [dataList, setDataList] = useState<IUserTable[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const { data } = await getAllUsers();

      const tableData = data.map((item) => ({
        nome: item.nome,
        email: item.email,
        perfil: item.perfil ? PROFILE_TYPE[item.perfil].name : "",
      }));

      setDataList(tableData);
    } catch (error) {
      console.error("error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <S.Wrapper>
      <PageHeader title="Usuários" />

      {isLoading ? (
        <Loading size="40px" />
      ) : (
        <Table headerData={TABLE_HEADER} bodyData={dataList} />
      )}
    </S.Wrapper>
  );
}
