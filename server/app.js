const express = require("express");
const app = express();
const path = require("path");
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../views");
const partialsPath = path.join(__dirname, "../views/partials")
const hbs = require("hbs")
const User = require("./model/user")
const cookieParser = require("cookie-parser")
require("./db/mongoose")


// // setup middlewares
app.use(express.static(publicPath));
app.use(express.json());
app.use(cookieParser())
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath)

// const environment = "dev"
const environment = process.env.environment


if(environment === "dev") {
 console.log("live reload")
const liveReload = require("livereload");
const liveReloadServer = liveReload.createServer();
const connectLive = require("connect-livereload");            
liveReloadServer.watch(publicPath, viewsPath);



liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 3);
});
app.use(connectLive());

} else {

  console.log("test environment")
}

function handleErrors(e) {

  let errors = {}

  if(e.code === 11000) {

    return errors =  {
      email: "Email already taken"
    }
  }

  if(e.message.includes("User validation failed")) {

       Object.values(e.errors).forEach ( error => {

        errors[error.path] = error.message;
       });

        return errors;
  }
}


app.get("/", (req, res) => {
  res.render("index")
})


// create user
app.post("/users", async(req, res) => {

  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send()
  }catch(e) {


     const errors = handleErrors(e)
    res.status(400).send({ error: errors})
  }
})

// login user
app.post("/login", async(req, res) => {

  
  const { email, password } = req.body;

  const user = await User.login(email, password);
  
  if(user) {

    // generate token
    const token = await user.generateToken();

    if(process.env.environment === "test") {
      res.header("token", token)
    } else {
      res.cookie("jwt", token)
    }

    res.send(200)

  } else {
    
    res.status(404).send()
  }

})

module.exports = app;