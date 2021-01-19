const { Router } = require('express');
const app = require('../app');


const router = Router();

router.get("/", (req, res) => {
    res.send([
        {
            name: "lebron",
            email: 'lebron@gmail.com'
        },

        {
            name: "kofi arhin",
            email: "kofiarhin@gmail.com",
            password: "password1234"
        }
    ])
})

router.post("/", async(req, res) => {


    console.log(req.body)
    res.status(201).send(req.body)
})


module.exports = router;