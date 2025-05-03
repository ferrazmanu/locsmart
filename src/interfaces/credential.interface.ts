interface ICredential {
  id?: number;
  apiId: number;
  apiHash: string;
  phoneNumber: string;
  cameraId: number;
}

interface IGetAllCredentialsResponse {
  itens: ICredential[];
  contagemTotal: number;
}

export type { ICredential, IGetAllCredentialsResponse };
