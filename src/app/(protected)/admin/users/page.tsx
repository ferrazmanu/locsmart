"use client";
import { Loading } from "@/src/assets";
import { Button } from "@/src/components/button/button";
import { ModalDelete } from "@/src/components/modal-delete/modal-delete";
import { IOption } from "@/src/components/more-info/more-info.interfaces";
import { PageHeader } from "@/src/components/page-header/page-header";
import { Table } from "@/src/components/table/table";
import { PROFILE_TYPE } from "@/src/constants/profile-type";
import { useModalContext } from "@/src/contexts/modal/modal.context";
import { useCompany } from "@/src/hooks/useCompany";
import { useUser } from "@/src/hooks/useUsers";
import { deleteUserById } from "@/src/services/api/endpoints/user";
import { useMemo } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { ModalEdit } from "./(components)/(modal-edit)/modal-edit";
import { TABLE_HEADER } from "./users.constants";
import * as S from "./users.styles";

export default function Users() {
  const { modalState, updateModalEdit, updateModalDelete } = useModalContext();
  const modalDeleteData = modalState.modalDelete.data;

  const { data, isLoading, isRefetching, refetch } = useUser();
  const { data: companyList } = useCompany();

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
      email: item.email,
      perfil: PROFILE_TYPE.find((a) => a.value === item.perfil)?.name || "",
      status: item.ativo ? "Ativo" : "Inativo",
      empresa:
        companyList?.find((company) => company.id === item.empresaId)
          ?.razaoSocial || "",
    }));

    return tableData || [];
  }, [data]);

  return (
    <S.Wrapper>
      <PageHeader
        title="Usuários"
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
          message="o usuário"
          itemName={`${modalDeleteData?.nome || ""}`}
          deleteApi={deleteUserById}
          callbackFunc={refetch}
        />
      )}
    </S.Wrapper>
  );
}
