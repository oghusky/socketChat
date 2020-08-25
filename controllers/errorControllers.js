exports.page404Error = (req, res) => {
  res.render("error/error404", {
    path: "404",
    title: "404",
    user: req.user
  })
}
exports.page500Error = (req, res) => {
  res.render("error/error500", {
    path: "500",
    title: "500",
    user: req.user
  })
}