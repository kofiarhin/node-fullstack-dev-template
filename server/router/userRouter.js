const { Router } = require('express');
const router = Router();
const User = require("../model/user")
const auth  = require("../middleware/auth")
const bcrypt = require("bcrypt")

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

    await User.deleteMany()
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
    
         const  user = await User.login(req.body.email, req.body.password);
        
         if(!user) return res.status(404).send();

        //  generate tooken
         const token = await user.generateToken();
        //  set token
         res.cookie("token", token)

        //  send response
         res.send({ user: {
             id: user._Id,
             firstname: user.firstname,
             lastname: user.lastname,
             token
         }})
})


// get profile
router.get("/profile", auth,  async(req, res) => {

    const { firstname, lastname, email } = req.user;
    res.send({
        firstname,
        lastname,
        email
    });
})


module.exports = router;