interface IModalDelete {
  message: string;
  itemName: string;
  deleteApi: (id: number) => void;
  callbackFunc: () => void;
}

interface IModalDeleteStyles {
  open: boolean;
}

export type { IModalDelete, IModalDeleteStyles };
