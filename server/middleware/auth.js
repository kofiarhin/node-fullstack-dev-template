const jwt = require("jsonwebtoken")
const User = require("../model/user")

const auth = async (req, res, next) =>  {


   let token;
   // const token = req.header('token')
   if(process.env.environment === "dev") {
         token = req.cookies.token;
         console.log("dev")
   }

   else if(process.env.environment === "test") {
      token = req.header("token")
   }



   if(!token) res.status(401).send({ error: "invalid user credentials"})
   
   const payload = jwt.verify(token, process.env.jwt_secret)


   if(!payload) res.status(401).send()
   
   const { _id }  = payload;

      const user = await User.findOne({_id, "tokens.token": token});

      if(!user) {
         res.locals.user = null ; 
         return res.status(401).send({ error: "invalid credentials"})
      }

      res.locals.user = user;

   req.user = user;
   req.token = token;
   next()
}

module.exports = auth;