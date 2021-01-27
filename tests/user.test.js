const mongoose = require("mongoose");
const app = require("../server/app")
const { setupDatabase, 
    userTwo,
    userOne,
userOneToken }  = require("./fixtures/db")
const request = require("supertest")
const User = require("../server/model/user")

// setup and teardown

beforeEach ( async() => {

    await setupDatabase()
});


afterAll( async() => {
    await mongoose.connection.close();
})


test("get users  from database", async() => {

     const response = await request(app).get("/users").send().expect(200)

     expect(response.body.length).toBeGreaterThan(0)
})


// register user 
test("register user", async() => {

        const response = await request(app).post("/users").send(userTwo).expect(201)  

        expect(response.body).toHaveProperty("id")
})


// get user profile
test("get user profile", async() => {

    const response = await request(app).get("/users/profile")
    .set("token", userOneToken)
    .send().expect(200)

    expect(response.body.firstname).toBe(userOne.firstname)
})


// login user
test("login user", async() => {

        await request(app).post("/users/login").send({
            email: userOne.email,
            password: userOne.password
        }).expect(200)
})
