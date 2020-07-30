// make socket connection in browser
const pathname = window.location.pathname;
const splitPath = pathname.split("/");

// checking for register path
if (splitPath.includes("register")) {
  // when submit button is clicked
  const password = document.querySelector("input[name='password']");
  const passwordTwo = document.querySelector("input[name='password2']");
  document.querySelector(".btn").addEventListener("click", (e) => {
    const pwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,10}$/;
    // checks if password
    if (password.value === "" || !password.value.match(pwd)) {
      e.preventDefault();
      showErrorDiv(`
      <p class="my-0 py-0">Password must:</p>
      <p class="my-0 py-0">* Be between 8 to 10 characters</p>
      <p class="my-0 py-0">* Contain at least one numeric digit</p>
      <p class="my-0 py-0">* One uppercase</p>
      <p class="my-0 py-0">* One lowercase letter</p>
      `)
    };
    if (password.value !== passwordTwo.value) {
      e.preventDefault();
      showErrorDiv(`Passwords must match`);
    }
  });
}
// show error div function 
function showErrorDiv(str) {
  // div to show errors
  const errorDiv = document.createElement("div");
  errorDiv.classList.add("text-danger", "p-3");
  errorDiv.innerHTML = str;
  setTimeout(() => {
    document.querySelector("form[class='container']").removeChild(errorDiv)
  }, 5000);
  document.querySelector("h3[class='text-center']").after(errorDiv)
}
// checking for chat path
if (splitPath.includes("chat")) {
  const socket = io(`/mainspace`),
    chatWindow = document.querySelector("#chat-window"),
    output = document.querySelector("#output"),
    messageInput = document.querySelector("#message-input"),
    userName = (document.querySelector("#user-name") === undefined ? "" : document.querySelector("#user-name").textContent),
    userImg = document.querySelector("#user-image") === null ? "" : document.querySelector("#user-image").textContent,
    roomName = (document.querySelector("#room-name") === undefined || document.querySelector("#room-name") === null ? "" : document.querySelector("#room-name").textContent),
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
    socket.emit("joinRoom", roomName, userName, userImg);
    socket.on("newChatter", (username, usersarr) => {
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
    const newimg = img.split("_")[1] === "" ? "../dist/images/avatar.png" : `../dist/images/${img}`;
    if (user === userName) {
      output.innerHTML += `
    <div class="message-div clearfix">
    <div class="message-wrap float-right">
          <div class="msg-inline-wrap">
            <div class="msg-para-div">
              <p style="color: #007bff;"><small><b>${user}</b></small></p>
              <p><small>${message}</small></p>
            </div>
            <div class="msg-img-wrap">
              <img src="${newimg}" alt=${user} class="img-fluid msg-img" />
            </div>
          </div>
        </div>
        </div>
  `;
    } else {
      const newimg = img.split("_")[1] === "" ? "../dist/images/avatar.png" : `../dist/images/${img}`;
      output.innerHTML += `
      <div class="message-div clearfix">
        <div class="message-wrap float-left">
          <div class="msg-inline-wrap">
            <div class="msg-img-wrap">
              <img src="${newimg}" alt=${user} class="img-fluid msg-img" />
            </div>
            <div class="msg-para-div">
              <p style="color: #007bff;"><small><b>${user}</b></small></p>
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

