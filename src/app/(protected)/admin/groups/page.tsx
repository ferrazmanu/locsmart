"use client";

import { Loading } from "@/src/assets";
import { PageHeader } from "@/src/components/page-header/page-header";
import { Table } from "@/src/components/table/table";
import { IGroupTable } from "@/src/interfaces/group";
import { getAllGroups } from "@/src/services/api/endpoints/group";
import { useEffect, useState } from "react";
import { TABLE_HEADER } from "./groups.constants";
import * as S from "./groups.styles";

export default function Groups() {
  const [dataList, setDataList] = useState<IGroupTable[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const { data } = await getAllGroups();

      const tableData = data.map((item) => ({
        nome: item.nome,
        cameras: (item.cameras && item.cameras.length) || 0,
        usuarios: (item.usuarios && item.usuarios.length) || 0,
        descricao: item.descricao,
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
      <PageHeader title="Grupos" />

      {isLoading ? (
        <Loading size="40px" />
      ) : (
        <Table headerData={TABLE_HEADER} bodyData={dataList} />
      )}
    </S.Wrapper>
  );
}
