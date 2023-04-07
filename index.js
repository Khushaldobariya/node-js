const express = require("express");
// const http = require("http");

const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server, { transports: ["polling"] });

const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));

// app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("join", (username) => {
    console.log(username + " has joined the chat");
    socket.username = username;
    io.emit("user joined", username);
  });

  socket.on("chat message", (msg) => {
    console.log(socket.username + ": " + msg);
    io.emit("chat message", { username: socket.username, message: msg });
  });

  socket.on("message", (data) => {
    console.log(`Message received: ${data}`);
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// banner route
const bannerRoute = require("./server/banner/banner.route");
app.use("/banner", bannerRoute);

// gift Route
const giftRoute = require("./server/gift/gift.route");
app.use("/gift", giftRoute);

// user route
const userRoute = require("./server/user/user.route");
app.use("/user", userRoute);

const hostRoute = require("./server/host/host.route");

app.use("/host", hostRoute);

// plan route
const planRoute = require("./server/Plan/plan.route");
app.use("/plan", planRoute);

// duration
const durationRoute = require("./server/duration/duration.route");
app.use("/duration", durationRoute);

// storage path
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.use("/storage", express.static(path.join(__dirname, "storage")));

const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://khushal:Khushal@cluster0.pvevewt.mongodb.net/khushal",
  console.log("connect"),
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
server.listen(5000, () => {
  console.log("hello world!");
  console.log("Socket.IO server listening on port 5000");
});
