"use client";

import React from "react";
import { observer } from "mobx-react-lite";
import screenSizeStore from "../../../../stores/ScreenSizeStore";
import Button from "@mui/material/Button";
import selectionPageStore from "../../../../stores/SelectionPageStore";
import { useRouter } from "next/navigation";

import RestaurantCard from "./card";

const SelectionPage = observer(() => {
  const { isDesktop, isTablet, isMobile } = screenSizeStore;
  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <h1 style={{ fontSize: "30px", marginBottom: "10px" }}>Winner!</h1>
        <h2 style={{ fontSize: "30px", marginBottom: "20px" }}>
          Total Votes: {selectionPageStore.winner.votes}
        </h2>

        {selectionPageStore.winner ? (
          <div
            style={{
              borderRadius: "20px",
            }}
          >
            <RestaurantCard
              restaurant={selectionPageStore.winner}
              noButtons={true}
            />
          </div>
        ) : (
          "Error Should Show Winner Here"
        )}

        <Button
          style={{
            margin: 10,
            fontSize: isMobile ? 15 : 15,
          }}
          fullWidth={false}
          variant="contained"
          onClick={() => router.push(`/`)}
        >
          New Session
        </Button>
      </div>
    </div>
  );
});

export default SelectionPage;
