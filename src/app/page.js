"use client";
export const dynamic = "force-dynamic";

import React from "react";
import Button from "@mui/material/Button";
import screenSizeStore from "../stores/ScreenSizeStore";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";

const LandingPage = observer(() => {
  const { isDesktop, isTablet } = screenSizeStore;
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
              width: isDesktop ? "50%" : isTablet ? "60%" : "80%",
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
      </div>
    </div>
  );
});

export default LandingPage;
