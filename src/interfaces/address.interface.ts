interface IAddress {
  cep: string;
  logradouro: string;
  complemento?: string | null;
  unidade?: string | null;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia?: string | null;
  ddd: string;
  siafi: string;
  codigoEstado?: number;
}

export type { IAddress };
