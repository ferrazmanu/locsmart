import { Button } from "@/src/components/button/button";

import { DateInput } from "@/src/components/input/input.date";
import { Input } from "@/src/components/input/input.default";
import { useForm } from "react-hook-form";

import {
  ButtonsWrapper,
  FiltersForm,
} from "@/src/components/filter-wrapper/filters-wrapper.styles";
import { PAGE_SIZE } from "@/src/components/paginate/paginate.constants";
import { Select } from "@/src/components/select/select";
import { INITIAL_FILTERS } from "@/src/constants/initial-filters";
import { ISearch } from "@/src/interfaces/search.interface";

interface SearchFiltersProps {
  onSubmitFilters: (filters: ISearch) => void;
  clearFilters: () => void;
  useDates?: boolean;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  onSubmitFilters,
  clearFilters,
  useDates,
}) => {
  const form = useForm<ISearch>({
    defaultValues: INITIAL_FILTERS,
  });

  const { register, handleSubmit, reset } = form;

  const clearSearch = () => {
    reset();
    clearFilters();
  };

  return (
    <FiltersForm onSubmit={handleSubmit(onSubmitFilters)}>
      <Input
        id="pesquisa"
        {...register("pesquisa")}
        placeholder="Pesquisa"
        maxLength={100}
      />

      {useDates && (
        <>
          <DateInput
            hookForm={form}
            name="dataInicial"
            placeholder="Data Inicial"
          />

          <DateInput
            hookForm={form}
            name="dataFinal"
            placeholder="Data Final"
          />
        </>
      )}

      <Select
        initialOptions={PAGE_SIZE}
        title="Tamanho da Página"
        name="tamanhoPagina"
        hookForm={form}
      />

      <ButtonsWrapper>
        <Button type="button" buttonStyle="secondary" onClick={clearSearch}>
          Limpar
        </Button>
        <Button type="submit" buttonStyle="primary">
          Filtrar
        </Button>
      </ButtonsWrapper>
    </FiltersForm>
  );
};
