"use client";

import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import selectionPageStore from "../../../../stores/SelectionPageStore";
import { Button, IconButton, TextField } from "@mui/material";
import CardCarousel from "./cardCarousel";
import SearchIcon from "@mui/icons-material/Search";
import RestaurantTinderCard from "./tinderCard";

const SelectionPage = observer(() => {
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
          justifyContent: "center",
          alignItems: "center",

          height: "100%",
          width: "100%",
        }}
      >
        {selectionPageStore.winner ? (
          selectionPageStore.winner
        ) : selectionPageStore.doneVoting ? (
          <h1>Waiting on other players...</h1>
        ) : (
          <RestaurantTinderCard />
        )}
        {/* <CardCarousel restaurants={selectionPageStore.unselectedRestaurants} /> */}
      </div>
    </div>
  );
});

export default SelectionPage;
