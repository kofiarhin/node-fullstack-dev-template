const jwt = require("jsonwebtoken")
const User = require("../model/user")

const auth = async (req, res, next) =>  {

   console.log(req.cookies("token"))
   next()
}

module.exports = auth;