const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "firstname is required"],
    },
    lastname: {
      type: String,
      required: [true, "lastname is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email is already taken"],
      trim: true,
      validate: [isEmail, "please provid a valid email address"],
    },

    password: {
      type: String,
      required: [true, "password is required"],
      trim: true,
    },
    tokens: [
      {
        token: {
          type: String,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  }

  next();
});

// login user
userSchema.statics.login = async function (email, password) {
  const user = await User.findOne({ email });

  if (user) {
    // compare passwords

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      return user;
    }
  }
};

// generate token
userSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.jwt_secret);

  user.tokens = user.tokens.concat({ token });

  await user.save();
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
