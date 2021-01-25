const mongoose = require("mongoose")
const app = require("../server/app")
const request = require("supertest")
const { userOne, userTwo, userOneToken,  setupDatabase  } = require("./fixtures/db");
const User = require("../server/model/user")


// setup and teardown
beforeEach ( async() => {
        await setupDatabase()
})


afterAll(async() => {
    await mongoose.connection.close()
})


// register new user
test("register user", async() => {

    const response = await request(app).post('/users').send(userTwo).expect(201)
    expect(response.body).toHaveProperty("token")
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

});


// login user with valid credentials
test("login user", async() => {

    await request(app).post("/login").send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})



// cannot login user with invalid details

test("cannot login with invalid details", async() => {

    await request(app).post("/login").send({
        email: userOne.email, 
        password: "x"
    }).expect(404)

})

// get profile of user
test("get profile of user", async() => {

   const response =  await request(app).get("/profile/me")
    .set("token", userOneToken)
    .send()


})


// test logout user
test('logout user', async() => {
    await request(app).post("/logout")
    .set("token", userOneToken)
    .send().expect(200);

    // check if token is present
    const user = await User.findOne({ email: userOne.email});

    const isPresent = user.tokens.find( token => token === userOneToken);
    expect( isPresent).toBe(undefined)
})


// update user
test("update user account", async() => {

    await request(app).patch("/users")
    .set("token", userOneToken)
    .send({
        firstname: "new firstname",
        lastname: 'new lastname'
    }).expect(200);


    // fetch user from database
    const user = await User.findOne({ email: userOne.email}); 

    expect(user.firstname).toEqual("new firstname")
expect(user.lastname).toEqual("new lastname")

})


// delete user from database
test("delete user from database", async() => {

            await request(app).delete("/users")
            .set("token", userOneToken)
            .send().expect(200)


            const user = await User.findOne({ email: userOne.email});

           expect(user).toBe(null)
})

