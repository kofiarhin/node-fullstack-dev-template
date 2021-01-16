const mongoose = require("mongoose")

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


const User = mongoose.model("User", userSchema);

module.exports = User;