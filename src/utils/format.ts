import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const formatDate = (date: Date | Dayjs | string, withHours?: boolean) => {
  const format: string = withHours ? "DD/MM/YYYY, HH:mm" : "DD/MM/YYYY";

  const parsedDate = dayjs(date);
  if (parsedDate.isValid()) {
    return parsedDate.format(format);
  }
  return date;
};

const transformStringToDate = (date: string): Date => {
  const [dia, mes, ano] = date.split("/").map(Number);
  const formattedDate = new Date(Date.UTC(ano, mes - 1, dia, 12, 0));
  return formattedDate;
};

const formatDateISO = (date: Date | Dayjs | string) => {
  const dateISO = dayjs(date)
    .utc(true)
    .startOf("hour")
    .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  return dateISO;
};

const formatDateToDownload = (date: Date | Dayjs | string) => {
  const dateISO = dayjs(date).utc(true).startOf("hour").format("DD-MM-YYYY");
  return dateISO;
};

const normalizeString = (str: string) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

const removeMask = (str: string) => {
  return str.replace(/[^0-9]/g, "");
};

function formatNumberToAPI(value: string | number) {
  if (!value) return 0;

  return parseFloat(
    value
      .toString()
      .replace(/[^\d.,]/g, "")
      .replace(",", ".")
  );
}

const roundToDecimalPlaces = (number: number, decimalPlaces: number = 2) => {
  const factor = 10 ** decimalPlaces;
  return Math.round(number * factor) / factor;
};

const formatToBRL = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const formatToPercentage = (value: number) => {
  const adjustedValue = value / 100;

  return new Intl.NumberFormat("pt-BR", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(adjustedValue);
};

const formatToInteger = (value: number): string => {
  const integerValue = Math.floor(value);
  return integerValue.toString();
};

const removeFormatting = (data: string) => {
  return data.replace(/\D/g, "");
};

const formatCPF = (cpf?: string) => {
  const numericCPF = cpf?.replace(/\D/g, "");

  const formattedCPF = numericCPF?.replace(
    /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
    "$1.$2.$3-$4"
  );

  return formattedCPF;
};

const formatCNPJ = (cnpj?: string) => {
  const numericCNPJ = cnpj?.replace(/\D/g, "");

  const formattedCNPJ = numericCNPJ?.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    "$1.$2.$3/$4-$5"
  );

  return formattedCNPJ;
};

export {
  formatCNPJ,
  formatCPF,
  formatDate,
  formatDateISO,
  formatDateToDownload,
  formatNumberToAPI,
  formatToBRL,
  formatToInteger,
  formatToPercentage,
  normalizeString,
  removeFormatting,
  removeMask,
  roundToDecimalPlaces,
  transformStringToDate,
};
