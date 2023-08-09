const express = require("express");
const app = express();
const path = require("path");
const db = require("./models");
const session = require("express-session");

const users = require("./routes/users");
const posts = require("./routes/posts");
const login = require("./routes/login");
const logout = require("./routes/logout");

app.use("/static", express.static(path.join(__dirname, "public")));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(
  session({
    secret: "thisisasecret",
    cookie: {
      sameSite: "strict",
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", users);
app.use("/posts", posts);
app.use("/login", login);
app.use("/logout", logout);

(async () => {
  await db.sequelize.sync();
})();

app.use((req, res, next) => {
  console.log(new Date().toLocaleDateString());
  next();
});

app.get("/", [
  (req, res, next) => {
    // res.send("<h1>Welcome to Homepage!</h1>");
    console.log("hi");
    next();
  },
  (req, res, next) => {
    res.send("Middleware");
  },
]);

app.all("/my-route", (req, res) => {
  res.send("accessed by all");
});

app.listen(1234);
