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
      // origin: "http://localhost:3006",
      origin: "*", // Set this to your client URL in production for security
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

  const broadcastReadiness = (sessionId) => {
    const session = sessions[sessionId];
    if (session) {
      const totalUsers = session.users.length;
      const readyUsers = session.users.filter((user) => user.ready).length;
      io.in(sessionId).emit("readyStatusUpdate", {
        readyUsers,
        totalUsers,
      });

      if (readyUsers === totalUsers) {
        io.in(sessionId).emit("startVoting");
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
    console.log("New user connected:", socket.id);

    socket.on("joinSession", (sessionId) => {
      socket.join(sessionId);

      if (!sessions[sessionId]) {
        sessions[sessionId] = { users: [] };
      }

      sessions[sessionId].users.push({
        id: socket.id,
        username: null,
        ready: false,
      });

      console.log(`User ${socket.id} joined session ${sessionId}`);
      socket.emit("updateRestaurants", sessions[sessionId].restaurants);
      broadcastUserCount(sessionId);
      broadcastUserList(sessionId); // Update all users
      broadcastReadiness(sessionId);
    });

    socket.on("setUsername", ({ sessionId, username }) => {
      const session = sessions[sessionId];
      if (session) {
        const user = session.users.find((user) => user.id === socket.id);
        if (user) {
          user.username = username;
          console.log(
            `User ${socket.id} set username to ${username} in session ${sessionId}`
          );
          broadcastUserList(sessionId); // Update all users
        }
      }
    });

    // Add restaurant
    socket.on("addRestaurant", ({ sessionId, restaurant }) => {
      if (sessions[sessionId]) {
        sessions[sessionId].restaurants.push(restaurant);
        console.log(`Restaurant added to session ${sessionId}:`, restaurant);

        io.in(sessionId).emit(
          "updateRestaurants",
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
          "updateRestaurants",
          sessions[sessionId].restaurants
        );
      }
    });

    socket.on("startSelection", (sessionId) => {
      console.log(`User ${socket.id} started the game in session ${sessionId}`);
      io.in(sessionId).emit("startSelection"); // Notify all users in the session
    });

    socket.on("markReady", (sessionId) => {
      const session = sessions[sessionId];
      if (session) {
        const user = session.users.find((user) => user.id === socket.id);
        if (user) {
          user.ready = !user.ready;
          console.log(`User ${socket.id} is ready in session ${sessionId}`);
          broadcastReadiness(sessionId);
          broadcastUserList(sessionId); // Notify all users
        }
      }
    });

    socket.on("vote", ({ sessionId, restaurantId, voteChange }) => {
      io.in(sessionId).emit("voteUpdate", { restaurantId, voteChange });
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
          broadcastReadiness(sessionId);
        }
      });
    });
  });

  // Serve the Next.js application
  server.all("*", (req, res) => handle(req, res));

  // Start the server
  httpServer.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
