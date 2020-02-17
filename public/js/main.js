// make socket connection in browser
// const pathname = window.location.pathname;
// const splitPath = pathname.split("/");
// console.log(splitPath);
const socket = io(`/mainspace`),
  yamChat = document.querySelector("#yam-chat"),
  chatWindow = document.querySelector("#chat-window"),
  output = document.querySelector("#output"),
  chatInput = document.querySelector("#chat-input"),
  messageInput = document.querySelector("#message-input"),
  whosTyping = document.querySelector("#whos-typing"),
  userName = (document.querySelector("#user-name") === undefined ? "" : document.querySelector("#user-name").textContent),
  userImg = document.querySelector("#user-image").textContent,
  userProImg = document.querySelector("#user-pro-image"),
  roomName = (document.querySelector("#room-name") === undefined || document.querySelector("#room-name") === null ? "" : document.querySelector("#room-name").textContent),
  paraMsg = document.querySelectorAll(".msg"),
  bottomChat = document.querySelector("#bottom-window"),
  roomCount = document.querySelector("#room-count"),
  chatSubmit = document.querySelector("#chat-submit");


// userProImg.setAttribute("src", `./public/images/${userImg}`);
if (chatSubmit === null) {
  console.log("bloop")
} else {
  chatSubmit.addEventListener("click", emitMessage);
  messageInput.addEventListener("keydown", (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      emitMessage();
      e.preventDefault()
    }
  })
  socket.emit("joinRoom", roomName, userName);
  socket.on("newChatter", (userid, user) => {
    let newComer = document.createElement("div");
    newComer.innerHTML = `${user} just entered`;
    newComer.classList.add("text-center");
    newComer.style.opacity = "60%";
    output.append(newComer);
    roomCount.textContent = `(${userid})`;
  });
}
socket.emit("disconnect", roomName);
socket.on("left-room", data => {
  output.innerHTML += `<p>${data}</p>`
})
socket.on("shift-doc", () => {
  chatWindow.scrollTop = bottomChat.getBoundingClientRect().top;
})
socket.on("chat-message", (message, user) => {
  // output.innerHTML += `<div>
  //   <div></div>
  // </div>`
  output.innerHTML += `<p class="para-msg"><img src= '../images/${userImg}' alt=${user}/> <span class="msg"><b>${user}:</b> ${message}</span></p>`;
});

function emitMessage() {
  if (messageInput.value !== "" && messageInput.value.length <= 120) {
    const message = messageInput.value;
    socket.emit("message", roomName, message, userName);
    socket.emit("doc-change", roomName)
    messageInput.value = "";
  }
  return
}

