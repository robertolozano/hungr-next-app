"use client";

import React from "react";
import { observer } from "mobx-react-lite";
import selectionPageStore from "../../../../stores/SelectionPageStore";

import RestaurantCard from "./card";

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
        <h1 style={{ fontSize: "30px", marginBottom: "30px" }}>Winner!</h1>

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
          </div>
        ) : (
          "Error Should Show Winner Here"
        )}
      </div>
    </div>
  );
});

export default SelectionPage;
