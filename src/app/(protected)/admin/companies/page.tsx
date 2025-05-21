"use client";

import { Loading } from "@/src/assets";
import { Button } from "@/src/components/button/button";
import { FilterWrapper } from "@/src/components/filter-wrapper/filter-wrapper";
import { ModalDelete } from "@/src/components/modal-delete/modal-delete";
import { MoreInfo } from "@/src/components/more-info/more-info";
import { IOption } from "@/src/components/more-info/more-info.interfaces";
import { PageHeader } from "@/src/components/page-header/page-header";
import { Paginate } from "@/src/components/paginate/paginate";
import { SearchFilters } from "@/src/components/search-filters/search-filters";
import { Table } from "@/src/components/table/table";
import { INITIAL_FILTERS } from "@/src/constants/initial-filters";
import { useModalContext } from "@/src/contexts/modal/modal.context";
import { useCompany } from "@/src/hooks/useCompany";
import { ISearch } from "@/src/interfaces/search.interface";
import { Wrapper } from "@/src/styles/global";
import { formatCNPJ } from "@/src/utils/format";
import { useMemo, useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { MdDeleteForever, MdModeEdit, MdOutlinePayments } from "react-icons/md";
import { ModalEdit } from "./(components)/(modal-edit)/modal-edit";
import { ModalRegisterPayment } from "./(components)/(modal-register-payment)/modal-register-payment";
import { TABLE_HEADER } from "./companies.constants";

export default function Companies() {
  const { openModal, openModalTypes } = useModalContext();

  const [filters, setFilters] = useState<ISearch>(INITIAL_FILTERS);

  const { data, isLoading, isRefetching, refetch, deleteCompany } =
    useCompany(filters);

  const totalPages = Math.ceil(
    (data?.contagemTotal || 0) / (filters?.tamanhoPagina || 1)
  );

  const handleSetFilters = (newFilters: ISearch) => {
    setFilters(newFilters);
  };

  const MORE_INFO_OPTIONS: IOption[] = [
    {
      icon: <MdModeEdit />,
      label: "Editar",
      onClick: (data) => {
        openModal({
          type: "edit",
          data: data,
          title: "Editar Empresa",
        });
      },
    },
    {
      icon: <MdOutlinePayments />,
      label: "Registrar Pagamento",
      onClick: (data) => {
        openModal({
          type: "register-payment",
          data: data,
          title: "Pagamento de Mensalidade",
        });
      },
    },
    {
      icon: <MdDeleteForever />,
      label: "Remover",
      onClick: (data) => {
        openModal({
          type: "delete",
          data: data,
          title: "Remover Empresa",
        });
      },
    },
  ];

  const dataList = useMemo(() => {
    return (
      data?.itens.map((item) => ({
        id: item.id,
        razaoSocial: item.razaoSocial,
        cnpj: item.cnpj ? formatCNPJ(item.cnpj) : "",
        nomeResponsavelFinanceiro: item.nomeResponsavelFinanceiro,
        emailFinanceiro: item.emailFinanceiro,
        cameras: item.cameras ? item.cameras.length : 0,
        papagamentoEmDia: item.pagamentoEmDia ? "Sim" : "Não",
        moreInfo: (
          <MoreInfo
            item={{ ...item }}
            options={MORE_INFO_OPTIONS}
            boxSide="right"
          />
        ),
      })) ?? []
    );
  }, [data]);

  return (
    <Wrapper>
      <PageHeader
        title="Empresas"
        left={
          <>
            <Button
              buttonStyle="primary"
              onClick={() =>
                openModal({
                  type: "edit",
                  data: null,
                  title: "Nova Empresa",
                })
              }
              disabled={isLoading}
            >
              <BiPlusCircle /> <span>Nova</span>
            </Button>
          </>
        }
        right={
          <FilterWrapper
            filters={
              <SearchFilters
                onSubmitFilters={handleSetFilters}
                clearFilters={() => setFilters(INITIAL_FILTERS)}
              />
            }
          />
        }
      />

      {isLoading || isRefetching ? (
        <Loading size="40px" />
      ) : (
        <Table headerData={TABLE_HEADER} bodyData={dataList} />
      )}

      {totalPages > 1 && !isLoading && (
        <Paginate
          forcePage={filters?.pagina - 1}
          onPageChange={({ selected }: { selected: number }) =>
            handleSetFilters({ ...filters, pagina: selected + 1 })
          }
          pageCount={totalPages}
        />
      )}

      {openModalTypes.has("edit") && <ModalEdit />}
      {openModalTypes.has("register-payment") && <ModalRegisterPayment />}
      {openModalTypes.has("delete") && (
        <ModalDelete
          message="a empresa"
          deleteApi={deleteCompany}
          callbackFunc={refetch}
        />
      )}
    </Wrapper>
  );
}
