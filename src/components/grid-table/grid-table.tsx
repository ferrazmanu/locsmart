import { IGridTable } from "./grid-table.interfaces";
import { GridContainer, GridItem } from "./grid-table.styles";

export const GridTable: React.FC<IGridTable> = ({ dataList }) => {
  return (
    <GridContainer>
      {dataList.map(({ id, ...item }, itemIndex) => {
        return (
          <GridItem key={`item-${itemIndex}`}>
            {Object.keys(item).map((key, infoIndex) => {
              return (
                <div key={`info-${infoIndex}`} className="info-container">
                  {item[key as keyof typeof item] || "-"}
                </div>
              );
            })}
          </GridItem>
        );
      })}
    </GridContainer>
  );
};
