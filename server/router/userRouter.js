const { Router } = require('express');
const router = Router();
const User = require("../model/user")
const auth  = require("../middleware/auth")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { ConnectionStates } = require('mongoose');

async function clearDatabase() {

        await User.deleteMany();
        console.log("database cleared")
}

// get users
router.get("/", async (req, res) => {
   
    const users = await User.find({});
    res.send(users)
})



// create users
router.post('/', async(req, res) => {

    const user = new User(req.body);

    try {
        
        await user.save()

        const token = await user.generateToken();
        res.cookie("token", token)
        res.status(201).send({id: user._id, token})
    }catch(err) {

        const errors = handleErrors(err);

        res.status(400).send({ error: errors})
    }
})

// handle errors
function handleErrors(errors) {
    
    let result = {}

// check duplicate user
    if(errors.code === 11000) {
        return { email: 'email already taken'}
    }

    if(errors.message.includes("User validation failed")) {

        Object.values(errors.errors).forEach ( error => {

            const { path, message } = error.properties;
           result[path]  = message;

        })
    }

    return result;
}


// login user
router.post("/login", async(req, res) => {

    const user = await User.login(req.body.email, req.body.password)

    if(user) {

        const token = await user.generateToken();

        res.cookie("token", token);
        res.locals.user = user;
        return res.send({
            token,
            user
        })
    }

    res.status(404).send({ error: "Invalid credentials"})
})


router.get("/logout", auth,  async (req, res) => {

    const { tokens } = req.user;


    req.user.tokens =  tokens.filter ( token => token.token !== req.token)
    
    res.cookie("token", "");
    await req.user.save();
    res.redirect("/login")
    res.send()

   
})




module.exports = router;