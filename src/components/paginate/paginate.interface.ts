interface IPaginate {
  perPage: number;
  totalPages: number;
  currentPage: number;
}

export interface IPaginateComponent {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  forcePage?: number;
}

export interface IPaginationComponent {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  handlePageClick: (page: number) => void;
  forcePage?: number;
  currentPage: number;
}

export interface IPages {
  id: string | number;
  value: string | number;
  disabled: boolean;
}

export type { IPaginate };
