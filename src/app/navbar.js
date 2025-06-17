"use client";

import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import styles from "./page.module.css"; // Ensure this path is correct
// import styles from "./page.css"; // Ensure this path is correct
import screenSizeStore from "../stores/ScreenSizeStore";
import { useRouter } from "next/navigation"; // Import useRouter hook

import { observer } from "mobx-react-lite";

const Navbar = observer(() => {
  const { isTablet, isMobile } = screenSizeStore;
  const router = useRouter(); // Initialize useRouter

  return (
    <div
      id="navbar"
      style={{
        display: "flex",
        flexDirection: "row",
        height: "50px",
        padding: "0px 5px",
        backgroundColor: "#d2e1f5",
        // backgroundColor: isMobile ? "red" : isTablet ? "green" : "blue",
      }}
    >
      <div
        id="left_navbar"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          width: "50%",
        }}
      >
        <Button
          style={{
            color: "black",
            fontWeight: 600,
            fontSize: "25px",
          }}
          onClick={() => {
            router.push("/");
          }}
        >
          Hungr
        </Button>
        <div
          style={{
            maxHeight: "50px",
          }}
        >
          <img
            style={{ height: "100%" }}
            src="https://cdn.glitch.com/aa77cb65-0ae2-4388-9521-dc70cf3b8f55%2Flogo-removebg-preview%20(1).png?v=1590852320072"
            alt="Logo"
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          width: "50%",
        }}
      >
        <Button
          style={{
            color: "black",
            fontWeight: 600,
            fontSize: "25px",
          }}
          onClick={() => {
            router.push("/");
          }}
        >
          Eat
        </Button>
        {/*<Button
          style={{
            color: "black",
            fontWeight: 600,
            fontSize: "25px",
          }}
          onClick={() => {
            router.push("/profile");
          }}
        >
          Profile{ FIXME: implement Profile functionality}
        </Button> */}
      </div>
    </div>
  );
});

export default Navbar;
