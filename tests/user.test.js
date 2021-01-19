const app  = require("../server/app")
const mongoose = require("mongoose")
const User = require("../server/model/user")
const request = require("supertest")

const userOne = {
    firstname: "kofi", 
    lastname: "arhin",
    email: "kofi@gmail.com",
    password: "password123"
}

const userTwo = {
    firstname: "lebron",
    lastname: 'james',
    email: "lebron@gmail.com",
    password: "password123"
}

const userThree = {
        firstname: "kyrie",
        lastname: "irving",
        email: "kyrie@gmail.com",
        password: "password123"
    }


// basic setup and teardown
beforeEach(async() => {

    await User.deleteMany();

    await new User(userOne).save()
})


afterAll(async() => {
    await mongoose.connection.close()
})



// regiter user
test('register user',  async() => {

    const response = await request(app).post("/users").send(userTwo).expect(201)
})


// cannot register user with invalid data
test("cannot register user with invalid data",async() => {

    const response = await request(app).post("/users").send().expect(400);
     expect(response.body).toHaveProperty("error")
})

// cannot register duplicate user
test("cannot regiser duplicate user", async() => {

    const response = await request(app).post("/users").send(userOne).expect(400);
    expect(response.body).toHaveProperty("error")
})


// test passsord is hashed
test("password is hashed", async() => {

    const user = await new User(userThree).save();
    expect(user.password).not.toEqual(userThree.password)
    expect(user.password.length).toBeGreaterThan(0)
    
})


// test login user
test("login user", async() => {

    const response = await request(app).post("/login").send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);
    expect(response.header).toHaveProperty("token")
})


// cannot login invalid user
test("cannot login invalid user", async() => {

    const responsee = await request(app).post("/login").send({
        email: userOne.email,
        password: "x"
    }).expect(404)
})


// logout user
// delete user
// update user 