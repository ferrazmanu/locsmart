interface IError {
  status?: number;
  code?: string;
  message: string;
  stackTrace?: string;
  title: string;
}

export type { IError };
