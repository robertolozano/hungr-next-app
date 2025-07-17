"use client";

import React from "react";
import { observer } from "mobx-react-lite";
import RestaurantCard from "./card";

const CardCarousel = observer(({ restaurants }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",

        width: "100%",
        height: "100%",
        overflow: "auto",

        // paddingBottom: "100px",
      }}
    >
      {restaurants.map((restaurant, index) => (
        <RestaurantCard key={index} restaurant={restaurant} index={index} />
      ))}
    </div>
  );
});

export default CardCarousel;
