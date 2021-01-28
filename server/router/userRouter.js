const { Router } = require('express');
const router = Router();
const User = require("../model/user")
const auth  = require("../middleware/auth")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

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

    await User.deleteMany()  // remove this code in production
    const user = new User(req.body);

    try {
        
        await user.save()

        const token = await user.generateToken();
        res.cookie("token", token)
        res.status(201).send({id: user._id, token})
    }catch(error) {
        res.status(400).send()
    }
})



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

    res.status(404).send()
})


router.get("/logout", async (req, res) => {

    const token = req.cookies.token;
    
    const payload =  jwt.verify(token, process.env.jwt_secret);
    
    const {_id} = payload;
    
    const user = await User.findById(_id);

    if(user) {

        const { tokens }  = user;

        user.tokens =  tokens.filter ( token  => token !== token);
        await user.save();
    }

    res.redirect("/login")

    res.send();
})


module.exports = router;