"use client";

import { PageHeader } from "@/src/components/page-header/page-header";

import { Loading } from "@/src/assets";
import { Table } from "@/src/components/table/table";
import { EQUIPMENT_TYPE } from "@/src/constants/equipment-type";
import { ICameraTable } from "@/src/interfaces/camera";
import { getAllCameras } from "@/src/services/api/endpoints/camera";
import { useEffect, useState } from "react";
import { TABLE_HEADER } from "./cameras.constants";
import * as S from "./cameras.styles";

export default function Cameras() {
  const [dataList, setDataList] = useState<ICameraTable[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const { data } = await getAllCameras();

      const tableData = data.map((item) => ({
        nome: item.nome,
        enderecoRtsp: item.enderecoRtsp,
        tipoEquipamento: item.tipoEquipamento
          ? EQUIPMENT_TYPE[item.tipoEquipamento].name
          : "",
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
      <PageHeader title="Câmeras" />

      {isLoading ? (
        <Loading size="40px" />
      ) : (
        <Table headerData={TABLE_HEADER} bodyData={dataList} />
      )}
    </S.Wrapper>
  );
}
