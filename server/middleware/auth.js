const jwt = require("jsonwebtoken")
const User = require("../model/user")




const auth = async (req, res, next) =>  {

   try { 

             let token;

            if(process.env.environment === "test") {
               token = req.header("token");
            }


            else if(process.env.environment === "dev") {
               token  = req.cookies.token;
            }

             const payload = jwt.verify(token, process.env.jwt_secret);

             const { _id }  = payload;

             const user = await User.findById(_id);

             req.user = user;
             req.token = token;
   res.locals.user = user;
             next()
   }catch( error) {
      res.locals.user = ""
      res.status(404).send({  error: "invalid credentials"})
   }


}

module.exports = auth;