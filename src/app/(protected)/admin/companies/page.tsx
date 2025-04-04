"use client";

import { Loading } from "@/src/assets";
import { Button } from "@/src/components/button/button";
import { ModalDelete } from "@/src/components/modal-delete/modal-delete";
import { IOption } from "@/src/components/more-info/more-info.interfaces";
import { PageHeader } from "@/src/components/page-header/page-header";
import { Table } from "@/src/components/table/table";
import { useModalContext } from "@/src/contexts/modal/modal.context";
import { useCompany } from "@/src/hooks/useCompany";
import { deleteCompanyById } from "@/src/services/api/endpoints/company";
import { formatCNPJ } from "@/src/utils/format";
import { useMemo } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { ModalEdit } from "./(components)/(modal-edit)/modal-edit";
import { TABLE_HEADER } from "./companies.constants";
import * as S from "./companies.styles";

export default function Companies() {
  const { modalState, updateModalEdit, updateModalDelete } = useModalContext();
  const modalDeleteData = modalState.modalDelete.data;

  const { data, isLoading, isRefetching, refetch } = useCompany();

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
      razaoSocial: item.razaoSocial,
      cnpj: item.cnpj ? formatCNPJ(item.cnpj) : "",
      nomeResponsavelFinanceiro: item.nomeResponsavelFinanceiro,
      emailFinanceiro: item.emailFinanceiro,
      cameras: item.cameras ? item.cameras.length : 0,
    }));

    return tableData || [];
  }, [data]);

  return (
    <S.Wrapper>
      <PageHeader
        title="Empresas"
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
          message="a empresa"
          itemName={`${modalDeleteData?.razaoSocial || ""}`}
          deleteApi={deleteCompanyById}
          callbackFunc={refetch}
        />
      )}
    </S.Wrapper>
  );
}
