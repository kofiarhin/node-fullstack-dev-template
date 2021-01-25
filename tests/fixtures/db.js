const jwt = require("jsonwebtoken")
const User = require("../../server/model/user")
const mongoose = require("mongoose")


const userOneId = mongoose.Types.ObjectId()
const userOneToken= jwt.sign({_id: userOneId}, "password123")

const userOne = {
            _id: userOneId, 
            firstname: "lebron",
            lastname: "james",
            email: "lebron@gmail.com",
            password: "password123",
            tokens: [
                {
                    token: userOneToken
                }
            ]
        }


        const userTwoId = mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    firstname: "kofi",
    lastname:"arhin",
    email: "kofiarhin@gmail.com",
    password: "password123"
}

const setupDatabase = async function() {

    await User.deleteMany();
        await new User(userOne).save()
}

module.exports = {
    userOne,
    userTwo,
    userOneToken,
    setupDatabase
}