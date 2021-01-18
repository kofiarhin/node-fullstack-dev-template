const app  = require("../server/app")
const mongoose = require("mongoose")
const User = require("../server/model/user")
const request = require("supertest")


const userOneId = mongoose.Types.ObjectId()

const user1 = {
    _id: userOneId,
    firstname: 'kofi',
    lastname: "arhin",
    email: "kofiarhin@gmail.com",
    password: 'password123'
}

beforeEach( async() => {

        await User.deleteMany();
        await new User(user1).save()
})

// just a passing test
test("pass", () => console.log("pass"))

afterAll(async() => {
    await mongoose.connection.close()
})