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
const auth = require('./middleware/auth')
const { handleErrors } = require("./lib/helper")
const userRouter = require("./router/userRouter")
const jwt = require("jsonwebtoken")


// // setup middlewares
app.use(express.static(publicPath));
app.use(express.json());
app.use(cookieParser())
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath)



// setup live  reload
const environment = process.env.environment
if(environment === "dev") {

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

} 

const checkUser =  async function(req, res, next) {

 const token = req.cookies.token;

if(token) {
  const payload = jwt.verify(token, process.env.jwt_secret);

  const user = await User.findById(payload._id);

 if(user) {
   res.locals.user  = user;
 }

} else {

  console.log("you are not logged in")
}

  next()
}
app.get("*", checkUser)


// routes
app.get("/", async(req, res) => {
  res.render("index")
})


// login
app.get("/login", (req, res) => {
  res.render("login")
})

// register
app.get("/register", (req, res ) => {
  res.render("register")
})


// home stuff
app.get("/home", auth,  (req, res) => {

  res.render("home", {
    firstname: req.user.firstname
  })
})

app.get("/profile", auth,  ( req, res) => {
  res.render("profile")
})

app.use("/users", userRouter)


module.exports = app;