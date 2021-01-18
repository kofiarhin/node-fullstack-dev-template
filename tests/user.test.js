const app  = require("../server/app")
const mongoose = require("mongoose")
const User = require("../server/model/user")

beforeEach( async() => {

        await User.deleteMany();
        await new User({

            firstname: "kofi",
            lastname: "arhin",
            email: "kofiarhin@gmail.com",
            password: "password123"
        }).save()
})

// just a passing test
test("pass", () => console.log("pass"))

afterAll(async() => {
    await mongoose.connection.close()
})