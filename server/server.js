const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(path.join(__dirname, "../public")));

io.on("connection", (socket) => {
  console.log("new user connected");

  socket.emit("newMessage", {
    from: "mike@example.com 2",
    text: "hey, what is going on 2",
    createdAt: 444123
  });

  socket.on("createMessage", (newMessage) => {
    console.log("createMessage", newMessage);
  });

  socket.on("disconnect", (socket) => {
    console.log("user was disconnected");
  });
});

server.listen(port, () => {
  console.log(`app server started on ${port}`);
});
