import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { IOptionsList } from "./options-list.interfaces";
import {
  IconContent,
  StyledOptionsList,
  WrapperIconOptionsListContent,
} from "./options-list.styles";

export const OptionsList: React.FC<IOptionsList> = ({ options, boxSide }) => {
  const [openOptionsList, setOpenOptionsList] = useState(false);

  const handleOptionsList = () => {
    setOpenOptionsList(!openOptionsList);
  };

  return (
    <WrapperIconOptionsListContent>
      <IconContent onClick={handleOptionsList}>
        <IoIosArrowDown size={18} color="" />
      </IconContent>
      {openOptionsList && (
        <AnimatePresence>
          <StyledOptionsList
            handleClose={handleOptionsList}
            options={options}
            boxSide={boxSide}
          />
        </AnimatePresence>
      )}
    </WrapperIconOptionsListContent>
  );
};
