"use client";

import { Loading } from "@/src/assets";
import { Button } from "@/src/components/button/button";
import { PageHeader } from "@/src/components/page-header/page-header";
import { Table } from "@/src/components/table/table";
import { useModalContext } from "@/src/contexts/modal/modal.context";
import { ICompanyTable } from "@/src/interfaces/company";
import { getAllCompanies } from "@/src/services/api/endpoints/company";
import { formatCNPJ } from "@/src/utils/format";
import { useEffect, useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { ModalEdit } from "./(components)/(modal-edit)/modal-edit";
import { TABLE_HEADER } from "./companies.constants";
import * as S from "./companies.styles";

export default function Companies() {
  const [dataList, setDataList] = useState<ICompanyTable[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { modalState, updateModalEdit } = useModalContext();

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const { data } = await getAllCompanies();

      const tableData = data.map((item) => ({
        razaoSocial: item.razaoSocial,
        cnpj: item.cnpj ? formatCNPJ(item.cnpj) : "",
        nomeResponsavelFinanceiro: item.nomeResponsavelFinanceiro,
        emailFinanceiro: item.emailFinanceiro,
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

      {isLoading ? (
        <Loading size="40px" />
      ) : (
        <Table headerData={TABLE_HEADER} bodyData={dataList} />
      )}

      {modalState.modalEdit.isOpen && <ModalEdit />}
    </S.Wrapper>
  );
}
