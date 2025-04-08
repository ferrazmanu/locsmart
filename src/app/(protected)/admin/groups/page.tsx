"use client";

import { Loading } from "@/src/assets";
import { Button } from "@/src/components/button/button";
import { ModalDelete } from "@/src/components/modal-delete/modal-delete";
import { IOption } from "@/src/components/more-info/more-info.interfaces";
import { PageHeader } from "@/src/components/page-header/page-header";
import { Paginate } from "@/src/components/paginate/paginate";
import { Table } from "@/src/components/table/table";
import { INITIAL_FILTERS } from "@/src/constants/initial-filters";
import { useModalContext } from "@/src/contexts/modal/modal.context";
import { useGroup } from "@/src/hooks/useGroup";
import { ISearch } from "@/src/interfaces/search.interface";
import { useMemo, useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { ModalEdit } from "./(components)/(modal-edit)/modal-edit";
import { TABLE_HEADER } from "./groups.constants";
import * as S from "./groups.styles";

export default function Groups() {
  const { modalState, updateModalState } = useModalContext();

  const [filters, setFilters] = useState<ISearch>(INITIAL_FILTERS);

  const { data, isLoading, isRefetching, refetch, deleteGroup } =
    useGroup(filters);

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
    return (
      data?.itens.map((item) => ({
        id: item.id,
        nome: item.nome,
        cameras: (item.cameraIds && item.cameraIds.length) || 0,
        usuarios: (item.usuarioIds && item.usuarioIds.length) || 0,
        descricao: item.descricao || "",
      })) ?? []
    );
  }, [data]);

  return (
    <S.Wrapper>
      <PageHeader
        title="Grupos"
        left={
          <>
            <Button
              buttonStyle="primary"
              onClick={() => updateModalState("isOpen", "edit")}
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

      {totalPages > 1 && !isLoading && (
        <Paginate
          forcePage={filters?.pagina - 1}
          onPageChange={({ selected }: { selected: number }) =>
            handleSetFilters({ ...filters, pagina: selected + 1 })
          }
          pageCount={totalPages}
        />
      )}

      {modalState.isOpen === "edit" && <ModalEdit />}

      {modalState.isOpen === "delete" && (
        <ModalDelete
          message="a câmera"
          deleteApi={deleteGroup}
          callbackFunc={refetch}
        />
      )}
    </S.Wrapper>
  );
}
