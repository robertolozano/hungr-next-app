"use client";

import React, { useEffect } from "react";
import screenSizeStore from "../stores/ScreenSizeStore";
import { observer } from "mobx-react-lite";

const ScreenSizer = observer(({ children }) => {
  const { setWidth } = screenSizeStore;

  useEffect(() => {
    const updateWidth = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", updateWidth);
    updateWidth(); // Initial check

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, [setWidth]);

  return (
    <html lang="en" style={{ height: "100vh" }}>
      <body style={{ height: "100vh" }}>{children} </body>
    </html>
  );
});

export default ScreenSizer;
