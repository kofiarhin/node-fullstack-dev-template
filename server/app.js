const express = require("express");
const app = express();
const path = require("path");
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../views");
const partialsPath = path.join(__dirname, "../views/partials")
const hbs = require("hbs")
const cookieParser = require("cookie-parser")
require("./db/mongoose")


// setup middlewares
app.use(express.static(publicPath));
app.use(express.json());
app.use(cookieParser())
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath)

// routes


// default data
const createdBy = {
  name: "kofi arhin",
  email: "kofiarhin@gmail.com"
}

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/users", (req, res) => {
  res.send([{ name: "lebron" }, { name: "kofi arhin" }]);
});

app.post("/users", async (req, res) => {
  
  const user =  new User(req.body)

  try {
    
    await user.save();
    res.status(201).send()
  }catch(e) {
    res.status(400).send()
  }
});

app.get("/products", (req, res) => {
  res.send([{ name: "iphne 12" }, { name: "books" }]);
});

app.get("/login", (req,res) => {
  res.render("login", {name: "kofi arhin"})
})


app.get("/register", (req, res) => {

  res.render("register", { name: "kofi arhin"})
})


module.exports = app;