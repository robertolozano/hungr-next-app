"use client";

import React, { useEffect } from "react";
import screenSizeStore from "../stores/ScreenSizeStore";
import { observer } from "mobx-react-lite";

const ScreenSizer = observer(({ children }) => {
  const { setWidth } = screenSizeStore;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateWidth = () => {
        setWidth(window.innerWidth);
      };

      window.addEventListener("resize", updateWidth);
      updateWidth(); // Initial check
      window.addEventListener("resize", updateWidth);
      updateWidth(); // Initial check

      return () => {
        window.removeEventListener("resize", updateWidth);
      };
    }
  }, [setWidth]);

  return <>{children} </>;
});

export default ScreenSizer;
