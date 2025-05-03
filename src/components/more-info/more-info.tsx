import React, { useState } from "react";

import { GrMore } from "react-icons/gr";
import { IMoreInfo } from "./more-info.interfaces";
import {
  IconContent,
  StyledMoreInfo,
  WrapperIconMoreInfoContent,
} from "./more-info.styles";

export const MoreInfo: React.FC<IMoreInfo> = ({ options, boxSide, item }) => {
  const [openMoreInfo, setOpenMoreInfo] = useState(false);

  return (
    <WrapperIconMoreInfoContent>
      <IconContent onClick={() => setOpenMoreInfo(!openMoreInfo)}>
        <GrMore size={26} />
      </IconContent>
      <StyledMoreInfo
        isOpen={openMoreInfo}
        item={item}
        openMoreInfo={openMoreInfo}
        setOpenMoreInfo={setOpenMoreInfo}
        options={options}
        boxSide={boxSide}
      />
    </WrapperIconMoreInfoContent>
  );
};
