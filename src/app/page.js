"use client";

import React from "react";
import Button from "@mui/material/Button";
import screenSizeStore from "../stores/ScreenSizeStore";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";

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
        justifyContent: "center",
        height: "100%",
        backgroundColor: "#f3f7fc",
        color: "black",
        fontFamily: "sans-serif",
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
            <h1
              id="hero_text"
              style={{
                textAlign: "center",
                marginBottom: 20,
                fontSize: isMobile ? 30 : 50,
              }}
            >
              Not sure where to eat?
            </h1>
            <h1
              id="hero_text"
              style={{
                textAlign: "center",
                marginBottom: 20,
                fontSize: isMobile ? 30 : 50,
              }}
            >
              Tired of “whatever” or “you pick”?
            </h1>

            <h1
              id="hero_text"
              style={{
                textAlign: "center",
                marginBottom: 20,
                fontSize: isMobile ? 30 : 50,
              }}
            >
              We’re here to help.
            </h1>

            <Button
              style={{
                margin: 10,
                fontSize: isMobile ? 15 : 30,
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
              width: isDesktop ? "50%" : isTablet ? "60%" : "80%",
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
    </div>
  );
});

export default LandingPage;
