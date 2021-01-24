const mongoose = require("mongoose")
const app = require("../server/app")
const User = require("../server/model/user")
const request = require("supertest")

const userOne = {
            firstname: "lebron",
            lastname: "james",
            email: "lebron@gmail.com",
            password: "password123"
        }
const userTwo = {
    firstname: "kofi",
    lastname:"arhin",
    email: "kofiarhin@gmail.com",
    password: "password123"
}

// setup and teardown
beforeEach ( async() => {
        await User.deleteMany();
        await new User(userOne).save()
})


afterAll(async() => {
    await mongoose.connection.close()
})


// register new user
test("register user", async() => {

    const response = await request(app).post('/users').send(userTwo).expect(201)
})



// cannot register duplicate user
test("cannot register duplicate user", async() => {

    const response = await request(app).post("/users").send(userOne).expect(400);

})


// cannot register user with invalid data
test("cannot register user with invalid data", async() => {

    const response = await request(app).post("/users").send({
        firstname: "steve"
    }).expect(400);

    console.log(response.body)

});

