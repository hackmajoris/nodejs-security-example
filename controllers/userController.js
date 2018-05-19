const _ = require("lodash");

var { User } = require("../models/user");
var { authenticate } = require("../middleware/authenticate");

module.exports = app => {
  app.get("/users/me", authenticate, (req, res) => {
    res.send(req.user);
  });

  app.post("/users", (req, res) => {
    var body = _.pick(req.body, ["email", "password"]);
    var user = new User(body);

    user
      .save()
      .then(() => {
        return user.generateAuthToken();
      })
      .then(token => {
        res
          .header("x-auth", token)
          .status(201)
          .send(user);
      })
      .catch(e => {
        res.status(400).send(e);
      });
  });

  app.post("/users/login", (req, res) => {
    var body = _.pick(req.body, ["email", "password"]);

    User.findByCredentials(body.email, body.password)
      .then(user => {
        return user.generateAuthToken().then(token => {
          res.header("x-auth", token).send(user);
        });
      })
      .catch(err => {
        res.status(404).send();
      });
  });

  app.delete("/users/me/token", authenticate, (req, res) => {
    req.user
      .removeToken(req.token)
      .then(() => {
        res.status(200).send();
      })
      .catch(() => {
        res.status(400).send();
      });
  });
};
