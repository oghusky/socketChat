function checkCookies() {
  const setYamCookie = document.querySelector("#close");
  const cookieBanner = document.querySelector(".cookie-banner");
  cookieBanner.style.background = "#212121";
  if (localStorage.getItem("Blurb_be") === "showCookies") {
    cookieBanner.style.display = "none";
  } else {
    cookieBanner.style.display = "block";
  }
  setYamCookie.addEventListener("click", (e) => {
    localStorage.setItem("Blurb_be", "showCookies");
    cookieBanner.style.display = "none";
  });
}
checkCookies();