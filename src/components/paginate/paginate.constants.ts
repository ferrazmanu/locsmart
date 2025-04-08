import { TSelectOptions } from "../select/select.interfaces";
import { IPaginate } from "./paginate.interface";

const INITIAL_PAGINATE: IPaginate = {
  perPage: 22,
  totalPages: 1,
  currentPage: 1,
};

const PAGE_SIZE: TSelectOptions[] = [
  {
    value: 10,
    name: "10 por página",
  },
  {
    value: 20,
    name: "20 por página",
  },
  {
    value: 50,
    name: "50 por página",
  },
];

export { INITIAL_PAGINATE, PAGE_SIZE };
