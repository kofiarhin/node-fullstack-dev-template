const express = require("express");
const app = express();
const path = require("path");
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../views");
const partialsPath = path.join(__dirname, "../views/partials")
const hbs = require("hbs")
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

} else {

  console.log("test environment")
}


app.get("/", (req, res) => {
  res.render("index")
})


module.exports = app;