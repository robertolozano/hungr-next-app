"use client";

import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import styles from "./page.module.css"; // Ensure this path is correct
// import styles from "./page.css"; // Ensure this path is correct
import screenSizeStore from "../stores/ScreenSizeStore";
import { useRouter } from "next/navigation"; // Import useRouter hook
import { observer } from "mobx-react-lite";
import Navbar from "./navbar";

const LandingPage = observer(() => {
  const { isDesktop, isTablet, isMobile } = screenSizeStore;
  const router = useRouter();
  const handleButtonClick = () => {
    router.push("/setup");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f3f7fc",
        color: "black",
        fontFamily: "sans-serif",
        height: "100%",
      }}
    >
      <div id="main" style={{ width: "90%", alignSelf: "center" }}>
        <div
          id="hero_section"
          style={{
            padding: "10px 0px",
            margin: "20px 0px 50px 0px",
            display: "flex",
            flexDirection: isDesktop ? "row" : "column",
            alignItems: "center",
          }}
        >
          <div
            id="hero_content"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: isDesktop ? "50%" : "100%",
            }}
          >
            <h1 id="hero_text" style={{ textAlign: "center", margin: 10 }}>
              For those times, when <span>“whatever”</span> isn’t an option.
            </h1>

            <Button
              style={{
                margin: 10,
              }}
              fullWidth={false}
              variant="contained"
              onClick={() => handleButtonClick()}
            >
              Let&apos;s Eat
            </Button>
          </div>
          <div
            id="hero_image"
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "10px 0px",
              width: isDesktop ? "50%" : "100%",
            }}
          >
            <img
              style={{ width: "60%" }}
              id="hero_image"
              src="/images/Online_shopping_PNG.png"
              alt="Hero"
            />
          </div>
        </div>

        <div
          id="second_section"
          style={{
            margin: "20px 0px 40px 0px",
            display: "flex",
            flexDirection: isDesktop ? "row-reverse" : "column",
            alignItems: "center",
          }}
        >
          <div
            id="second_section_text"
            style={{
              margin: "50px 0px 20px 0px",
              width: isDesktop ? "50%" : "100%",
            }}
          >
            <h1 style={{ textAlign: "center" }}>
              Take out the pressure of deciding and get to eating!
            </h1>
          </div>
          <div
            id="second_section_image"
            style={{
              display: "flex",
              justifyContent: "center",
              width: isDesktop ? "50%" : "100%",
            }}
          >
            <img
              style={{ width: "60%" }}
              src="/images/people_PNG.png"
              alt="People"
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default LandingPage;
