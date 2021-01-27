const { Router } = require('express');
const router = Router();
const User = require("../model/user")
const auth  = require("../middleware/auth")


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
    }catch(error) {
        res.status(400).send()
    }
})

router.get("/profile", auth,  async(req, res) => {

    const { firstname, lastname, email } = req.user;
    res.send({
        firstname,
        lastname,
        email
    });
})

// login user
router.post("/login", async(req, res) => {

    const { email: userEmail, password: userPassword  } = req.body;
    
     const user = await User.login(userEmail, userPassword );

     if(!user) {

        return res.status(404).send()
     }

        const token = await user.generateToken()
     const { firstname, lastname, email } = user;
    res.cookie("token", token)
     res.send({
         token,
         firstname,
         lastname,
         email
     })
})
module.exports = router;