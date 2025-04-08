import { useCallback, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import {
  IPages,
  IPaginateComponent,
  IPaginationComponent,
} from "@/src/components/paginate/paginate.interface";

import { Page, PaginateButton, Wrapper } from "./paginate.styles";

const Pagination: React.FC<IPaginationComponent> = (props) => {
  const [pages, setPages] = useState<IPages[]>([]);

  const handleGetPages = useCallback(() => {
    const arrPages = [];

    if (props.pageCount <= 7) {
      for (let i = 1; i <= props.pageCount; i++) {
        arrPages.push({ id: i, value: i, disabled: false });
      }
    } else {
      arrPages.push({ id: 1, value: 1, disabled: false });

      if (props.currentPage <= 3) {
        for (let i = 2; i <= 5; i++) {
          arrPages.push({ id: i, value: i, disabled: false });
        }
        arrPages.push({ id: "ellipsis1", value: "...", disabled: true });
        arrPages.push({
          id: props.pageCount,
          value: props.pageCount,
          disabled: false,
        });
      } else if (props.currentPage >= props.pageCount - 4) {
        arrPages.push({ id: "ellipsis1", value: "...", disabled: true });
        for (let i = props.pageCount - 4; i <= props.pageCount; i++) {
          arrPages.push({ id: i, value: i, disabled: false });
        }
      } else {
        arrPages.push({ id: "ellipsis1", value: "...", disabled: true });
        for (let i = props.currentPage - 1; i <= props.currentPage + 1; i++) {
          arrPages.push({ id: i, value: i, disabled: false });
        }
        arrPages.push({ id: "ellipsis2", value: "...", disabled: true });
        arrPages.push({
          id: props.pageCount,
          value: props.pageCount,
          disabled: false,
        });
      }
    }

    setPages([...arrPages]);
  }, [props.currentPage, props.pageCount]);

  useEffect(() => {
    handleGetPages();
  }, [handleGetPages]);

  return (
    <>
      {pages?.map((item) => (
        <Page
          key={item.id}
          disabled={item.disabled}
          selected={item.id === (props.forcePage ? props.forcePage + 1 : 1)}
          onClick={() => props.handlePageClick(Number(item.value))}
        >
          {item.value}
        </Page>
      ))}
    </>
  );
};

export const Paginate: React.FC<IPaginateComponent> = (props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (page: number) => {
    props.onPageChange({ selected: page - 1 });
  };

  const handleNextClick = () => {
    handlePageClick(currentPage + 1);
  };

  const handleBackClick = () => {
    if (currentPage > 0) {
      handlePageClick(currentPage - 1);
    }
  };

  useEffect(() => {
    const atualPage = props.forcePage ? props.forcePage + 1 : 1;
    setCurrentPage(atualPage);
  }, [props.forcePage]);

  return (
    <Wrapper>
      <PaginateButton onClick={handleBackClick} disabled={currentPage <= 1}>
        <FaChevronLeft />
      </PaginateButton>

      <Pagination
        {...props}
        handlePageClick={handlePageClick}
        currentPage={currentPage}
      />

      <PaginateButton
        onClick={handleNextClick}
        disabled={currentPage >= props.pageCount}
      >
        <FaChevronRight />
      </PaginateButton>
    </Wrapper>
  );
};
