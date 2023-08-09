const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send(`all users ${req.query.theme}`);
});

router.get("/:username", (req, res) => {
  res.render("profile", { username: req.params.username });
});

module.exports = router;
