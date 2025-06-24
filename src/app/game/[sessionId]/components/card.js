"use client";

import React from "react";
import { observer } from "mobx-react-lite";
import selectionPageStore from "../../../../stores/SelectionPageStore";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import PaidIcon from "@mui/icons-material/Paid";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import screenSizeStore from "../../../../stores/ScreenSizeStore";

const RestaurantCard = observer(({ restaurant, index, noButtons }) => {
  const { isTablet, isMobile } = screenSizeStore;

  console.log(
    selectionPageStore.getPhotoUrl(restaurant.photos?.[0].photo_reference)
  );
  return (
    <Card
      key={index}
      style={{
        width: "100%",
        height: "100%",
        minHeight: noButtons ? "300px" : "425px",
        margin: "0px 0px 20px 0px",
        borderRadius: "20px",
        border: "2px solid black",
      }}
    >
      <p style={{ fontSize: isMobile ? 15 : 20, padding: 15 }}>
        {isMobile ? restaurant?.name?.slice(0, 32) : restaurant.name}
        {isMobile && restaurant?.name?.length > 32 && "..."}
      </p>
      {/* <CardHeader title={restaurant?.name}></CardHeader> */}
      <CardMedia
        component="img"
        height="170"
        // image={
        //   "https://cdn.glitch.com/aa77cb65-0ae2-4388-9521-dc70cf3b8f55%2Flogo-removebg-preview%20(1).png?v=1590852320072"
        // }
        // image={selectionPageStore.getPhotoUrl(
        //   restaurant.photos[0].photo_reference
        // )}
        // alt="Paella dish"
        style={{
          pointerEvents: "none",
          // backgroundImage:
          //   "url(" +
          //   "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg" +
          //   ")",
          backgroundImage: restaurant.photos?.[0]?.photo_reference
            ? "url(" +
              selectionPageStore.getPhotoUrl(
                restaurant.photos?.[0].photo_reference
              ) +
              ")"
            : "url(" + "/images/NoRestaurantPhotoPlaceholder.png" + ")",
          // backgroundSize: "contain",
          backgroundSize: isMobile ? "100% 100%" : "326px 100%",
          backgroundRepeat: isMobile ? "no-repeat" : "repeat",
        }}
      />
      <CardContent>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: "300px",
          }}
        >
          <div>
            {restaurant?.price_level != undefined
              ? Array.from({ length: restaurant?.price_level }).map(
                  (x, index) => <PaidIcon key={index} />
                )
              : "No Price Info"}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "30px",
            }}
          >
            {restaurant?.rating !== undefined &&
              Array.from({ length: Math.trunc(restaurant?.rating) }).map(
                (x, index) => (
                  <StarIcon
                    style={{ fontSize: isMobile ? "20px" : "30px" }}
                    key={index}
                  />
                )
              )}
            {restaurant?.rating !== undefined &&
              restaurant?.rating % 1 != 0 && <StarHalfIcon />}
            {restaurant?.rating !== undefined &&
              Array.from({
                length: Math.floor(5 - restaurant?.rating),
              }).map((x, index) => <StarBorderIcon key={index} />)}

            <p
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                margin: "0px 0px 0px 4px",
              }}
            >
              {restaurant?.rating && restaurant.rating}
            </p>
          </div>

          <p
            style={{
              wordWrap: "break-word",
              maxWidth: "100%",
              padding: "5px 0px 0px 0px",
              overflowWrap: "break-word",
              width: "45%",
              height: "42px",
              overflow: "hidden",
            }}
          >
            {restaurant?.formatted_address?.slice(0, 50)}
            {restaurant?.formatted_address?.length > 50 && "..."}
          </p>
        </div>
      </CardContent>

      {noButtons ? null : (
        <CardActions style={{ alignSelf: "flex-end" }}>
          <div
            style={{
              margin: 0,
              alignSelf: "flex-end",
            }}
          >
            <Button
              variant="contained"
              onClick={() =>
                selectionPageStore.handleSelectedRestaurants(restaurant)
              }
              color={
                selectionPageStore.selectedRestaurants.find(
                  (res) => res.place_id == restaurant.place_id
                ) == undefined
                  ? "success"
                  : "error"
              }
            >
              {selectionPageStore.selectedRestaurants.find(
                (res) => res.place_id == restaurant.place_id
              ) == undefined
                ? "Add"
                : "Remove"}
            </Button>
          </div>

          {/* <Button variant="contained">Reviews</Button>{" "} */}
        </CardActions>
      )}
    </Card>
  );
});

export default RestaurantCard;
