import { AnimatePresence } from "framer-motion";
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

  const handleMoreInfo = () => {
    setOpenMoreInfo(!openMoreInfo);
  };

  return (
    <WrapperIconMoreInfoContent>
      <IconContent onClick={handleMoreInfo}>
        <GrMore size={26} />
      </IconContent>
      {openMoreInfo && (
        <AnimatePresence>
          <StyledMoreInfo
            item={item}
            openMoreInfo={openMoreInfo}
            setOpenMoreInfo={setOpenMoreInfo}
            options={options}
            boxSide={boxSide}
          />
        </AnimatePresence>
      )}
    </WrapperIconMoreInfoContent>
  );
};
