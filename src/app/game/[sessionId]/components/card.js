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

const RestaurantCard = observer(({ restaurant, index }) => {
  return (
    <Card
      key={index}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "410px",
        margin: "0px 0px 20px 0px",
        borderRadius: "20px",
        border: "2px solid black",
      }}
    >
      <CardHeader
        title={restaurant?.name}
        // subheader={<StarIcon />}
      ></CardHeader>
      <CardMedia
        component="img"
        height="170"
        // image={
        //   "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg"
        // }
        //   image={selectionPageStore.getPhotoUrl(
        //     restaurant.photos[0].photo_reference
        //   )}
        // alt="Paella dish"
        style={{
          pointerEvents: "none",
          backgroundImage:
            "url(" +
            "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg" +
            ")",
          backgroundSize: "cover",
          backgroundPosition: "100%",
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
                (x, index) => <StarIcon key={index} />
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

          <p style={{ padding: "10px 0px 0px 0px" }}>
            {restaurant?.formatted_address?.slice(0, 50)}
            {restaurant?.formatted_address?.length > 50 && "..."}
          </p>
        </div>
      </CardContent>

      <CardActions>
        <div style={{ margin: 0 }}>
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
    </Card>
  );
});

export default RestaurantCard;
