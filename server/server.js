const app = require("./app")
const path = require("path");
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../views");



// const express = require("express");
// const app = express();
// const path = require("path");
// const publicPath = path.join(__dirname, "../public");
// const viewsPath = path.join(__dirname, "../views");
// const partialsPath = path.join(__dirname, "../views/partials")
// const hbs = require("hbs")
// const cookieParser = require("cookie-parser")
// require("./db/mongoose")


// // setup middlewares
// app.use(express.static(publicPath));
// app.use(express.json());
// app.use(cookieParser())
// app.set("view engine", "hbs");
// hbs.registerPartials(partialsPath)


// setup live reload
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

app.get("/", (req, res) => {
  res.render("index");
});

// login route
app.get("/login", (req, res) => {
  res.render("login")
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("listening on port" + port));
