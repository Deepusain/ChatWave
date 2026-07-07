const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const cloudRoutes = require("./routes/cloudinary");
const socket = require("socket.io");
const Multer = require("multer");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });
  
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/cloud", cloudRoutes);

app.get("/", (req, res) => {
  res.send("Chat server is running");
});

// Basic error handler so unexpected errors don't crash the server
// or leak stack traces to the client.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ status: false, msg: "Something went wrong on the server." });
});

const PORT = process.env.PORT || 5000
const server = app.listen(PORT,()=>{
    console.log(`Server running on Port ${PORT}`);
})

const io = socket(server,{
  cors :{
    origin : '*',
    credentials : true
  }
})

global.onlineUsers = new Map();

io.on("connection", (socket)=>{
  console.log('connect to socket', socket.id);
  global.chatSocket = socket;

  socket.on("add-user", (userId)=>{
    onlineUsers.set(userId, socket.id);
  })

  socket.on("send-msg", (data)=>{
    const sendUnderSocket = onlineUsers.get(data.to);
    if(sendUnderSocket){
      // send both the sender id and the text so the client can tell
      // which conversation the message belongs to
      socket.to(sendUnderSocket).emit("msg-recieve", { from: data.from, message: data.message })
    }
  })

  socket.on("send-notification", (data)=>{
    const sendUnderSocket = onlineUsers.get(data.to);
    if(sendUnderSocket){
      socket.to(sendUnderSocket).emit("notification-recieve",data.message)
    }
  })

  socket.on("disconnect", ()=>{
    // clean up stale entries so messages aren't silently sent to a dead socket
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
  })

})