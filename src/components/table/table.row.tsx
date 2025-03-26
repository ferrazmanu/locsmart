import { ITableContents } from "./table.interfaces";
import { RowWrapper } from "./table.styles";

export const TableRow: React.FC<ITableContents> = ({ children }) => {
  return <RowWrapper className="row">{children}</RowWrapper>;
};
