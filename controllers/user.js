const bcrypt = require("bcrypt");

const {
  models: { User },
} = require("../models");

module.exports = {
  create: async (req, res) => {
    if (req.body.username && req.body.password) {
      const { username, password } = req.body;

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async function (err, hash) {
          let user = await User.findOne({
            where: { username, password: hash },
          });

          if (user) {
            res.redirect("login");
          } else {
            await User.create({
              username,
              password: hash,
            });

            res.cookie("username", username, { secure: true });
            res.render("profile", { username });
          }
        });
      });
    } else {
      res.send("not added to database");
    }
  },

  login: async (req, res) => {
    if (req.body.username && req.body.password) {
      const { username, password } = req.body;

      await User.findOne({ where: { username } }).then((user) => {
        if (user) {
          bcrypt.compare(password, user.password, (err, data) => {
            if (data) {
              req.session.user = user;
              req.session.authorized = true;
              res.render("profile", { username });
            } else {
              res.render("login");
            }
          });
        } else {
          res.render("login");
        }
      });
    }
  },
};
