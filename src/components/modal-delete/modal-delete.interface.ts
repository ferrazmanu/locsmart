interface IModalDelete {
  message: string;
  itemName: string;
  deleteApi: (id: string) => void;
}

interface IModalDeleteStyles {
  open: boolean;
}

export type { IModalDelete, IModalDeleteStyles };
