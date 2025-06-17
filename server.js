const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server);
  const io = new Server(httpServer, {
    pingTimeout: 20000,
    pingInterval: 10000,
    cors: {
      origin:
        process.env.NODE_ENV === "production"
          ? "https://hungr-next-app.vercel.app" // Production front-end
          : "http://localhost:3000", // Development front-end
      methods: ["GET", "POST"],
    },
  });

  const sessions = {};

  const broadcastUserCount = (sessionId) => {
    const room = io.sockets.adapter.rooms.get(sessionId);
    const numUsers = room ? room.size : 0;
    console.log(`Session ${sessionId} has ${numUsers} user(s) connected`);
    io.in(sessionId).emit("userCountUpdate", { numUsers });
  };

  const broadcastIsEveryoneDone = (sessionId) => {
    const session = sessions[sessionId];
    if (session) {
      const totalUsers = session.users.length;
      const doneVotingUsers = session.users.filter(
        (user) => user.doneVoting
      ).length;

      if (doneVotingUsers === totalUsers) {
        // Determine restaurant with most votes
        const winner = session.restaurants.reduce((top, current) => {
          return current.votes > (top?.votes ?? -Infinity) ? current : top;
        }, null);

        console.log(`All users done voting. Winner:`, winner);
        io.in(sessionId).emit("everyoneDoneVoting", winner);
      }
    }
  };

  const broadcastUserList = (sessionId) => {
    const session = sessions[sessionId];
    if (session) {
      const userList = session.users.map((user) => ({
        id: user.id,
        username: user.username || "Anonymous",
        ready: user.ready || false,
      }));

      io.in(sessionId).emit("updateUserList", userList);
    }
  };

  // Set up WebSocket event handlers
  io.on("connection", (socket) => {
    console.log("New user connected, socket id=", socket.id);

    // Happens each time a user joins session id
    socket.on("joinSession", (sessionId) => {
      socket.join(sessionId);

      // If session id previously exists make object for it
      if (!sessions[sessionId]) {
        sessions[sessionId] = {
          users: [],
          restaurants: [],
        };
      }

      // Add joining user to session id object
      sessions[sessionId].users.push({
        id: socket.id,
        username: null,
        ready: false,
        doneVoting: false,
      });

      console.log(`User ${socket.id} joined session ${sessionId}`, sessions);
      socket.emit("updateSelectedRestaurants", sessions[sessionId].restaurants);
      broadcastUserCount(sessionId);
      broadcastUserList(sessionId);
    });

    socket.on("setUsername", ({ sessionId, username }) => {
      // Find session
      const session = sessions[sessionId];
      if (session) {
        // Find socket user
        const user = session.users.find((user) => user.id === socket.id);

        // Change username and broadcast
        if (user) {
          user.username = username;
          console.log(
            `User ${socket.id} set username to ${username} in session ${sessionId}`
          );
          broadcastUserList(sessionId);
        }
      }
    });

    // Add restaurant
    socket.on("addRestaurant", ({ sessionId, restaurant }) => {
      console.log("received addRestaurant message", sessions, sessionId);
      if (sessions[sessionId]) {
        console.log("received addRestaurant message and session exists");

        sessions[sessionId].restaurants.push({ ...restaurant, votes: 0 });
        console.log(`Restaurant added to session ${sessionId}:`, restaurant);

        io.in(sessionId).emit(
          "updateSelectedRestaurants",
          sessions[sessionId].restaurants
        );
      }
    });

    // Remove restaurant
    socket.on("removeRestaurant", ({ sessionId, restaurantId }) => {
      if (sessions[sessionId]) {
        sessions[sessionId].restaurants = sessions[
          sessionId
        ].restaurants.filter(
          (restaurant) => restaurant.place_id !== restaurantId
        );
        console.log(
          `Restaurant removed from session ${sessionId}:`,
          restaurantId
        );

        io.in(sessionId).emit(
          "updateSelectedRestaurants",
          sessions[sessionId].restaurants
        );
      }
    });

    socket.on("startSelection", (sessionId) => {
      console.log(`User ${socket.id} started the game in session ${sessionId}`);
      io.in(sessionId).emit("startSelection"); // Notify all users in the session
    });

    socket.on("startVoting", (sessionId) => {
      console.log(`User ${socket.id} started voting in session ${sessionId}`);
      io.in(sessionId).emit("startVoting"); // Notify all users in the session
    });

    socket.on("markReady", (sessionId) => {
      const session = sessions[sessionId];

      if (session) {
        const user = session.users.find((user) => user.id === socket.id);

        if (user) {
          user.ready = !user.ready;
          console.log(`User ${socket.id} is ready in session ${sessionId}`);
          broadcastUserList(sessionId);
        }
      }
    });

    socket.on("markDoneVoting", (sessionId) => {
      const session = sessions[sessionId];

      // Check if session exists
      if (session) {
        // Find socket user who marked ready
        const user = session.users.find((user) => user.id === socket.id);

        // Mark user ready and broadcast to others
        if (user) {
          user.doneVoting = true;
          console.log(
            `User ${socket.id} is doneVoting in session ${sessionId}`
          );
          broadcastIsEveryoneDone(sessionId);
        }
      }
    });

    socket.on("vote", ({ sessionId, restaurantId, voteChange }) => {
      io.in(sessionId).emit("voteUpdate", { restaurantId, voteChange });

      const session = sessions[sessionId];
      if (!session) return;

      const restaurant = session.restaurants.find(
        (r) => r.place_id === restaurantId
      );
      if (restaurant) {
        restaurant.votes += voteChange; // +1 for like, -1 if you support that feature
      }

      io.in(sessionId).emit("voteUpdate", {
        restaurantId,
        voteChange,
        // currentVotes: restaurant.votes,
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      // Remove user from the session and clean up if necessary
      Object.keys(sessions).forEach((sessionId) => {
        const session = sessions[sessionId];
        session.users = session.users.filter((user) => user.id !== socket.id);
        if (session.users.length === 0) {
          delete sessions[sessionId];
        } else {
          broadcastUserCount(sessionId);
          broadcastUserList(sessionId);
        }
      });
    });
  });

  // Serve the Next.js application
  server.all("*", (req, res) => handle(req, res));

  const PORT = process.env.PORT || 3000;
  // Start the server
  httpServer.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
