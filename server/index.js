const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected?: ${socket.id}`);

  // socket.on("send_message", (data) => {
  //   socket.broadcast.emit("receive_message", data);
  //   console.log("data is", data)
  // });

  socket.on("increase_counter1", (data) => {
    socket.broadcast.emit("increase_counter1", parseInt(data.count1));
    // console.log("data is", data.count1)
  });

  socket.on("increase_button", (data) => {
    socket.broadcast.emit("increase_button", (data.arr));
    console.log("data is", data)
  });
});

server.listen(3001, () => {
  console.log(`SERVER IS RUNNING at`);
});
