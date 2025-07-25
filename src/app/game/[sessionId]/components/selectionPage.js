"use client";

import React from "react";
import { observer } from "mobx-react-lite";
import selectionPageStore from "../../../../stores/SelectionPageStore";
import { Button, IconButton, TextField } from "@mui/material";
import CardCarousel from "./cardCarousel";
import SearchIcon from "@mui/icons-material/Search";
import screenSizeStore from "../../../../stores/ScreenSizeStore";

const SelectionPage = observer(() => {
  const { isTablet, isMobile } = screenSizeStore;

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      selectionPageStore.searchRestaurants();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifySelf: "center",
        alignSelf: "center",
        width: "90%",
        height: "100%",
      }}
    >
      <p style={{ fontSize: isMobile ? 20 : 23, marginTop: 5 }}>
        Search/Add Restaurants to vote on. Pick at least one to continue.
      </p>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "space-around",
          marginTop: 30,
          marginBottom: 10,
          height: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            label="Category/Restaurants"
            variant="outlined"
            value={selectionPageStore.searchTerm}
            onChange={(e) => selectionPageStore.setSearchTerm(e.target.value)}
            // onKeyPress={handleKeyPress}
            style={{
              margin: "0px 5px",
              backgroundColor: "white",
              fontSize: 10,
            }}
          />
          <TextField
            label="Location"
            variant="outlined"
            value={selectionPageStore.location}
            onChange={(e) => selectionPageStore.setLocation(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{ margin: "0px 5px", backgroundColor: "white" }}
          />
          <IconButton
            color="primary"
            sx={{
              height: "50px",
              width: "50px",
              backgroundColor: "primary.main",
              borderRadius: "4px",
              color: "white",
              "&:hover": {
                backgroundColor: "primary.dark", // Darken on hover
              },
              "& svg": {
                fill: "white", // Use theme color or custom color for negative fill effect
              },
              boxShadow: (theme) => theme.shadows[2], // MUI shadow level similar to buttons
            }}
            onClick={() => selectionPageStore.searchRestaurants()}
          >
            <SearchIcon />
          </IconButton>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              selectionPageStore.startVoting();
            }}
            style={{ margin: "0px 5px" }}
            sx={{
              height: "50px",
              // width: "150px",
              width: isMobile ? "5" : "150px",
              fontSize: isMobile ? "13px" : "auto",
            }}
            color="success"
            disabled={selectionPageStore?.selectedRestaurants?.length === 0}
          >
            Begin
          </Button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "100%",
          width: "100%",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "48%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2
            style={{
              margin: "20px 0px 0px 0px",
              fontSize: isMobile ? "18px" : "25px",
            }}
          >
            Search Result ({selectionPageStore?.unselectedRestaurants?.length}){" "}
            <span style={{ color: "green" }}> </span>
          </h2>
          <CardCarousel
            restaurants={selectionPageStore.unselectedRestaurants}
          />
        </div>
        <div
          style={{
            width: "48%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2
            style={{
              margin: "20px 0px 0px 0px",
              fontSize: isMobile ? "18px" : "25px",
            }}
          >
            Selected ({selectionPageStore?.selectedRestaurants?.length})
          </h2>
          <CardCarousel restaurants={selectionPageStore.selectedRestaurants} />
        </div>
      </div>
    </div>
  );
});

export default SelectionPage;
