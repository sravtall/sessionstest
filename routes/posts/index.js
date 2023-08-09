const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.cookies);
  res.send("all posts");
});

router.get("/popular", (req, res) => {
  console.log(req.cookies);
  res.send("Code profile");
});

module.exports = router;
