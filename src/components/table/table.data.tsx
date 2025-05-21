import { ITableContents } from "./table.interfaces";
import { DataWrapper } from "./table.styles";

export const TableData: React.FC<ITableContents> = ({ children, ...props }) => {
  const isStringOrNumber =
    typeof children === "string" || typeof children === "number";

  const isValidTooltip =
    isStringOrNumber &&
    children.toString().trim() !== "" &&
    children.toString().trim() !== "-";

  const tooltipContent = isValidTooltip ? children : undefined;

  return (
    <DataWrapper
      className={isValidTooltip ? "tooltip data" : ""}
      {...props}
      {...(tooltipContent !== undefined
        ? { "data-tooltip-content": tooltipContent }
        : {})}
    >
      {isStringOrNumber && <span className="text">{children}</span>}
      {!isStringOrNumber && <div className="content">{children}</div>}
    </DataWrapper>
  );
};
