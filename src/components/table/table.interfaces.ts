import { IOption } from '../more-info/more-info.interfaces';
import { TSide } from '../tooltip/tooltip.interfaces';

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
interface ITable<T = Record<string, any>> {
  headerData: ITableHeader[];
  bodyData: T[];
  moreInfoOptions?: IOption[];
}

interface ITableContents {
  children: React.ReactNode;
  tooltip?: boolean;
  overflowed?: boolean;
  tooltipSide?: TSide;
  columnWidth?: string;
  isTitle?: boolean;
}

interface ITableDataStyles {
  columnWidth?: string;
  isTitle?: boolean;
}

interface ITableHeader {
  title: string;
  width?: string;
}

export type { ITable, ITableContents, ITableDataStyles, ITableHeader };
