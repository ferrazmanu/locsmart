import { useEffect, useRef, useState } from "react";

import { Button } from "../button/button";

import { IFilters } from "./filters-wrapper.interfaces";

import { IoFilterSharp } from "react-icons/io5";
import * as S from "./filters-wrapper.styles";

export const FilterWrapper: React.FC<IFilters> = ({ filters }) => {
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setOpenFilter(false);
      }
    };

    if (openFilter) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openFilter, setOpenFilter]);

  return (
    <S.Wrapper ref={filterRef}>
      <Button buttonStyle="hollow" onClick={() => setOpenFilter(!openFilter)}>
        <IoFilterSharp size={20} />
        Filtros
      </Button>
      {openFilter && (
        <S.Filters isOpen={openFilter}>
          <S.FilterBody>{filters}</S.FilterBody>
        </S.Filters>
      )}
    </S.Wrapper>
  );
};
