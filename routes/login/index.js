const express = require("express");
const router = express.Router();
const { user } = require("../../controllers");

router.get("/", (req, res) => {
  if (req.session.authorized) {
    res.render("profile", { username: req.session.user.username });
  } else {
    res.render("login");
  }
});

router.post("/", user.login);

module.exports = router;
