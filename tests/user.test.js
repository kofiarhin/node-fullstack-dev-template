const mongoose = require("mongoose");
const app = require("../server/app");
const User = require("../server/model/user");
const {
  setupDatabase,
  userOne,
  userOneToken,
  userTwo,
  userTwoId,
} = require("./fixtures/db");
const request = require("supertest");

// setup teardown
beforeEach(async () => {
  await setupDatabase();
});

afterAll(async () => {
  await mongoose.connection.close();
});

// register user
test("register user", async () => {
  await request(app).post("/users").send(userTwo).expect(201);
});

// cannot create user with invalid data
test("cannot create user with invalid data", async () => {
  const response = await request(app).post("/users").send().expect(400);

  expect(response.body).toHaveProperty("error");
});

// cannot register with invalid email address

test("cannot register with invalid email address", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      firstname: "nasir",
      lastname: "jones",
      email: "x",
      password: "password123",
    })
    .expect(400);

  expect(response.body).toHaveProperty("error");
});

// login user
test("login user", async () => {
  const response = await request(app).post("/users/login").send({
    email: userOne.email,
    password: userOne.password,
  });

  expect(response.body).toHaveProperty("user");
});

// get home page
test("get home page", async () => {
  await request(app).get("/home").set("token", userOneToken).send().expect(200);
});

// logout user
test("logout user", async () => {
  // login user first
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  const token = response.body.token;

  // logout user
  const res = await request(app)
    .get("/users/logout")
    .set("token", token)
    .send()
    .expect(302);
});

// get user profile
test("get user profile", async () => {
  const response = await request(app)
    .get("/users/me")
    .set("token", userOneToken)
    .send()
    .expect(200);
  expect(response.body).toHaveProperty("user");
});

// update user details
test("update user details", async () => {
  const response = await request(app)
    .patch("/users")
    .set("token", userOneToken)
    .send({
      firstname: "new name",
      password: "new password",
    })
    .expect(200);

  expect(response.body).toHaveProperty("user");
});

// delete user from database
test("remove user", async () => {
  await request(app)
    .delete("/users")
    .set("token", userOneToken)
    .send()
    .expect(200);

  const user = await User.findById(userOne._id);

  expect(user).toBe(null);
});
