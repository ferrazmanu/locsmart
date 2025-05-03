interface IModalDelete {
  message: string;
  deleteApi: (id: number) => void;
  callbackFunc: () => void;
}

export type { IModalDelete };
