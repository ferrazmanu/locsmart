"use client";

import { Loading } from "@/src/assets";
import { Button } from "@/src/components/button/button";
import { ModalDelete } from "@/src/components/modal-delete/modal-delete";
import { IOption } from "@/src/components/more-info/more-info.interfaces";
import { PageHeader } from "@/src/components/page-header/page-header";
import { Table } from "@/src/components/table/table";
import { useModalContext } from "@/src/contexts/modal/modal.context";
import { IGroupTable } from "@/src/interfaces/group";
import {
  deleteGroupById,
  getAllGroups,
} from "@/src/services/api/endpoints/group";
import { useEffect, useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { ModalEdit } from "./(components)/(modal-edit)/modal-edit";
import { TABLE_HEADER } from "./groups.constants";
import * as S from "./groups.styles";

export default function Groups() {
  const [dataList, setDataList] = useState<IGroupTable[]>([]);
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
      const { data } = await getAllGroups();

      const tableData = data.map((item) => ({
        id: item.id,
        nome: item.nome,
        cameras: (item.cameraIds && item.cameraIds.length) || 0,
        usuarios: (item.usuarioIds && item.usuarioIds.length) || 0,
        descricao: item.descricao || "",
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
      <PageHeader
        title="Grupos"
        left={
          <>
            <Button
              buttonStyle="primary"
              onClick={() => updateModalEdit("isOpen", true)}
            >
              <BiPlusCircle /> <span>Novo</span>
            </Button>
          </>
        }
      />

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
          deleteApi={deleteGroupById}
          callbackFunc={fetchData}
        />
      )}
    </S.Wrapper>
  );
}
