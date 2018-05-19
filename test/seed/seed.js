const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const { User } = require("./../../models/user");

var userOneId = new ObjectId();
var userTwoId = new ObjectId();

const users = [
  {
    _id: userOneId,
    email: "user1@example.com",
    password: "user1pass",
    tokens: [
      {
        access: "auth",
        token: jwt.sign({ _id: userOneId, access: "auth" }, "abc123").toString()
      }
    ]
  },

  {
    _id: userTwoId,
    email: "user2@example.com",
    password: "user2pass"
  }
];

const populateUsers = done => {
  User.remove({})
    .then(() => {
      var userOne = new User(users[0]).save();
      var userTwo = new User(users[1]).save();

      return Promise.all([userOne, userTwo]);
    })
    .then(() => done());
};

module.exports = { users, populateUsers };
