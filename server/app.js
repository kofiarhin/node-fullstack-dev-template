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

app.get("/", (req, res) => {
  res.render("/")
})

app.get("/login",  (req, res) => {

  
  res.render("login")
})


// login user
app.post("/login", async(req, res) => {
 
  const user = await User.login(req.body.email, req.body.password);

  if(user) {
    
    const token =  await user.generateToken();
    res.setHeader("Set-Cookie", "token="+token)
    return res.send({ _id: user._id, token})
  }

  res.status(404).send({ error: "invalid credentials"})
  
})

app.get("/register", (req, res) => {
  res.render("register")
})



// register user
app.post('/users', async(req, res) => {

  const user = new User(req.body);

  try {
    await user.save()
    
    const token = await user.generateToken();

    res.setHeader("Set-Cookie", "token="+token)
    res.status(201).send({ user: user._id, token})

  }catch(err) {

     const errors = handleErrors(err);

      res.status(400).send({
        error: errors
      })
  }
})


app.get('/profile/me', auth, async(req, res) => {

  res.send({ user: req.user})
})


function handleErrors(error) {

  let errors = {}

  if(error.code === 11000) {
    return errors = {email: "email already taken!"}
  }
  if(error.message.includes("User validation failed")) {

     Object.values(error.errors).forEach( item => {

        const { path, message} = item.properties;

         errors[path] = message;
     })
  }

  return errors;

}


app.post("/logout", auth,  async(req, res) => {
  
  req.user.tokens  = req.user.tokens.filter( token => token.token !== req.token );

  req.token = ""
  await req.user.save();
  res.send()
})


// update user
app.patch("/users", auth,  async(req, res) => {

     const fields = Object.keys(req.body);
     
    fields.forEach (field  => {

      req.user[field]  = req.body[field];
    })

    await req.user.save()
    res.send(req.user)
})



// delete user from database

module.exports = app;