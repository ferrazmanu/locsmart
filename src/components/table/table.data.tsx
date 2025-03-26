import { Tooltip } from "../tooltip/tooltip";
import { ITableContents } from "./table.interfaces";
import { DataWrapper } from "./table.styles";

export const TableData: React.FC<ITableContents> = ({ children, ...props }) => {
  return (
    <DataWrapper className="data" {...props}>
      {props.tooltip ? (
        <Tooltip text={`${children}`} side={props.tooltipSide} {...props}>
          {children}
        </Tooltip>
      ) : (
        <span>{children}</span>
      )}
    </DataWrapper>
  );
};
