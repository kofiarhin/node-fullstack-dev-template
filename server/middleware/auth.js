const jwt = require("jsonwebtoken")
const User = require("../model/user")

const auth = async (req, res, next) =>  {
   try {
            const token = req.header("token")

            const payload = jwt.verify(token, process.env.jwt_secret);

            const { _id}   = payload;
            const user = await User.findOne({_id, "tokens.token": token})

            if(!user) throw Error("invalid login credentials")
            req.user = user;
            req.token = token;
    next()
   }catch(error) {

      console.log(error.message)
    res.status(401).send()
   }
}

module.exports = auth;