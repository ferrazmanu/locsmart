interface IError {
  status?: number;
  code?: string;
  message: string;
  stackTrace?: string;
  title: string;
  error: string;
}

export type { IError };
