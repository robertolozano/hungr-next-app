"use client";

import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import selectionPageStore from "../../../../stores/SelectionPageStore";
import { Button, IconButton, TextField } from "@mui/material";
import CardCarousel from "./cardCarousel";
import SearchIcon from "@mui/icons-material/Search";
import RestaurantTinderCard from "./tinderCard";
import RestaurantCard from "./card";
import styles from "./tinderCard.module.css";
import TinderCard from "react-tinder-card";

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
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <h1>Winner</h1>

        {selectionPageStore.winner ? (
          <div
            style={{
              width: "100%",
              height: "30%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TinderCard
              // ref={childRefs[index]}
              // key={restaurant.place_id}
              // onSwipe={(dir) => swiped(dir, restaurant.place_id)}
              // onCardLeftScreen={() => outOfFrame(restaurant.place_id)}
              preventSwipe={["up", "down", "left", "right"]}
              className={styles.swipe}
            >
              <div
                style={{
                  borderRadius: "20px",
                }}
                className={styles.card}
              >
                <RestaurantCard
                  restaurant={selectionPageStore.winner}
                  noButtons={true}
                />
              </div>
            </TinderCard>
          </div>
        ) : (
          "Error Should Show Winner Here"
        )}
      </div>
    </div>
  );
});

export default SelectionPage;
