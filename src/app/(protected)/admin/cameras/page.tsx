"use client";

import { PageHeader } from "@/src/components/page-header/page-header";

import { Loading } from "@/src/assets";
import { ModalDelete } from "@/src/components/modal-delete/modal-delete";
import { IOption } from "@/src/components/more-info/more-info.interfaces";
import { Table } from "@/src/components/table/table";
import { EQUIPMENT_TYPE } from "@/src/constants/equipment-type";
import { useModalContext } from "@/src/contexts/modal/modal.context";
import { ICameraTable } from "@/src/interfaces/camera";
import { getAllCameras } from "@/src/services/api/endpoints/camera";
import { useEffect, useState } from "react";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { ModalEdit } from "../companies/(components)/(modal-edit)/modal-edit";
import { TABLE_HEADER } from "./cameras.constants";
import * as S from "./cameras.styles";

export default function Cameras() {
  const [dataList, setDataList] = useState<ICameraTable[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { modalState, updateModalEdit, updateModalDelete } = useModalContext();
  const modalDeleteData = modalState.modalDelete.data;

  const MORE_INFO_OPTIONS: IOption[] = [
    {
      icon: <MdModeEdit />,
      label: "Editar",
      onClick: (data) => {
        updateModalEdit("data", data);
        updateModalEdit("isOpen", true);
      },
    },
    {
      icon: <MdDeleteForever />,
      label: "Deletar",
      onClick: (data) => {
        updateModalDelete("data", data);
        updateModalDelete("isOpen", true);
      },
    },
  ];

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
        <Table
          headerData={TABLE_HEADER}
          bodyData={dataList}
          moreInfoOptions={MORE_INFO_OPTIONS}
        />
      )}

      {modalState.modalEdit.isOpen && <ModalEdit callbackFunc={fetchData} />}

      {modalState.modalDelete.isOpen && (
        <ModalDelete
          message="a câmera"
          itemName={`${modalDeleteData?.nome || ""}`}
          deleteApi={() => null}
          callbackFunc={fetchData}
        />
      )}
    </S.Wrapper>
  );
}
