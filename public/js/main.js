// make socket connection in browser
// const pathname = window.location.pathname;
// const splitPath = pathname.split("/");
// console.log(splitPath);
const socket = io.connect(`/mainspace`),
  yamChat = document.querySelector("#yam-chat"),
  chatWindow = document.querySelector("#chat-window"),
  output = document.querySelector("#output"),
  chatInput = document.querySelector("#chat-input"),
  messageInput = document.querySelector("#message-input"),
  whosTyping = document.querySelector("#whos-typing"),
  userName = (document.querySelector("#user-name") === undefined ? "" : document.querySelector("#user-name")),
  roomName = (document.querySelector("#room-name") === undefined ? "" : document.querySelector("#room-name")),
  paraMsg = document.querySelectorAll(".msg"),
  bottomChat = document.querySelector("#bottom-window"),
  roomCount = document.querySelector("#room-count"),
  chatSubmit = document.querySelector("#chat-submit");

if (chatSubmit === null) {
  console.log("bloop")
} else {
  chatSubmit.addEventListener("click", () => {
    if (messageInput.value !== "" && messageInput.value.length <= 120) {
      const message = messageInput.value;
      socket.emit("message", roomName, message, userName.textContent);
      socket.emit("doc-change", roomName)
      messageInput.value = "";
      console.log(message.length);
    }
    return
  });

  socket.emit("joinRoom", roomName, userName.textContent);
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
  output.innerHTML += `<p class="para-msg"><span class="msg"><b>${user}:</b> ${message}</span></p>`
});
socket.on("err", (err) => { console.log(err) })
socket.on("success", (res) => { console.log(res) })



