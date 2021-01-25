const jwt = require("jsonwebtoken")
const User = require("../model/user")


const checkToken = async (req, res, next) =>  {

    const token = req.header("token")
    
    if(token) {
        const payload = jwt.verify(token, process.env.jwt_secret);

        if(payload ) {
            const { _id } = payload;

            const user = await User.findOne({_id, "tokens.token": token});

           console.log(user) 
        }
    }
    next()
}

module.exports = checkToken;