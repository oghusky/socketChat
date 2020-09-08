/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/js/main.js":
/*!***************************!*\
  !*** ./public/js/main.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// register service worker\n(function () {\n  if (\"serviceWorker\" in navigator) {\n    navigator.serviceWorker.register('../service-worker.js', {\n      scope: '/'\n    }).then(function () {\n      return console.log(\"Service Worker registered successfully.\");\n    })[\"catch\"](function (error) {\n      return console.log(\"Service Worker registration failed:\");\n    });\n  }\n})(); // make socket connection in browser\n\n\nvar pathname = window.location.pathname;\nvar splitPath = pathname.split(\"/\");\n\nif (window.location.pathname === \"/\" && localStorage.getItem(\"Blurb_be\") === \"showCookies\") {\n  window.location.pathname = \"/login\";\n} // ==============================checking for register path\n\n\nif (splitPath.includes(\"register\")) {\n  // when submit button is clicked\n  var password = document.querySelector(\"input[name='password']\");\n  var passwordTwo = document.querySelector(\"input[name='password2']\");\n  document.querySelector(\"#register-btn\").addEventListener(\"click\", function (e) {\n    // Bug found by https://github.com/diegocordoba87\n    // length of password on client side JS doesn't match length when checking password on server side\n    var pwd = /^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\\s).{8,50}$/; // checks if password\n\n    if (password.value === \"\" || !password.value.match(pwd)) {\n      e.preventDefault();\n      showErrorDiv(\"\\n      <p class=\\\"my-0 py-0\\\">Password must:</p>\\n      <p class=\\\"my-0 py-0\\\">* Be between 8 to 50 characters</p>\\n      <p class=\\\"my-0 py-0\\\">* Contain at least one numeric digit</p>\\n      <p class=\\\"my-0 py-0\\\">* One uppercase letter</p>\\n      <p class=\\\"my-0 py-0\\\">* One lowercase letter</p>\\n      <p class=\\\"my-0 py-0\\\">* One special character</p>\\n      \");\n    }\n\n    ;\n\n    if (password.value !== passwordTwo.value) {\n      e.preventDefault();\n      showErrorDiv(\"Passwords must match\");\n    }\n  });\n} // show error div function \n\n\nfunction showErrorDiv(str) {\n  // div to show errors\n  var errorDiv = document.createElement(\"div\");\n  errorDiv.classList.add(\"p-3\");\n  errorDiv.style.color = \"#fefefe\";\n  errorDiv.innerHTML = str;\n  setTimeout(function () {\n    document.querySelector(\"form[class='container']\").removeChild(errorDiv);\n  }, 5000);\n  document.querySelector(\"h3[class='text-center']\").after(errorDiv);\n} //================================= checking for chat path\n\n\nif (splitPath.includes(\"chat\")) {\n  var leaveRoom = function leaveRoom() {\n    socket.emit(\"disconnected\", roomName, roomCount);\n  };\n\n  var emitMessage = function emitMessage() {\n    var messageInput = document.querySelector(\"#message-input\");\n\n    if (messageInput.value !== \"\" && messageInput.value.length <= 120) {\n      var message = messageInput.value;\n\n      if (message.charAt(0) === \"@\" && message.charAt(1) === \"d\" && message.charAt(2) === \"m\") {\n        var fromUser = userName;\n        var fromUserImg = userImg;\n        var toUser = message.split(\" \")[1];\n        var newMessage = message.split(\"\".concat(toUser))[1];\n        socket.emit(\"private-message\", roomName, newMessage, fromUser, fromUserImg, toUser.toUpperCase());\n      } else {\n        socket.emit(\"message\", roomName, message, userName, userImg, currentUser.innerText);\n      }\n\n      socket.emit(\"doc-change\", roomName);\n      messageInput.value = \"\";\n    }\n\n    return;\n  };\n\n  var messageInput = document.querySelector(\"#message-input\");\n  var socket = io(\"/mainspace\"),\n      chatWindow = document.querySelector(\"#chat-window\"),\n      output = document.querySelector(\"#output\"),\n      userName = document.querySelector(\"#user-name\") === undefined ? \"\" : document.querySelector(\"#user-name\").textContent,\n      userImg = document.querySelector(\"#user-image\") === null ? \"\" : document.querySelector(\"#user-image\").textContent,\n      roomName = document.querySelector(\"#room-name\") === undefined || document.querySelector(\"#room-name\") === null ? \"\" : document.querySelector(\"#room-name\").textContent,\n      bottomChat = document.querySelector(\"#bottom-window\"),\n      roomCount = document.querySelector(\"#room-count\"),\n      leaveBtn = document.querySelector(\"#leave-btn\"),\n      currentUser = document.querySelector(\"#current-user\"),\n      chatSubmit = document.querySelector(\"#chat-submit\");\n\n  if (chatSubmit === null) {\n    console.log(\"bloop\");\n  } else {\n    chatSubmit.addEventListener(\"click\", emitMessage);\n    leaveBtn.addEventListener(\"click\", leaveRoom);\n    messageInput.addEventListener(\"keydown\", function (e) {\n      if (e.keyCode === 13 || e.which === 13) {\n        emitMessage();\n        e.preventDefault();\n      }\n    });\n    socket.on(\"left-room\", function (usercnt) {\n      roomCount.textContent = \"(\".concat(usercnt.length, \")\");\n    });\n    socket.emit(\"joinRoom\", roomName, userName, userImg);\n    socket.on(\"newChatter\", function (username, usersarr) {\n      var newComer = document.createElement(\"div\");\n      newComer.innerHTML = \"\".concat(username, \" just entered\");\n      newComer.classList.add(\"text-center\");\n      newComer.style.opacity = \"60%\";\n      output.append(newComer);\n      roomCount.textContent = \"(\".concat(usersarr.length, \")\");\n    });\n  }\n\n  socket.on(\"shift-doc\", function () {\n    chatWindow.scrollTop = bottomChat.getBoundingClientRect().top;\n  });\n  socket.on(\"chat-message\", function (message, user, img, id) {\n    var newimg = img === \"\" ? \"../images/avatar.png\" : \"\".concat(img);\n\n    if (user === userName) {\n      output.innerHTML += \"\\n      <div class=\\\"message-div clearfix\\\">\\n        <div class=\\\"message-wrap float-right\\\">\\n          <div class=\\\"msg-inline-wrap\\\">\\n            <div class=\\\"msg-para-div\\\">\\n              <p style=\\\"color: #007bff;\\\"><small><b>\".concat(user, \"</b></small></p>\\n              <p><small>\").concat(message, \"</small></p>\\n            </div>\\n            <div class=\\\"msg-img-wrap\\\">\\n              <a href=\\\"/user/\").concat(id, \"\\\">\\n              <img src=\\\"\").concat(newimg, \"\\\" alt=\").concat(user, \" class=\\\"img-fluid msg-img\\\" />\\n              </a>\\n            </div>\\n          </div>\\n        </div>\\n      </div>\\n      \");\n    } else {\n      var _newimg = img === \"\" ? \"../images/avatar.png\" : \"\".concat(img);\n\n      output.innerHTML += \"\\n        <div class=\\\"message-div clearfix\\\">\\n          <div class=\\\"message-wrap float-left\\\">\\n            <div class=\\\"msg-inline-wrap\\\">\\n              <div class=\\\"msg-img-wrap\\\">\\n                <a href=\\\"/user/\".concat(id, \"\\\">\\n                <img src=\\\"\").concat(_newimg, \"\\\" alt=\").concat(user, \" class=\\\"img-fluid msg-img\\\" />\\n                </a>\\n              </div>\\n              <div class=\\\"msg-para-div them\\\" data-who=\\\"them\\\" data-user=\").concat(user, \">\\n                <p style=\\\"color: #007bff;\\\">\\n                  <small><b>\").concat(user, \"</b></small>\\n                </p>\\n                <p>\\n                  <small>\").concat(message, \"</small>\\n                </p>\\n              </div>\\n            </div>\\n          </div>\\n        </div>\\n        \");\n    }\n  });\n  socket.on(\"direct-message\", function (message, fromUser, fromUserImg, toUser, userMap) {\n    if (userName === fromUser || userName === toUser && message.length > 0) {\n      var newimg = fromUserImg === \"\" ? \"../images/avatar.png\" : \"\".concat(fromUserImg);\n\n      if (fromUser === userName) {\n        output.innerHTML += \"\\n      <div class=\\\"message-div clearfix\\\">\\n      <div class=\\\"message-wrap float-right\\\">\\n          <div class=\\\"msg-inline-wrap\\\">\\n          <div class=\\\"msg-para-div\\\" style=\\\"background-color: #007bff;\\\">\\n          <p style=\\\"color: #eeeeee;\\\"><small><b>\".concat(fromUser, \" to \").concat(toUser, \"</b></small></p>\\n              <p style=\\\"color: #2e2e2e;\\\"><small>\").concat(message, \"</small></p>\\n              </div>\\n              <div class=\\\"msg-img-wrap\\\">\\n        <img src=\\\"\").concat(newimg, \"\\\" alt=\").concat(fromUser, \" class=\\\"img-fluid msg-img\\\" />\\n              </div>\\n              </div>\\n            </div>\\n            </div>\\n            \");\n      } else {\n        var _newimg2 = fromUserImg === \"\" ? \"../images/avatar.png\" : \"\".concat(fromUserImg);\n\n        output.innerHTML += \"\\n            <div class=\\\"message-div clearfix\\\">\\n        <div class=\\\"message-wrap float-left\\\">\\n          <div class=\\\"msg-inline-wrap\\\">\\n            <div class=\\\"msg-img-wrap\\\">\\n        <img src=\\\"\".concat(_newimg2, \"\\\" alt=\").concat(fromUser, \" class=\\\"img-fluid msg-img\\\" />\\n            </div>\\n            <div class=\\\"msg-para-div them\\\" style=\\\"background-color: #007bff;\\\" data-user=\").concat(toUser, \" data-who=\\\"them-dm\\\">\\n            <p style=\\\"color: #eeeeee;\\\"><small><b>\").concat(fromUser, \" to \").concat(toUser, \"</b></small></p>\\n            <p style=\\\"color: #2e2e2e;\\\"><small>\").concat(message, \"</small></p>\\n            </div>\\n            </div>\\n            </div>\\n            </div>\\n            \");\n      }\n    }\n  });\n  $(\"#output\").on(\"click\", \"div.them\", function (e) {\n    if (e.target.getAttribute(\"data-user\")) {\n      messageInput.value = \"@dm \".concat(e.target.getAttribute(\"data-user\").toLowerCase(), \" \");\n    } else if (!e.target.getAttribute(\"data-user\")) {\n      var userinfo = e.target.parentElement.getAttribute(\"data-user\").toLowerCase();\n      messageInput.value = \"@dm \".concat(userinfo, \" \");\n    }\n  });\n}\n\n//# sourceURL=webpack:///./public/js/main.js?");

/***/ })

/******/ });