require("dotenv").config();
// dependecies
const express = require("express"),
  app = express(),
  cors = require("cors"),
  path = require("path"),
  socket = require("socket.io"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  flash = require("connect-flash"),
  session = require('express-session'),
  cloudinary = require('cloudinary').v2,
  upload = require("express-fileupload"),
  expressSanitizer = require("express-sanitizer"),
  expressLayouts = require("express-ejs-layouts");

app.use(flash());
// passport setup
require("./config/passport")(passport);

//Connect to mongo
mongoose.connect(process.env.mongoURI || "mongodb://localhost:27017/socketUser", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
})
  .then(() => console.log("Mongo Connect"))
  .catch(err => console.log(err));

// cloudinary setup
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

app.use(upload());

// ejs setup
app.use(expressLayouts);
app.set("view engine", "ejs");

// express middleware
app.use(express.urlencoded({ extended: true, parameterLimit: 10 }));
app.use(expressSanitizer());
app.use(cors());

// express session
app.use(session({
  secret: process.env.expressSecret || "session secret",
  resave: false,
  saveUninitialized: false
}));
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
})
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
const errorRoute = require("./routes/errorRouter");
const galleryRoute = require("./routes/galleryRouter");
// use routes
app.use("/", authRoute);
app.use("/chat", chatRoute);
app.use("/user", userRoute);
app.use("/error", errorRoute);
app.use("/gallery", galleryRoute);
app.use("/*", errorRoute);
// PORT
const PORT = process.env.PORT || 3000;
// Listening
const server = app.listen(PORT, () => {
  console.log(`SERVER STARTED http://localhost:${PORT}`);
});

// socket setup
const io = socket(server);
const usersArr = [];

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
      usersArr.push(username);
      const userMap = [...new Set(usersArr)]
      // when user joins room in /mainspace
      io
        // specifies what to do when new user joins room in name space
        .of("/mainspace")
        .in(roomName)
        // emit this message
        .emit("newChatter", username, userMap);
    });
    // on message grab roomName and message
    socket.on("message", (roomName, message, username, userimg, id) => {
      // have to specify mainspace
      // have to specify room 
      // and grab message
      if (message.includes("nigger") ||
        message.includes("fag") ||
        message.includes("faggot") ||
        message.includes("nigga")) {
        io
          .of("/mainspace")
          .to(roomName)
          .emit("chat-message", "^^^ Tried to say a bad word", username, userimg, id);
      } else if (message.length > 120) {
        io
          .of("/mainspace")
          .to(roomName)
          .emit("chat-message", "^^^ Tried to send a long message", username, userimg, id);
      } else if (message.includes("http") || message.includes(".com") || message.includes("www")) {
        io
          .of("/mainspace")
          .to(roomName)
          .emit("chat-message", "^^^ Tried to post a link", username, userimg, id);
      }
      else {
        io
          .of("/mainspace")
          .to(roomName)
          .emit("chat-message", message, username, userimg, id);
      }
    });
    socket.on("doc-change", (roomName, data) => {
      io
        .of("/mainspace")
        .to(roomName)
        .emit("shift-doc", data, usersArr);
    });
    socket.on("disconnected", (roomName, username) => {
      const i = usersArr.indexOf(username);
      const leftUser = usersArr.splice(i, 1);
      socket.leave(roomName);
      io
        .of("/mainspace")
        .to(roomName)
        .emit("left-room", leftUser);
    });
    socket.on("private-message", (roomName, message, fromUser, fromUserImg, toUser) => {
      const userMap = [...new Set(usersArr)]
      if (message.includes("nigger") ||
        message.includes("fag") ||
        message.includes("faggot") ||
        message.includes("nigga")) {
        io
          .of("/mainspace")
          .to(roomName)
          .emit("direct-message", "^^^ Tried to say a bad word", fromUser, fromUserImg, toUser, userMap);
      } else if (message.length > 120) {
        io
          .of("/mainspace")
          .to(roomName)
          .emit("direct-message", "^^^ Tried to send a long message", fromUser, fromUserImg, toUser, userMap);
      } else {
        io
          .of("/mainspace")
          .to(roomName)
          .emit("direct-message", message, fromUser, fromUserImg, toUser, userMap);
      }
    });
  });
