"use client";

import { Loading } from "@/src/assets";
import { Base64Image } from "@/src/components/base64-image/base64-image";
import { CustomLink } from "@/src/components/custom-link/custom-link";
import { FilterWrapper } from "@/src/components/filter-wrapper/filter-wrapper";
import { GridTable } from "@/src/components/grid-table/grid-table";
import { Label } from "@/src/components/label/label";
import { ModalImage } from "@/src/components/modal-image/modal-image";
import { PageHeader } from "@/src/components/page-header/page-header";
import { Paginate } from "@/src/components/paginate/paginate";
import { SearchFilters } from "@/src/components/search-filters/search-filters";
import { Table } from "@/src/components/table/table";
import { Toggle } from "@/src/components/toggle/toggle";
import { INITIAL_FILTERS } from "@/src/constants/initial-filters";
import { useModalContext } from "@/src/contexts/modal/modal.context";
import { usePlate } from "@/src/hooks/usePlate";
import { ISearch } from "@/src/interfaces/search.interface";
import { Wrapper } from "@/src/styles/global";
import { formatDate } from "@/src/utils/format";
import { useMemo, useState } from "react";
import { FiCamera } from "react-icons/fi";
import { TfiLayoutGrid2, TfiViewList } from "react-icons/tfi";
import { TABLE_HEADER } from "./plate-reading.constants";
import { ButtonOption, ChangeButtonsWrapper } from "./plate-reading.styles";

export default function PlateReading() {
  const [filters, setFilters] = useState<ISearch>(INITIAL_FILTERS);

  const [templateType, setTemplateType] = useState<"list" | "grid">("list");
  const [autoRefetch, setAutoRefetch] = useState<boolean>(false);

  const { openModalTypes, openModal } = useModalContext();
  const { data, isLoading, isRefetching } = usePlate(filters, autoRefetch);

  const totalPages = Math.ceil(
    (data?.contagemTotal || 0) / (filters?.tamanhoPagina || 1)
  );

  const handleSetFilters = (newFilters: ISearch) => {
    setFilters(newFilters);
  };

  const formattedData = useMemo(() => {
    return (
      data?.itens.map((item) => ({
        id: item.id,
        criadoEm: item.criadoEm ? formatDate(item.criadoEm, true) : "-",
        placa: item.placa || "-",
        imagemPlaca: item.imagemPlaca,
        imagemVeiculo: item.imagemVeiculo,
        modelo: item.modelo || "-",
        cor: item.cor || "-",
      })) ?? []
    );
  }, [data]);

  const dataList = useMemo(() => {
    return formattedData.map((item) => ({
      id: item.id,
      data: item.criadoEm,
      placa: item.placa,
      imagemPlaca: item.imagemPlaca ? (
        <Base64Image
          base64String={item.imagemPlaca}
          height={100}
          width={100}
          title={`Imagem Placa - ${item.placa}`}
          openOnClick={true}
        />
      ) : (
        "-"
      ),
      imagemVeiculo: item.imagemVeiculo ? (
        <CustomLink
          href={""}
          onClick={() =>
            openModal({
              type: "image",
              data: {
                src: `data:image/png;base64,${item.imagemVeiculo}`,
                alt: `Imagem Veículo - ${item.placa}`,
                width: 600,
                height: 500,
                title: `Imagem Veículo - ${item.placa}`,
              },
            })
          }
        >
          <FiCamera size={14} />
          Ver Imagem
        </CustomLink>
      ) : (
        "-"
      ),
      modelo: item.modelo,
      cor: item.cor,
    }));
  }, [formattedData]);

  const dataGrid = useMemo(() => {
    return formattedData.map((item) => ({
      id: item.id,
      imagemVeiculo: item.imagemVeiculo ? (
        <Base64Image
          base64String={item.imagemVeiculo}
          height={600}
          width={500}
          title={`Imagem Veículo - ${item.placa}`}
          openOnClick={true}
        />
      ) : (
        "-"
      ),
      data: (
        <>
          <b>Data: </b>
          {item.criadoEm}
        </>
      ),
      placa: (
        <>
          <b>Placa: </b>
          {item.placa}
        </>
      ),
      modelo: (
        <>
          <b>Modelo: </b>
          {item.modelo}
        </>
      ),
      cor: (
        <>
          <b>Cor: </b>
          {item.cor}
        </>
      ),
    }));
  }, [formattedData]);

  return (
    <Wrapper>
      <PageHeader
        title="Leitura de Placas"
        top={
          <FilterWrapper
            filters={
              <SearchFilters
                onSubmitFilters={handleSetFilters}
                clearFilters={() => setFilters(INITIAL_FILTERS)}
              />
            }
          />
        }
        left={
          <div style={{ display: "flex", gap: "8px" }}>
            <Toggle
              value={autoRefetch}
              onChange={setAutoRefetch}
              disableLabels
              size="small"
            />
            <Label htmlFor="autoRefetch">Atualizar Automaticamente</Label>
          </div>
        }
        right={
          <ChangeButtonsWrapper>
            <ButtonOption
              type="button"
              onClick={() => setTemplateType("list")}
              selected={templateType === "list"}
            >
              <TfiViewList />
            </ButtonOption>
            <hr />
            <ButtonOption
              type="button"
              onClick={() => setTemplateType("grid")}
              selected={templateType === "grid"}
            >
              <TfiLayoutGrid2 />
            </ButtonOption>
          </ChangeButtonsWrapper>
        }
      />

      {isLoading || isRefetching ? (
        <Loading size="40px" />
      ) : templateType === "list" ? (
        <Table headerData={TABLE_HEADER} bodyData={dataList} />
      ) : (
        <GridTable dataList={dataGrid} />
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

      {openModalTypes.has("image") && <ModalImage />}
    </Wrapper>
  );
}
