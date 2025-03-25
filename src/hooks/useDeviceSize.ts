import { useEffect, useState } from "react";

export const useDeviceSize = () => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);

      function handleWindowResize() {
        setWindowWidth(window.innerWidth);
      }

      window.addEventListener("resize", handleWindowResize);

      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    }
  }, []);

  return windowWidth;
};
