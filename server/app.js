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

module.exports = app;