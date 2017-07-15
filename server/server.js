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
    from: "admin",
    text: "welcome to the chat app",
    createdAt: new Date().getTime()
  });
  socket.broadcast.emit("newMessage", {
    from: "admin",
    text: "new user joined",
    createdAt: new Date().getTime()
  });

  socket.on("createMessage", (message) => {
    console.log("createMessage", message);
    io.emit("newMessage", {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on("disconnect", (socket) => {
    console.log("user was disconnected");
  });
});

server.listen(port, () => {
  console.log(`app server started on ${port}`);
});
