const app  = require("../server/app")
const mongoose = require("mongoose")
const User = require("../server/model/user")
const request = require("supertest")

beforeEach(async() => {

    await User.deleteMany();

    await new User({
        firstname: "levron",
        lastname: "james",
        email: "lebron@gmail.com",
        password: "password123"
    }).save()
})

test("pass", () => console.log("pass"))

afterAll(async() => {
    await mongoose.connection.close()
})