const app  = require("../server/app")
const mongoose = require("mongoose")
const User = require("../server/model/user")
const request = require("supertest")

test("pass", () => console.log("pass"))

afterAll(async() => {
    await mongoose.connection.close()
})