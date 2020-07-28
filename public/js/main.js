// make socket connection in browser
const pathname = window.location.pathname;
const splitPath = pathname.split("/");
console.log(splitPath);
if (splitPath.includes("chat")) {
  const socket = io(`/mainspace`),
    yamChat = document.querySelector("#yam-chat"),
    chatWindow = document.querySelector("#chat-window"),
    output = document.querySelector("#output"),
    chatInput = document.querySelector("#chat-input"),
    messageInput = document.querySelector("#message-input"),
    userName = (document.querySelector("#user-name") === undefined ? "" : document.querySelector("#user-name").textContent),
    userImg = document.querySelector("#user-image") === null ? "" : document.querySelector("#user-image").textContent,
    userProImg = document.querySelector("#user-pro-image"),
    roomName = (document.querySelector("#room-name") === undefined || document.querySelector("#room-name") === null ? "" : document.querySelector("#room-name").textContent),
    paraMsg = document.querySelectorAll(".msg"),
    bottomChat = document.querySelector("#bottom-window"),
    roomCount = document.querySelector("#room-count"),
    leaveBtn = document.querySelector("#leave-btn"),
    chatSubmit = document.querySelector("#chat-submit");

  if (chatSubmit === null) {
    console.log("bloop")
  } else {
    chatSubmit.addEventListener("click", emitMessage);
    leaveBtn.addEventListener("click", leaveRoom);
    messageInput.addEventListener("keydown", (e) => {
      if (e.keyCode === 13 || e.which === 13) {
        emitMessage();
        e.preventDefault()
      }
    })
    socket.on("left-room", (usercnt) => {
      roomCount.textContent = `(${usercnt.length})`;
    });
    socket.emit("joinRoom", roomName, userName, "", userImg, "");
    socket.on("newChatter", (userid, username, userage, userimg, usergender, usersarr) => {
      let newComer = document.createElement("div");
      newComer.innerHTML = `${username} just entered`;
      newComer.classList.add("text-center");
      newComer.style.opacity = "60%";
      output.append(newComer);
      roomCount.textContent = `(${usersarr.length})`;
    });
  }
  socket.on("shift-doc", () => {
    chatWindow.scrollTop = bottomChat.getBoundingClientRect().top;
  });
  socket.on("chat-message", (message, user, img) => {
    if (user === userName) {
      output.innerHTML += `
    <div class="message-div clearfix">
    <div class="message-wrap float-right">
          <div class="msg-inline-wrap">
          <div class="msg-para-div">
          <p><small><b>${user}</b></small></p>
          <p><small>${message}</small></p>
          </div>
          <div class="msg-img-wrap">
              <img src='../images/${img}' alt=${user} class="img-fluid msg-img" />
              </div>
              </div>
        </div>
        </div>
  `;
    } else {
      output.innerHTML += `
    <div class="message-div clearfix">
    <div class="message-wrap float-left">
    <div class="msg-inline-wrap">
          <div class="msg-img-wrap">
          <img src='../images/${img}' alt=${user} class="img-fluid msg-img" />
          </div>
          <div class="msg-para-div">
          <p><small><b>${user}</b></small></p>
          <p><small>${message}</small></p>
          </div>
              </div>
              </div>
        </div>
        `;
    }
  });
  function leaveRoom() {
    socket.emit("disconnected", roomName, roomCount);
  }
  function emitMessage() {
    if (messageInput.value !== "" && messageInput.value.length <= 120) {
      const message = messageInput.value;
      socket.emit("message", roomName, message, userName, userImg);
      socket.emit("doc-change", roomName)
      messageInput.value = "";
    }
    return
  }
}

