import { ITableContents } from "./table.interfaces";
import { BodyWrapper } from "./table.styles";

export const TableBody: React.FC<ITableContents> = ({ children }) => {
  return <BodyWrapper className="body">{children}</BodyWrapper>;
};
