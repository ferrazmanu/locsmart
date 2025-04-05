"use client";

import { Loading } from "@/src/assets";
import { Button } from "@/src/components/button/button";
import { ModalDelete } from "@/src/components/modal-delete/modal-delete";
import { IOption } from "@/src/components/more-info/more-info.interfaces";
import { PageHeader } from "@/src/components/page-header/page-header";
import { Table } from "@/src/components/table/table";
import { useModalContext } from "@/src/contexts/modal/modal.context";
import { useGroup } from "@/src/hooks/useGroup";
import { useMemo } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { ModalEdit } from "./(components)/(modal-edit)/modal-edit";
import { TABLE_HEADER } from "./groups.constants";
import * as S from "./groups.styles";

export default function Groups() {
  const { modalState, updateModalEdit, updateModalDelete } = useModalContext();
  const modalDeleteData = modalState.modalDelete.data;

  const { data, isLoading, isRefetching, refetch, deleteGroup } = useGroup();

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
      cameras: (item.cameraIds && item.cameraIds.length) || 0,
      usuarios: (item.usuarioIds && item.usuarioIds.length) || 0,
      descricao: item.descricao || "",
    }));

    return tableData || [];
  }, [data]);

  return (
    <S.Wrapper>
      <PageHeader
        title="Grupos"
        left={
          <>
            <Button
              buttonStyle="primary"
              onClick={() => updateModalEdit("isOpen", true)}
              disabled={isLoading}
            >
              <BiPlusCircle /> <span>Novo</span>
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
          deleteApi={deleteGroup}
          callbackFunc={refetch}
        />
      )}
    </S.Wrapper>
  );
}
