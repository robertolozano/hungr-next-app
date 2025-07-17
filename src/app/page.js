"use client";

import React from "react";
import Button from "@mui/material/Button";
import screenSizeStore from "../stores/ScreenSizeStore";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import { Teko } from "next/font/google";

const teko = Teko({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-myFont",
});

const LandingPage = observer(() => {
  const { isDesktop, isTablet, isMobile } = screenSizeStore;
  const router = useRouter();
  const handleButtonClick = () => {
    router.push("/setup");
  };

  return (
    <div
      id="main"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "90%",
        maxWidth: "2000px",
        alignSelf: "center",
        justifySelf: "center",
      }}
    >
      <div
        id="hero_section"
        style={{
          padding: "0px 0px",
          margin: "20px 0px 20px 0px",
          display: "flex",
          flexDirection: isDesktop ? "row" : "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          id="hero_content"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: isDesktop ? "50%" : "90%",
          }}
        >
          <div style={{ alignSelf: "flex-start" }}>
            <h1
              id="hero_text"
              style={{
                textAlign: "left",
                fontSize: isMobile ? 30 : 50,
              }}
            >
              Not sure where to eat?
            </h1>
            <h1
              id="hero_text"
              style={{
                textAlign: "center",
                fontSize: isMobile ? 30 : 50,
                textAlign: "left",
              }}
            >
              Tired of “whatever” or “you pick”?
            </h1>
            <h1
              id="hero_text"
              style={{
                textAlign: "center",
                fontSize: isMobile ? 30 : 50,
                textAlign: "left",
              }}
            >
              We’re here to help.
            </h1>
          </div>
          <Button
            style={{
              margin: "10px 0px",
              fontSize: isMobile ? 15 : 30,
              alignSelf: "flex-start",
            }}
            fullWidth={false}
            variant="contained"
            onClick={() => handleButtonClick()}
            // className={teko.className}
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
            width: isDesktop ? "50%" : isTablet ? "60%" : "90%",
          }}
        >
          <img
            style={{ width: "100%" }}
            id="hero_image"
            src="/images/cover_image4.png"
            alt="Hero"
          />
        </div>
      </div>
    </div>
  );
});

export default LandingPage;
