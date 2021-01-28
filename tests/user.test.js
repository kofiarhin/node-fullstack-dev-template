const mongoose = require("mongoose")
const app = require("../server/app")
const User = require("../server/model/user")
const { setupDatabase, userOne, userOneToken } = require("./fixtures/db")
const request = require("supertest")

// setup teardown
beforeEach( async() => {

    await setupDatabase()
})

afterAll( async() => {
    await mongoose.connection.close();
})



test("login user",  async() => {

               const response =  await request(app).post("/users/login").send({
                    email: userOne.email,
                    password: userOne.password
                });

                expect(response.body).toHaveProperty("user")

})


test("get user", async() => {

    await request(app).get("/home").set("token", userOneToken).send()
})