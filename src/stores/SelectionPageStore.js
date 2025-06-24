import { makeAutoObservable, toJS, runInAction } from "mobx";
import axios from "axios";
import { doc, setDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../config/firebase"; // Assuming you have a firebase.js file for Firebase config
import { io } from "socket.io-client";

class SelectionPageStore {
  restaurants = [];

  voteIndex = 0;

  selectedRestaurants = [];

  status = "idle";

  cache = {};

  location = "";
  searchTerm = "";

  previousLocation = "";
  previousSearchTerm = "";

  socket = null;
  userCount = 0;

  username = "";
  sessionId = null;
  userList = [];

  router = null;

  constructor() {
    makeAutoObservable(this);
    console.log("Store re-initialized");
    if (typeof window !== "undefined") {
      if (!this.socket) {
        this.socket = io(
          process.env.NODE_ENV === "production"
            ? "https://hungr-8c75c7ba516f.herokuapp.com" // Render deployment URL
            : "http://localhost:3000", // Local development URL
          {
            transports: ["websocket"],
          }
        );
        this.setupSocketListeners();
      }

      if (typeof window) {
        window.selectionPageStore = this;
        window.toJS = toJS;
      }
    }
  }

  get selectionRoute() {
    return `/game/${this.sessionId}`;
  }

  get gameRef() {
    if (!this.sessionId) {
      return null;
    }

    return doc(db, "games", this.sessionId);
  }

  get notReadyUsers() {
    return this.userList.filter((user) => !user.ready);
  }

  updateVoteIndex = () => {
    this.voteIndex += 1;

    if (this.doneVoting) {
      this.socket.emit("markDoneVoting", this.sessionId);
    }
  };

  setStatus = (status) => {
    this.status = status;
  };

  setRouter = (routerObject) => {
    this.router = routerObject;
  };

  setupSocketListeners() {
    if (this.socket) {
      this.removeSocketListeners();

      this.socket.on("connect", () => {
        runInAction(() => {
          console.log("received on connect socket");
          this.userId = this.socket.id; // Store the current user's socket ID on connection
        });
      });

      this.socket.on("updateSelectedRestaurants", (restaurants) => {
        runInAction(() => {
          console.log(
            "running updateSelectedRestaurants!!!!!!!!!",
            restaurants
          );
          this.setSelectedRestaurants(restaurants);
        });
      });

      this.socket.on("startSelection", () => {
        runInAction(() => {
          this.status = "selection"; // Update store status if needed
        });
        this.routerPush(this.selectionRoute);
      });

      this.socket.on("everyoneDoneVoting", (winner) => {
        runInAction(() => {
          this.status = "done"; // Update store status if needed
          this.winner = winner;
        });
      });

      this.socket.on("startVoting", () => {
        runInAction(() => {
          console.log("changing status to voting! 1141");
          this.status = "voting";
        });
      });

      this.socket.on("updateUserList", (userList) => {
        runInAction(() => {
          console.log("received on updateUserList socket");

          this.userList = userList;
        });
      });

      this.socket.on("userCountUpdate", ({ numUsers }) => {
        console.log("Received userCount update", numUsers);
        runInAction(() => {
          this.userCount = numUsers;
        });
      });

      this.socket.on("voteUpdate", ({ restaurantId, voteChange }) => {
        const restaurantIndex = this.selectedRestaurants.findIndex(
          (res) => res.place_id === restaurantId
        );
        if (restaurantIndex !== -1) {
          runInAction(() => {
            this.selectedRestaurants[restaurantIndex].votes += voteChange;
          });
        }
      });
    }
  }

  removeSocketListeners() {
    if (this.socket) {
      this.socket.off("connect");
      this.socket.off("updateSelectedRestaurants");
      this.socket.off("startSelection");
      this.socket.off("everyoneDoneVoting");
      this.socket.off("startVoting");
      this.socket.off("updateUserList");
      this.socket.off("userCountUpdate");
      this.socket.off("voteUpdate");
    }
  }

  joinSession(sessionId) {
    sessionStorage.removeItem("refreshed-on-waiting"); // ✅ clear refresh flag

    this.setSessionId(sessionId);

    if (this.socket) {
      this.socket.emit("joinSession", sessionId);
    }
  }

  setSessionId(value) {
    this.sessionId = value;
  }

  setReadyStatus() {
    if (this.socket && this.sessionId) {
      this.socket.emit("markReady", this.sessionId);
    }
  }

  setUsername(username) {
    this.username = username;
    if (this.socket && this.sessionId) {
      this.socket.emit("setUsername", { sessionId: this.sessionId, username });
    }
  }

  // cleanup() {
  //   this.removeSocketListeners();
  //   if (this.socket) {
  //     this.socket.disconnect();
  //     this.socket = null;
  //   }
  // }

  cleanup() {
    sessionStorage.removeItem("refreshed-on-waiting");

    if (this.socket) {
      this.removeSocketListeners();
      this.socket.disconnect();
      this.socket = null;
    }

    this.sessionId = "";
    this.status = "idle";
    this.restaurants = [];
    this.userList = [];

    // Remove all listeners to prevent ghost events
    if (this.socket) {
      this.socket.removeAllListeners();
    }
  }

  setSearchTerm(term) {
    this.searchTerm = term;
  }

  setLocation(location) {
    this.location = location;
  }

  setSelectedRestaurants = (restaurants) => {
    this.selectedRestaurants = restaurants;
  };

  setRestaurants = (restaurants) => {
    this.restaurants = restaurants;
  };

  routerPush(route) {
    console.log("SessionId:", this.sessionId);
    if (this.sessionId) {
      this.router.push(route);
    }
  }

  addRestaurant(restaurant) {
    if (this.socket) {
      console.log("emitting from client addRestaurant", restaurant);

      this.socket.emit("addRestaurant", {
        sessionId: this.sessionId,
        restaurant,
      });
    }
  }

  removeRestaurant(restaurantId) {
    if (this.socket) {
      console.log("emitting from client removeRestaurant", restaurantId);

      this.socket.emit("removeRestaurant", {
        sessionId: this.sessionId,
        restaurantId,
      });
    }
  }

  handleSelectedRestaurants = (restaurant) => {
    const index = this.selectedRestaurants.findIndex(
      (res) => res.place_id == restaurant.place_id
    );

    if (index == -1) {
      const { name, price_level, photos, rating, place_id, formatted_address } =
        restaurant;

      console.log({
        name,
        price_level,
        photos,
        rating,
        place_id,
        formatted_address,
        votes: 0,
      });

      this.addRestaurant({
        name,
        price_level,
        photos,
        rating,
        place_id,
        formatted_address,
        votes: 0,
      });
    } else {
      this.removeRestaurant(restaurant.place_id);
    }
  };

  async updateVotes(restaurantId, voteChange) {
    try {
      await updateDoc(this.gameRef, {
        [`restaurants.${restaurantId}.votes`]: increment(voteChange),
      });

      if (this.socket) {
        this.socket.emit("vote", {
          sessionId: this.sessionId,
          restaurantId,
          voteChange,
        });
      }
    } catch (error) {
      console.error("Error updating votes:", error);
    }
  }

  searchRestaurants = async () => {
    this.previousLocation = this.location;
    this.previousSearchTerm = this.searchTerm;

    const cacheKey = `${this.searchTerm}-${this.location}`;
    // If previously searched, just fetch from cache
    if (this.cache[cacheKey]) {
      console.log("Fetching from cache");
      this.setRestaurants(this.cache[cacheKey]);
    } else {
      // If not searched, then query from API
      try {
        console.log("Not in cache, fetching from google");
        const response = await axios.post("/api/search", {
          term: this.searchTerm,
          location: this.location,
        });
        console.log("RESPONSE:", response);
        let restaurantData = response.data.results.map((restaurant) => {
          const {
            business_status,
            formatted_address,
            geometry,
            icon_background_color,
            name,
            opening_hours,
            photos,
            place_id,
            plus_code,
            price_level,
            rating,
            reference,
            types,
            user_ratings_total,
          } = restaurant;

          return {
            business_status,
            formatted_address,
            geometry,
            icon_background_color,
            name,
            opening_hours,
            photos,
            place_id,
            plus_code,
            price_level,
            rating,
            reference,
            types,
            user_ratings_total,
          };
        });
        this.setRestaurants(restaurantData);
        this.cache[cacheKey] = restaurantData; // Store results in cache

        console.log(toJS(this.restaurants));
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    }
  };

  async startWaitingRoom() {
    //TODO SHOULD I KEEP THIS LOGIC OR NOT. MAYBE USERS ALWAYS HAVE TO MAKE CUSTOM ID
    if (!this.sessionId) {
      const randomSessionId = this.createId();
      this.setSessionId(randomSessionId);
    }

    try {
      await setDoc(this.gameRef, {
        status: "waiting", // Indicates the game is waiting for restaurants to be added
        restaurants: {}, // Empty array initially
      });
      this.setStatus("waiting");
    } catch (error) {
      console.error("Error moving to waiting stage:", error);
      runInAction(() => {
        this.status = "error";
      });
    }
  }

  async startSelection() {
    try {
      await setDoc(this.gameRef, {
        status: "selection",
        restaurants: {},
      });

      if (this.socket) {
        this.socket.emit("startSelection", this.sessionId);
        this.routerPush(this.selectionRoute);
      }
    } catch (error) {
      console.error("Error moving to selection stage:", error);
      runInAction(() => {
        this.status = "error";
      });
    }
  }

  async startVoting() {
    console.log("startVoting function called 1414");
    if (this.restaurants.length > 0) {
      // Sanitize selectedRestaurants data
      const sanitizedRestaurants = this.selectedRestaurants.map(
        (restaurant) => {
          const sanitizedRestaurant = {};
          for (const key in restaurant) {
            if (restaurant[key] !== undefined) {
              sanitizedRestaurant[key] = restaurant[key];
            } else {
              sanitizedRestaurant[key] = "NA";
            }
          }
          return sanitizedRestaurant;
        }
      );

      // Transform restaurant array into restaurant objects.
      const restaurantsObj = sanitizedRestaurants.reduce((acc, restaurant) => {
        acc[restaurant.place_id] = restaurant;
        return acc;
      }, {});

      try {
        await setDoc(this.gameRef, {
          status: "voting",
          restaurants: restaurantsObj,
        });

        if (this.socket) {
          console.log("emitting startVoting here 1444");

          this.socket.emit("startVoting", this.sessionId);
        }

        runInAction(() => {
          console.log("changing status to voting 2");
          this.status = "voting";
        });
      } catch (error) {
        console.error("Error starting game:", error);
        runInAction(() => {
          this.status = "error";
        });
      }
    } else {
      alert("Must have at least one restaurant to begin");
    }
  }

  get unselectedRestaurants() {
    return this.restaurants.filter(
      (restaurant) =>
        !this.selectedRestaurants.some(
          (selectedRestaurant) =>
            selectedRestaurant.place_id === restaurant.place_id
        )
    );
  }

  get doneVoting() {
    return this.selectedRestaurants.length == this.voteIndex;
  }

  createId() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length: 22 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join("");
  }

  getPhotoUrl(photoReference) {
    return `/api/photo?photoReference=${photoReference}`;
  }
}

const selectionPageStore = new SelectionPageStore();
export default selectionPageStore;
