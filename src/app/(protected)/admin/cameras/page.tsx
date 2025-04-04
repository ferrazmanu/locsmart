"use client";

import { PageHeader } from "@/src/components/page-header/page-header";

import { Loading } from "@/src/assets";
import { Button } from "@/src/components/button/button";
import { ModalDelete } from "@/src/components/modal-delete/modal-delete";
import { IOption } from "@/src/components/more-info/more-info.interfaces";
import { Table } from "@/src/components/table/table";
import { EQUIPMENT_TYPE } from "@/src/constants/equipment-type";
import { useModalContext } from "@/src/contexts/modal/modal.context";
import { useCamera } from "@/src/hooks/useCamera";
import { deleteCameraById } from "@/src/services/api/endpoints/camera";
import { useMemo } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { ModalEdit } from "./(components)/(modal-edit)/modal-edit";
import { TABLE_HEADER } from "./cameras.constants";
import * as S from "./cameras.styles";

export default function Cameras() {
  const { modalState, updateModalEdit, updateModalDelete } = useModalContext();
  const modalDeleteData = modalState.modalDelete.data;

  const { data, isLoading, isRefetching, refetch } = useCamera();

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

  const dataList = useMemo(() => {
    const tableData = data?.map((item) => ({
      id: item.id,
      nome: item.nome,
      tipoEquipamento:
        EQUIPMENT_TYPE.find((a) => a.value === item.tipoEquipamento)?.name ||
        "",
      enderecoRtsp: item.enderecoRtsp,
    }));

    return tableData || [];
  }, [data]);

  return (
    <S.Wrapper>
      <PageHeader
        title="Câmeras"
        left={
          <>
            <Button
              buttonStyle="primary"
              onClick={() => updateModalEdit("isOpen", true)}
            >
              <BiPlusCircle /> <span>Nova</span>
            </Button>
          </>
        }
      />

      {isLoading || isRefetching ? (
        <Loading size="40px" />
      ) : (
        <Table
          headerData={TABLE_HEADER}
          bodyData={dataList}
          moreInfoOptions={MORE_INFO_OPTIONS}
        />
      )}

      {modalState.modalEdit.isOpen && <ModalEdit />}

      {modalState.modalDelete.isOpen && (
        <ModalDelete
          message="a câmera"
          itemName={`${modalDeleteData?.nome || ""}`}
          deleteApi={deleteCameraById}
          callbackFunc={refetch}
        />
      )}
    </S.Wrapper>
  );
}
