// make socket connection in browser
const pathname = window.location.pathname;
const splitPath = pathname.split("/");

// ==============================checking for register path
if (splitPath.includes("register")) {
  console.log(pathname);
  // when submit button is clicked
  const password = document.querySelector("input[name='password']");
  const passwordTwo = document.querySelector("input[name='password2']");
  document.querySelector("#register-btn").addEventListener("click", (e) => {
    // Bug found by https://github.com/diegocordoba87
    // length of password on client side JS doesn't match length when checking password on server side
    const pwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,50}$/;
    // checks if password
    if (password.value === "" || !password.value.match(pwd)) {
      e.preventDefault();
      showErrorDiv(`
      <p class="my-0 py-0">Password must:</p>
      <p class="my-0 py-0">* Be between 8 to 50 characters</p>
      <p class="my-0 py-0">* Contain at least one numeric digit</p>
      <p class="my-0 py-0">* One uppercase letter</p>
      <p class="my-0 py-0">* One lowercase letter</p>
      <p class="my-0 py-0">* One special character</p>
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
  errorDiv.classList.add("p-3");
  errorDiv.style.color = "#fefefe";
  errorDiv.innerHTML = str;
  setTimeout(() => {
    document.querySelector("form[class='container']").removeChild(errorDiv)
  }, 5000);
  document.querySelector("h3[class='text-center']").after(errorDiv)
}
//================================= checking for chat path
if (splitPath.includes("chat")) {
  let messageInput = document.querySelector("#message-input");
  const socket = io(`/mainspace`),
    chatWindow = document.querySelector("#chat-window"),
    output = document.querySelector("#output"),
    userName = (document.querySelector("#user-name") === undefined ? "" : document.querySelector("#user-name").textContent),
    userImg = document.querySelector("#user-image") === null ? "" : document.querySelector("#user-image").textContent,
    roomName = (document.querySelector("#room-name") === undefined || document.querySelector("#room-name") === null ? "" : document.querySelector("#room-name").textContent),
    bottomChat = document.querySelector("#bottom-window"),
    roomCount = document.querySelector("#room-count"),
    leaveBtn = document.querySelector("#leave-btn"),
    currentUser = document.querySelector("#current-user"),
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
  socket.on("chat-message", (message, user, img, id) => {
    const newimg = img === "" ? "../images/avatar.png" : `${img}`;
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
              <a href="/user/${id}">
              <img src="${newimg}" alt=${user} class="img-fluid msg-img" />
              </a>
            </div>
          </div>
        </div>
      </div>
      `;
    } else {
      const newimg = img === "" ? "../images/avatar.png" : `${img}`;
      output.innerHTML += `
        <div class="message-div clearfix">
          <div class="message-wrap float-left">
            <div class="msg-inline-wrap">
              <div class="msg-img-wrap">
                <a href="/user/${id}">
                <img src="${newimg}" alt=${user} class="img-fluid msg-img" />
                </a>
              </div>
              <div class="msg-para-div them" data-who="them" data-user=${user}>
                <p style="color: #007bff;">
                  <small><b>${user}</b></small>
                </p>
                <p>
                  <small>${message}</small>
                </p>
              </div>
            </div>
          </div>
        </div>
        `;
    }
  });
  socket.on("direct-message", (message, fromUser, fromUserImg, toUser, userMap) => {
    if (userName === fromUser || userName === toUser && message.length > 0) {
      const newimg = fromUserImg === "" ? "../images/avatar.png" : `${fromUserImg}`;
      if (fromUser === userName) {
        output.innerHTML += `
      <div class="message-div clearfix">
      <div class="message-wrap float-right">
          <div class="msg-inline-wrap">
          <div class="msg-para-div" style="background-color: #007bff;">
          <p style="color: #eeeeee;"><small><b>${fromUser} to ${toUser}</b></small></p>
              <p style="color: #2e2e2e;"><small>${message}</small></p>
              </div>
              <div class="msg-img-wrap">
        <img src="${newimg}" alt=${fromUser} class="img-fluid msg-img" />
              </div>
              </div>
            </div>
            </div>
            `;
      } else {
        const newimg = fromUserImg === "" ? "../images/avatar.png" : `${fromUserImg}`;
        output.innerHTML += `
            <div class="message-div clearfix">
        <div class="message-wrap float-left">
          <div class="msg-inline-wrap">
            <div class="msg-img-wrap">
        <img src="${newimg}" alt=${fromUser} class="img-fluid msg-img" />
            </div>
            <div class="msg-para-div them" style="background-color: #007bff;" data-user=${toUser} data-who="them-dm">
            <p style="color: #eeeeee;"><small><b>${fromUser} to ${toUser}</b></small></p>
            <p style="color: #2e2e2e;"><small>${message}</small></p>
            </div>
            </div>
            </div>
            </div>
            `;
      }
    }
  })
  function leaveRoom() {
    socket.emit("disconnected", roomName, roomCount);
  }
  function emitMessage() {
    let messageInput = document.querySelector("#message-input");
    if (messageInput.value !== "" &&
      messageInput.value.length <= 120) {
      const message = messageInput.value;
      if (message.charAt(0) === "@" && message.charAt(1) === "d" && message.charAt(2) === "m") {
        const fromUser = userName;
        const fromUserImg = userImg;
        const toUser = message.split(" ")[1];
        const newMessage = message.split(`${toUser}`)[1]
        console.log("userimg", userImg);
        socket.emit("private-message", roomName, newMessage, fromUser, fromUserImg, toUser.toUpperCase());
      } else {
        socket.emit("message", roomName, message, userName, userImg, currentUser.innerText);
      }
      socket.emit("doc-change", roomName)
      messageInput.value = "";
    }
    return
  }
  $("#output").on("click", "div.them", (e) => {
    if (e.target.getAttribute("data-user")) {
      messageInput.value = `@dm ${e.target.getAttribute("data-user").toLowerCase()}`;
    } else if (!e.target.getAttribute("data-user")) {
      const userinfo = e.target.parentElement.getAttribute("data-user").toLowerCase();
      messageInput.value = `@dm ${userinfo}`;
    }
  })
}