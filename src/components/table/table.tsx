import { MoreInfo } from "../more-info/more-info";
import { TableBody } from "./table.body";
import { TableData } from "./table.data";
import { TableHeader } from "./table.header";
import { ITable } from "./table.interfaces";
import { TableRow } from "./table.row";
import { NoData, TableContainer, TableWrapper } from "./table.styles";

export const Table: React.FC<ITable> = ({
  headerData,
  bodyData,
  moreInfoOptions,
}) => {
  return (
    <TableContainer>
      <TableWrapper>
        {bodyData && bodyData.length > 0 ? (
          <>
            <TableHeader>
              {headerData.map((item, index) => {
                return (
                  <TableData
                    key={`header-${index}`}
                    columnWidth={item.width}
                    isTitle={true}
                  >
                    {item.title}
                  </TableData>
                );
              })}
              {moreInfoOptions && <TableData columnWidth="3vw">{""}</TableData>}
            </TableHeader>
            <TableBody>
              {bodyData.map(({ id, ...item }, rowIndex) => {
                const keys = Object.keys(item);

                return (
                  <TableRow key={`row-${rowIndex}`}>
                    {Object.keys(item).map((key, colIndex) => {
                      const isLastColumn = colIndex === keys.length - 1;
                      const headerItem = headerData[colIndex];

                      return (
                        <TableData
                          key={`${item}-${key}`}
                          tooltipSide={isLastColumn ? "right" : "left"}
                          columnWidth={headerItem.width}
                          data-label={headerItem.title}
                          overflowed
                          tooltip
                        >
                          {item[key as keyof typeof item] || "-"}
                        </TableData>
                      );
                    })}

                    {moreInfoOptions && (
                      <TableData columnWidth="3vw">
                        <MoreInfo
                          item={{ ...item, id }}
                          options={moreInfoOptions}
                          boxSide="right"
                        />
                      </TableData>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </>
        ) : (
          <NoData>Nenhum dado.</NoData>
        )}
      </TableWrapper>
    </TableContainer>
  );
};
