!function(e){var t={};function n(o){if(t[o])return t[o].exports;var a=t[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(o,a,function(t){return e[t]}.bind(null,a));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){var n=window.location.pathname.split("/");if(n.includes("register")){var o=document.querySelector("input[name='password']"),a=document.querySelector("input[name='password2']");document.querySelector(".btn").addEventListener("click",(function(e){""!==o.value&&o.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,10}$/)||(e.preventDefault(),c('\n      <p class="my-0 py-0">Password must:</p>\n      <p class="my-0 py-0">* Be between 8 to 10 characters</p>\n      <p class="my-0 py-0">* Contain at least one numeric digit</p>\n      <p class="my-0 py-0">* One uppercase</p>\n      <p class="my-0 py-0">* One lowercase letter</p>\n      ')),o.value!==a.value&&(e.preventDefault(),c("Passwords must match"))}))}function c(e){var t=document.createElement("div");t.classList.add("text-danger","p-3"),t.innerHTML=e,setTimeout((function(){document.querySelector("form[class='container']").removeChild(t)}),5e3),document.querySelector("h3[class='text-center']").after(t)}if(n.includes("chat")){var r=function(){if(""!==u.value&&u.value.length<=120){var e=u.value;l.emit("message",p,e,d,m),l.emit("doc-change",p),u.value=""}},l=io("/mainspace"),i=document.querySelector("#chat-window"),s=document.querySelector("#output"),u=document.querySelector("#message-input"),d=void 0===document.querySelector("#user-name")?"":document.querySelector("#user-name").textContent,m=null===document.querySelector("#user-image")?"":document.querySelector("#user-image").textContent,p=void 0===document.querySelector("#room-name")||null===document.querySelector("#room-name")?"":document.querySelector("#room-name").textContent,v=document.querySelector("#bottom-window"),f=document.querySelector("#room-count"),g=document.querySelector("#leave-btn"),y=document.querySelector("#chat-submit");null===y?console.log("bloop"):(y.addEventListener("click",r),g.addEventListener("click",(function(){l.emit("disconnected",p,f)})),u.addEventListener("keydown",(function(e){13!==e.keyCode&&13!==e.which||(r(),e.preventDefault())})),l.on("left-room",(function(e){f.textContent="(".concat(e.length,")")})),l.emit("joinRoom",p,d,m),l.on("newChatter",(function(e,t){var n=document.createElement("div");n.innerHTML="".concat(e," just entered"),n.classList.add("text-center"),n.style.opacity="60%",s.append(n),f.textContent="(".concat(t.length,")")}))),l.on("shift-doc",(function(){i.scrollTop=v.getBoundingClientRect().top})),l.on("chat-message",(function(e,t,n){var o=""===n.split("_")[1]?"../images/avatar.png":"../images/".concat(n);if(t===d)s.innerHTML+='\n    <div class="message-div clearfix">\n    <div class="message-wrap float-right">\n          <div class="msg-inline-wrap">\n            <div class="msg-para-div">\n              <p style="color: #007bff;"><small><b>'.concat(t,"</b></small></p>\n              <p><small>").concat(e,'</small></p>\n            </div>\n            <div class="msg-img-wrap">\n              <img src="').concat(o,'" alt=').concat(t,' class="img-fluid msg-img" />\n            </div>\n          </div>\n        </div>\n        </div>\n  ');else{var a=""===n.split("_")[1]?"../images/avatar.png":"../images/".concat(n);s.innerHTML+='\n      <div class="message-div clearfix">\n        <div class="message-wrap float-left">\n          <div class="msg-inline-wrap">\n            <div class="msg-img-wrap">\n              <img src="'.concat(a,'" alt=').concat(t,' class="img-fluid msg-img" />\n            </div>\n            <div class="msg-para-div">\n              <p style="color: #007bff;"><small><b>').concat(t,"</b></small></p>\n              <p><small>").concat(e,"</small></p>\n            </div>\n          </div>\n        </div>\n      </div>\n        ")}}))}}]);