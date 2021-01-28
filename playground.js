const mongoose = require("mongoose")
const User = require("./server/model/user")
const bcrypt  = require("bcrypt")



// connect to database
mongoose.connect("mongodb://localhost:27017/dev", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
}).then(() => console.log("connected to datbase"))

const userOne = {
    firstname: "kofi",
    lastname: "arhin",
    email: "kofiarhin@gmail.com",
    password: "password123"
}


async function getUsers() {

    const users = await User.find({});

    console.log(users)
}

async function clearUsers() {
    await User.deleteMany();

    console.log("database cleared")
}

async function createUser(data) {{

    await clearUsers()

    const {  
        firstname,
        lastname,
        email, 
        password 
    } = data;
    const user =  new User({
        firstname,
        lastname,
        email,
        password
    });

     await user.save()

     await getUsers()
}}

// clearUsers()

// createUser(userOne)

async function login(email, password) {

        const user = await User.findOne({email});      
        
        const isMatch = await bcrypt.compare(password, user.password)

        console.log(isMatch)

        // check if password match

}

// login(userOne.email, userOne.password)
// getUsers()

// createUser(userOne)

login(userOne.email, userOne.password)