"use client";

import { useEffect } from "react";

function useBodyOverflowHidden(isHidden: boolean) {
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (isHidden) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }

      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [isHidden]);
}

export default useBodyOverflowHidden;
