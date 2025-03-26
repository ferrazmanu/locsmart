import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";

import { IoMdMore } from "react-icons/io";
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
        <IoMdMore />
      </IconContent>
      {openMoreInfo && (
        <AnimatePresence>
          <StyledMoreInfo
            item={item}
            handleClose={handleMoreInfo}
            options={options}
            boxSide={boxSide}
          />
        </AnimatePresence>
      )}
    </WrapperIconMoreInfoContent>
  );
};
