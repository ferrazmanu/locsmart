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
import { PROFILE_TYPE } from "@/src/constants/profile-type";
import { useModalContext } from "@/src/contexts/modal/modal.context";
import { useCompany } from "@/src/hooks/useCompany";
import { useUser } from "@/src/hooks/useUsers";
import { ISearch } from "@/src/interfaces/search.interface";
import { Wrapper } from "@/src/styles/global";
import { useMemo, useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { ModalEdit } from "./(components)/(modal-edit)/modal-edit";
import { TABLE_HEADER } from "./users.constants";

export default function Users() {
  const { openModal, openModalTypes } = useModalContext();

  const [filters, setFilters] = useState<ISearch>(INITIAL_FILTERS);

  const { data, isLoading, isRefetching, refetch, deleteUser } =
    useUser(filters);
  const { data: companyList } = useCompany();

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
          title: "Editar Usuário",
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
          title: "Remover Usuário",
        });
      },
    },
  ];

  const dataList = useMemo(() => {
    return (
      data?.itens.map((item) => ({
        id: item.id,
        nome: item.nome,
        email: item.email,
        perfil: PROFILE_TYPE.find((a) => a.value === item.perfil)?.name || "",
        status: item.ativo ? "Ativo" : "Inativo",
        empresa:
          companyList?.itens.find((company) => company.id === item.empresaId)
            ?.razaoSocial || "",
        moreInfo: (
          <MoreInfo
            item={{ ...item }}
            options={MORE_INFO_OPTIONS}
            boxSide="right"
          />
        ),
      })) ?? []
    );
  }, [data, companyList]);

  return (
    <Wrapper>
      <PageHeader
        title="Usuários"
        left={
          <>
            <Button
              buttonStyle="primary"
              onClick={() =>
                openModal({
                  type: "edit",
                  data: null,
                  title: "Novo Usuário",
                })
              }
              disabled={isLoading}
            >
              <BiPlusCircle /> <span>Novo</span>
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
      {openModalTypes.has("delete") && (
        <ModalDelete
          message="o usuário"
          deleteApi={deleteUser}
          callbackFunc={refetch}
        />
      )}
    </Wrapper>
  );
}
