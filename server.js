require("dotenv").config();
// dependecies
const express = require("express"),
  path = require("path"),
  cors = require("cors"),
  expressSanitizer = require("express-sanitizer"),
  app = express(),
  socket = require("socket.io"),
  expressLayouts = require("express-ejs-layouts"),
  upload = require("express-fileupload"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  session = require('express-session');

// passport setup
require("./config/passport")(passport);

//Connect to mongo
// mongoose.connect(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
mongoose.connect("mongodb://localhost:27017/socketChat", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log("Mongo Connect"))
  .catch(err => console.log(err));

// ejs setup
app.use(expressLayouts);
app.set("view engine", "ejs");

// express fileupload
app.use(upload());

// express middleware
app.use(express.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(cors());

// express session
app.use(session({
  secret: process.env.expressSecret,
  resave: false,
  saveUninitialized: false
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// get body requests
app.use(express.json());

// Set static path
app.use(express.static(path.join(__dirname, 'public')));

// require routes
const authRoute = require("./routes/authRouter");
const chatRoute = require("./routes/chatRouter");
const userRoute = require("./routes/userRouter");
const messageRoute = require("./routes/messageRouter");

// use routes
app.use("/", authRoute);
app.use("/chat", chatRoute);
app.use("/user", userRoute);
app.use("/messages", messageRoute);

// PORT
const PORT = process.env.PORT || 3000;
// Listening
const server = app.listen(PORT, () => {
  console.log("Server started on port: " + PORT);
});

// socket setup
const io = socket(server);
let userId = [];

io
  // specifies main namespace
  .of("/mainspace")
  // what to do on connection
  .on("connection", (socket, path) => {
    // what to do when user joins room
    socket.on("joinRoom", (roomName, username, userimg) => {
      // join room socket action
      socket.join(roomName);
      // const socketid = socket.id;
      userId.push(username);
      const userMap = [...new Set(userId)]
      // when user joins room in /mainspace
      io
        // specifies what to do when new user joins room in name space
        .of("/mainspace")
        .in(roomName)
        // emit this message
        .emit("newChatter", username, userMap);
    });
    // on message grab roomName and message
    socket.on("message", (roomName, message, username, userimg) => {
      // have to specify mainspace
      // have to specify room 
      // and grab message
      io
        .of("/mainspace")
        .to(roomName)
        .emit("chat-message", message, username, userimg, userId);
    });
    socket.on("doc-change", (roomName, data) => {
      io
        .of("/mainspace")
        .to(roomName)
        .emit("shift-doc", data, userId);
    });
    socket.on("disconnected", (roomName, username) => {
      // const userMap = [...new Set(userId)]
      const i = userId.indexOf(username);
      userId.splice(i, 1);
      socket.leave(roomName);
      io
        .of("/mainspace")
        .to(roomName)
        .emit("left-room", userId);
    });
    socket.on("private-message", (username, message) => {
      io
        .of("/mainspace")
        .to(username)
        .emit("direct-message", message, userId);
    });
  });
