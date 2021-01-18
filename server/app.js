const express = require("express");
const app = express();
const path = require("path");
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../views");
const partialsPath = path.join(__dirname, "../views/partials")
const hbs = require("hbs")
const cookieParser = require("cookie-parser")
require("./db/mongoose")

const userRouter = require("./router/userRouter")


// setup middlewares
app.use(express.static(publicPath));
app.use(express.json());
app.use(cookieParser())
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath)

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/login", (req, res) => {
    res.render("login")
})


app.get("/register", (req, res) => {
    res.render("register")
})

app.use("/users", userRouter)

module.exports = app;