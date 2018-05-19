const expect = require("expect");
const request = require("supertest");
const { app, userController } = require("./../app");
const { users, populateUsers } = require("./seed/seed");
const { User } = require("./../models/user");

beforeAll(populateUsers);

describe("Get /users/me", () => {
  test("Should return authenticated user", done => {
    request(app)
      .get("/users/me")
      .set("x-auth", users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  test("Should return 401 if not authenticted", done => {
    request(app)
      .get("/users/me")
      .expect(401)
      .end(done);
  });
});

describe("POST /users/login", () => {
  test("Should login first user with success", done => {
    request(app)
      .post("/users/login")
      .send({ email: users[0].email, password: users[0].password })
      .expect(200)
      .expect(res => {
        expect(res.headers["x-auth"]).toBeDefined();
      })
      .end(done);
  });
});

test("Should fail login user because of wrong password", done => {
  request(app)
    .post("/users/login")
    .send({ email: users[0].email, password: users[0].password + "2" })
    .expect(404)
    .end(done);
});

test("Should login second user with success", done => {
  request(app)
    .post("/users/login")
    .send({ email: users[1].email, password: users[1].password })
    .expect(200)
    .expect(res => {
      expect(res.headers["x-auth"]).toBeDefined();
    })
    .end(done);
});

describe("POST /users", () => {
  test("Should create a user", done => {
    var email = "user3@example.com";
    var pass = "user3Pass";

    request(app)
      .post("/users")
      .send({ email, pass })
      .expect(201)
      .expect(res => {
        expect(res.body._id).toBeDefined();
        expect(res.body.email).toBe(email);
        expect(res.headers["x-auth"]).toBeDefined();
      })
      .end(err => {
        if (err) {
          done(err);
        }

        User.findOne({ email }).then(user => {
          expect(user).toBeDefined();
          done();
        });
      });
  });

  test("Should not create an user if email exists", done => {
    request(app)
      .post("/users")
      .send({ email: users[0].email, password: users[0].password })
      .expect(400)
      .end(done);
  });

  test("Should return an error if email or password checks fail", done => {
    request(app)
      .post("/users")
      .send({ email: "dfd", password: "sim" })
      .expect(400)
      .end(done);
  });
});

describe("DELETE /users/token/me", () => {
  test("Should delete token user", done => {
    request(app)
      .delete("/users/me/token")
      .set("x-auth", users[0].tokens[0].token)
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        return done();
      });
  });
});
