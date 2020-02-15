require("dotenv").config();
// dependecies
const express = require("express"),
  path = require("path"),
  cors = require("cors"),
  expressSanitizer = require("express-sanitizer"),
  app = express(),
  socket = require("socket.io"),
  expressLayouts = require("express-ejs-layouts"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  session = require('express-session');

// passport setup
require("./config/passport")(passport);

//Connect to mongo
mongoose.connect(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log("Mongo Connect"))
  .catch(err => console.log(err));

// ejs setup
app.use(expressLayouts);
app.set("view engine", "ejs");

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

// Set static path
app.use(express.static(path.join(__dirname, 'public')));

// require routes
const authRoute = require("./routes/authRouter");
const chatRoute = require("./routes/chatRouter");
const userRoute = require("./routes/userRouter");

// use routes
app.use("/", authRoute);
app.use("/chat", chatRoute);
app.use("/user", userRoute);
// Listening
const server = app.listen(3000, () => {
  console.log("Server started on 3000");
});

// socket setup
const io = socket(server);
let userId = [];
let numUsers = 0;

io
  // specifies main namespace
  .of("/mainspace")
  // what to do on connection
  .on("connection", (socket) => {
    // console.log("Socket handshake: ",socket.handshake);
    // console.log("socket listener count: ", socket.listenerCount);
    // console.log("socket client: ", socket.client);
    // console.log("socket nsp(name space): ", socket.nsp);
    // console.log("socket rooms:", socket.rooms);
    // console.log("socket json: ", socket.json);
    let addUser = false;
    // what to do when user joins room
    socket.on("joinRoom", (roomName, username, userage, userimg, usergender) => {
      // join room socket action
      // room name is grabbed in browser js
      // console.log("socket rooms:", socket.rooms);
      // console.log("socket nsp(name space): ", socket.nsp);
      // console.log("socket request: ", socket.request);
      socket.join(roomName);
      userId.push(socket.id);
      // when user joins room in /mainspace
      io
        // specifies what to do when new user joins room in name space
        .of("/mainspace")
        .in(roomName)
        // emit this message
        .emit("newChatter", userId.length, username, userage, userimg, usergender);
    });
    // on message grab roomName and message
    socket.on("message", (roomName, message, username) => {
      // have to specify mainspace
      // have to specify room 
      // and grab message
      io
        .of("/mainspace")
        .to(roomName)
        .emit("chat-message", message, username);
      // console.log(socket.handshake);
    });
    socket.on("disconnect", (roomName) => {
      const i = userId.indexOf(socket);
      console.log("got disconnected")
      socket.leave(roomName);
      userId.splice(i, 1);
      io
        // .of("/mainframe")
        .to(roomName)
        .emit("left-room", "chicken");
    });
    socket.on("doc-change", (roomName, data) => {
      io
        // .of("/mainspace")
        .to(roomName)
        .emit("shift-doc", data);
    })
  });
