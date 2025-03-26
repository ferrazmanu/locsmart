"use client";

import { PageHeader } from "@/src/components/page-header/page-header";
import { IPaginate } from "@/src/components/paginate/paginate.interface";
import { Table } from "@/src/components/table/table";
import { ICompanyTable } from "@/src/interfaces/company";
import { getCompanies } from "@/src/services/api/endpoints/companies";
import { formatCNPJ } from "@/src/utils/format";
import { useEffect, useState } from "react";
import { TABLE_HEADER } from "./companies.constants";

export default function Companies() {
  const [dataList, setDataList] = useState<ICompanyTable[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paginate, setPaginate] = useState<IPaginate>({
    perPage: 22,
    totalPages: 1,
    currentPage: 1,
  });

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const { data } = await getCompanies();

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
    <section>
      <PageHeader title="Empresas" />

      <Table headerData={TABLE_HEADER} bodyData={dataList} />
    </section>
  );
}
