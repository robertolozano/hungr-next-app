"use client";

import React, { useState, useMemo } from "react";
import TinderCard from "react-tinder-card";
import { Button } from "@mui/material";
import selectionPageStore from "../../../../stores/SelectionPageStore";
// import styles from "./VotingPage.module.css"; // Custom CSS for styling
import styles from "./tinderCard.module.css";
import RestaurantCard from "./card";

const RestaurantTinderCard = () => {
  const [currentIndex, setCurrentIndex] = useState(
    selectionPageStore.selectedRestaurants.length - 1
  );

  const childRefs = useMemo(
    () =>
      Array(selectionPageStore.selectedRestaurants.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const swiped = (direction, restaurantId) => {
    if (direction === "right") {
      console.log("swiped right", restaurantId);
      selectionPageStore.updateVotes(restaurantId, 1); // Increase votes
    } else {
      console.log("swiped left", restaurantId);
      selectionPageStore.updateVotes(restaurantId, -1); // Increase votes
    }
    setCurrentIndex((prev) => prev - 1);
  };

  const outOfFrame = (restaurantId) => {};

  const swipe = async (dir) => {
    const canSwipe = true;

    if (canSwipe && currentIndex >= 0) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  const handleClick = (direction) => {
    const restaurant = selectionPageStore.selectedRestaurants[currentIndex];

    if (direction === "right") {
      console.log("swiped right", restaurant.name);
      swipe(direction);
    } else {
      console.log("swiped left", restaurant.name);
      swipe(direction);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {selectionPageStore.selectedRestaurants.map((restaurant, index) => (
        <TinderCard
          ref={childRefs[index]}
          key={restaurant.place_id}
          onSwipe={(dir) => swiped(dir, restaurant.place_id)}
          onCardLeftScreen={() => outOfFrame(restaurant.place_id)}
          preventSwipe={["up", "down"]}
          className={styles.swipe}
        >
          <div
            style={{
              //   backgroundImage:
              //     "url(" +
              //     "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg" +
              //     ")",
              //   backgroundImage: "url(" + character.url + ")"
              // backgroundSize: "cover",
              // backgroundPosition: "center",
              borderRadius: "20px",
            }}
            className={styles.card}
          >
            <RestaurantCard restaurant={restaurant} />
          </div>
        </TinderCard>
      ))}

      <div
        style={{
          display: "flex",
          marginTop: 600,
        }}
      >
        <Button
          style={{ width: 150, height: 50 }}
          variant="contained"
          color="error"
          onClick={() => handleClick("left")}
          disabled={currentIndex < 0}
        >
          X
        </Button>
        <Button
          style={{ width: 150, height: 50 }}
          variant="contained"
          color="success"
          onClick={() => handleClick("right")}
          disabled={currentIndex < 0}
        >
          ♥
        </Button>
      </div>
    </div>
  );
};

export default RestaurantTinderCard;
