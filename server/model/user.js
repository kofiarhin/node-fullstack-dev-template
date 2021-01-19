const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "firstname is required"]
    },
    lastname: {
        type: String,
        required: [true, "lastname is required"]
    },
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
},{
    timestamps: true
});


userSchema.pre("save", async function(next) {

     const user = this;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next()
})

userSchema.statics.login = async function(email, password) {

    // fetch user from database
    const user = await User.findOne({  email})

    if(!user) throw new Error("invalid login details")
    
    // compare password
    const isMatch = await bcrypt.compare(password, user.password)
    if(isMatch) return user;
}


userSchema.methods.generateToken =  async function() {

    console.log("gen tokan")
}

const User = mongoose.model("User", userSchema);

module.exports = User;