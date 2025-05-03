"use client";

import { PageHeader } from "@/src/components/page-header/page-header";

import { Loading } from "@/src/assets";
import { Button } from "@/src/components/button/button";
import { FilterWrapper } from "@/src/components/filter-wrapper/filter-wrapper";
import { ModalDelete } from "@/src/components/modal-delete/modal-delete";
import { IOption } from "@/src/components/more-info/more-info.interfaces";
import { Paginate } from "@/src/components/paginate/paginate";
import { SearchFilters } from "@/src/components/search-filters/search-filters";
import { Table } from "@/src/components/table/table";
import { EQUIPMENT_TYPE } from "@/src/constants/equipment-type";
import { INITIAL_FILTERS } from "@/src/constants/initial-filters";
import { useModalContext } from "@/src/contexts/modal/modal.context";
import { useCamera } from "@/src/hooks/useCamera";
import { ISearch } from "@/src/interfaces/search.interface";
import { useMemo, useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { ModalEdit } from "./(components)/(modal-edit)/modal-edit";
import { ModalTelegramCredentials } from "./(components)/(modal-telegram-credentials)/modal-telegram-credentials";
import { TABLE_HEADER } from "./cameras.constants";
import * as S from "./cameras.styles";

export default function Cameras() {
  const { currentModal, openModal } = useModalContext();

  const [filters, setFilters] = useState<ISearch>(INITIAL_FILTERS);

  const { data, isLoading, isRefetching, refetch, deleteCamera } =
    useCamera(filters);

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
          title: "Editar Câmera",
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
          title: "Remover Câmera",
        });
      },
    },
  ];

  const dataList = useMemo(() => {
    return (
      data?.itens.map((item) => ({
        id: item.id,
        nome: item.nome,
        tipoEquipamento:
          EQUIPMENT_TYPE.find((a) => a.value === item.tipoEquipamento)?.name ||
          "",
        credencial: item.credencial,
        enderecoRtsp: item.enderecoRtsp,
      })) ?? []
    );
  }, [data]);

  return (
    <S.Wrapper>
      <PageHeader
        title="Câmeras"
        left={
          <>
            <Button
              buttonStyle="primary"
              onClick={() =>
                openModal({
                  type: "edit",
                  data: null,
                  title: "Nova Câmera",
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
        <Table
          headerData={TABLE_HEADER}
          bodyData={dataList}
          moreInfoOptions={MORE_INFO_OPTIONS}
        />
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

      <ModalEdit />
      <ModalTelegramCredentials />
      <ModalDelete
        message="a Câmera"
        deleteApi={deleteCamera}
        callbackFunc={refetch}
      />
    </S.Wrapper>
  );
}
