"use client";

import { Loading } from "@/src/assets";
import { Button } from "@/src/components/button/button";
import { ModalDelete } from "@/src/components/modal-delete/modal-delete";
import { IOption } from "@/src/components/more-info/more-info.interfaces";
import { PageHeader } from "@/src/components/page-header/page-header";
import { Table } from "@/src/components/table/table";
import { useModalContext } from "@/src/contexts/modal/modal.context";
import { useCompany } from "@/src/hooks/useCompany";
import { formatCNPJ } from "@/src/utils/format";
import { useMemo } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { ModalEdit } from "./(components)/(modal-edit)/modal-edit";
import { TABLE_HEADER } from "./companies.constants";
import * as S from "./companies.styles";

export default function Companies() {
  const { modalState, updateModalState } = useModalContext();

  const { data, isLoading, isRefetching, refetch, deleteCompany } =
    useCompany();

  const MORE_INFO_OPTIONS: IOption[] = [
    {
      icon: <MdModeEdit />,
      label: "Editar",
      onClick: (data) => {
        updateModalState("data", data);
        updateModalState("isOpen", "edit");
      },
    },
    {
      icon: <MdDeleteForever />,
      label: "Deletar",
      onClick: (data) => {
        updateModalState("data", data);
        updateModalState("isOpen", "delete");
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
      papagamentoEmDia: item.pagamentoEmDia ? "Sim" : "Não",
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
              onClick={() => updateModalState("isOpen", "edit")}
              disabled={isLoading}
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

      {modalState.isOpen === "edit" && <ModalEdit />}

      {modalState.isOpen === "delete" && (
        <ModalDelete
          message="a empresa"
          deleteApi={deleteCompany}
          callbackFunc={refetch}
        />
      )}
    </S.Wrapper>
  );
}
