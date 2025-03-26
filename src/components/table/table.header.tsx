import { ITableContents } from "./table.interfaces";
import { HeaderWrapper } from "./table.styles";

export const TableHeader: React.FC<ITableContents> = ({ children }) => {
  return <HeaderWrapper className="header">{children}</HeaderWrapper>;
};
