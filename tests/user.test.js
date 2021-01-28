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



// get home page
test("get home page", async() => {

    await request(app).get("/home")
    .set("token", userOneToken)
    .send().expect(200)
})


//logout user
test("logout user", async() => {

    await request(app).get("/users/logout")
    .set("token", userOneToken)
    .send().expect(302) 
})

